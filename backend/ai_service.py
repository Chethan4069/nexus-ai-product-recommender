import os
import json
import urllib.request
from duckduckgo_search import DDGS
from dotenv import load_dotenv

load_dotenv()

def query_gemini(prompt: str, json_mode: bool = False):
    """Helper function to cleanly call the Gemini REST API"""
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    if json_mode:
        payload["generationConfig"] = {"responseMimeType": "application/json"}
        
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            return result["candidates"][0]["content"]["parts"][0]["text"]
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        print(f"Gemini HTTP Error: {err_msg}")
        raise Exception(err_msg)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise Exception(str(e))

def solve_problem_with_web_search(user_problem: str):
    """
    1. Analyzes the underlying issue using Gemini.
    2. Uses a real Search Engine (DuckDuckGo via Python) to find actually available solutions.
    3. Feeds search results back into Gemini to pick the best products and explain how they help.
    """
    
    # 1. GENERATE SEARCH QUERY
    query_prompt = f"The user has this problem: '{user_problem}'. What 3-4 keywords should I type into a search engine to find specific physical products to solve this? Return ONLY the search string, nothing else."
    try:
        search_query = query_gemini(query_prompt)
    except Exception as e:
        return {
            "response_message": f"**Gemini API Error (Search Phase):**\n\n```json\n{e}\n```", 
            "recommendations": []
        }
    
    if not search_query:
        search_query = user_problem
    
    search_query = search_query.strip().replace('"', '')
    print(f"--> AI generated search query: {search_query}")
    
    # 2. BROWSE THE WEB
    try:
        ddgs = DDGS()
        # Search the live internet specifically on Amazon India and Flipkart
        search_results = list(ddgs.text(search_query + " (site:amazon.in OR site:flipkart.com)", max_results=8))
        search_context = json.dumps(search_results)
    except Exception as e:
        print(f"--> Web Search Failed: {e}")
        search_context = "Could not reach the web. Recommend generic specific solutions."

    # 3. ANALYZE RESULTS & RECOMMEND
    system_prompt = f"""You are Nexus ML, an advanced NLP problem-solving engine. 
The user described this real-world problem: "{user_problem}"

I have scoured the live internet (Amazon India & Flipkart) for solutions. Here are the search results context (which contains 'href' URLs and 'body' descriptions):
{search_context}

Based on these live search results (or your own knowledge if results are poor), select up to 3 real, specific products to SOLVE their problem.
You must explain EXACTLY HOW the product solves their specific pain points.

Respond purely in this JSON format:
{{
    "response_message": "An empathetic message acknowledging their specific problem and mentioning you searched the web for real solutions.",
    "recommendations": [
        {{
            "title": "Real Product Name",
            "brand": "Real Brand Name",
            "price": "Price in Indian Rupees (e.g. ₹1,500)",
            "desc": "Short description of the product.",
            "image": "https://loremflickr.com/600/600/product",
            "link": "Extract the EXACT 'href' URL from the search results context. If not found, construct an amazon search link: https://www.amazon.in/s?k=[Product+Name]",
            "how_it_helps": "Explain in detail exactly how this product's features solve their stated problem."
        }}
    ]
}}
"""
    
    try:
        raw_response = query_gemini(system_prompt, json_mode=True)
    except Exception as e:
        return {
            "response_message": f"**Gemini API Error (Recommendation Phase):**\n\n```json\n{e}\n```",
            "recommendations": []
        }
        
    try:
        # Clean up the response in case Gemini added markdown padding (e.g. ```json )
        cleaned_response = raw_response.strip()
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response[7:-3].strip()
        elif cleaned_response.startswith("```"):
            cleaned_response = cleaned_response[3:-3].strip()
        
        parsed_json = json.loads(cleaned_response)
        
        # Inject real product images dynamically using DuckDuckGo Image Search
        try:
            ddgs_images = DDGS()
            for rec in parsed_json.get("recommendations", []):
                try:
                    img_results = list(ddgs_images.images(rec["title"] + " product", max_results=1))
                    if img_results:
                        rec["image"] = img_results[0]["image"]
                except Exception:
                    pass
        except Exception as e:
            print(f"--> Image Search Failed: {e}")
            
        return parsed_json
    except Exception as e:
        print(f"--> Failed to parse JSON from Gemini: {e}")
        return {
            "response_message": f"**JSON Parsing Error:** {e}\n\n**Raw output:**\n{raw_response}",
            "recommendations": []
        }
