# Nexus AI: Autonomous Problem-Solving Engine 🧠

![Nexus AI Demo Banner](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200&h=400)

**Nexus AI** is a next-generation Generative NLP problem solver and autonomous e-commerce recommendation engine. Instead of searching by generic product keywords, users describe real-world problems in natural language (e.g., *"My neck hurts from looking down at my screen all day"*). 

The AI autonomously diagnoses the problem, formulates optimized search queries, scrapes the live internet (Amazon & Flipkart) for solutions, and prescribes specific, highly-rated physical products. Crucially, the system explains exactly *how* the product solves the user's specific pain points, accompanied by real-time pricing and direct purchasing links.

## 🚀 Features

- **Natural Language Problem Solving**: Describe your issue, and let the AI find the solution.
- **Autonomous Web Scraping**: Bypasses stale databases by actively searching DuckDuckGo, Amazon India, and Flipkart for live products.
- **Contextual RAG Retrieval**: Injects scraped data into Google Gemini 2.5 Flash to evaluate the best possible solutions.
- **Dynamic Image Injection**: Autonomously fetches real product images so UI rendering is flawless.
- **Explainable AI**: The system forces the LLM to provide a specific `how_it_helps` justification for every recommendation.
- **History Logging**: Securely saves personal chat histories to a local SQLite database (upgradable to PostgreSQL) using SQLAlchemy.

## 🛠️ Technology Stack

*   **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism UI), JavaScript (ES6+).
*   **Backend framework**: Python 3.11, FastAPI, Uvicorn, Pydantic.
*   **Database**: SQLite (Development) / PostgreSQL (Production) using SQLAlchemy ORM.
*   **AI Engine**: Google Gemini 2.5 Flash (`google-generativeai` REST implementation).
*   **Web Scraping**: `duckduckgo_search` library.

## ⚙️ How to Run Locally

### 1. Requirements
*   Python 3.11+
*   A Google Gemini API Key

### 2. Setup the Backend
1. Clone this repository to your local machine.
2. Navigate to the backend directory: `cd backend/`
3. Create a python virtual environment: `python -m venv venv`
4. Activate the environment: `.\venv\Scripts\Activate.ps1` (Windows) or `source venv/bin/activate` (Mac/Linux).
5. Install dependencies: `pip install -r requirements.txt`
6. Create a `.env` file inside the `backend/` folder and add your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
7. Start the FastAPI server: `uvicorn main:app --reload`

### 3. Setup the Frontend
1. Open the root folder of the project in your code editor.
2. Open `index.html` using the **Live Server** extension (VS Code) or simply double-click the file to open it in any web browser.
3. Start chatting!
