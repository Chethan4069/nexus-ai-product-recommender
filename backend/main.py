from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

import models, database, ai_service

# Automatically create the PostgreSQL tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Nexus Web-Connected Personal Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Schemas
class ChatRequest(BaseModel):
    message: str

class RecommendationResponse(BaseModel):
    title: str
    brand: str
    price: str
    desc: str
    image: str
    link: str
    how_it_helps: str

class ChatResponse(BaseModel):
    message: str
    recommendations: List[RecommendationResponse]

@app.post("/api/chat", response_model=ChatResponse)
def solve_problem(req: ChatRequest, db: Session = Depends(database.get_db)):
    """
    Main endpoint. Takes the problem, searches the web, returns solutions, and saves to Postgres history.
    """
    
    # 1. Trigger the ML + Web Search Engine
    ai_result = ai_service.solve_problem_with_web_search(req.message)
    
    bot_message = ai_result.get("response_message", "Here are the solutions I found on the web.")
    recommendations = ai_result.get("recommendations", [])
    
    # 2. Save personal history to PostgreSQL
    history_record = models.ChatHistory(
        user_problem=req.message,
        ai_solution_summary=bot_message
    )
    db.add(history_record)
    db.commit()
    
    # 3. Return payload to frontend
    return ChatResponse(
        message=bot_message,
        recommendations=recommendations
    )

@app.get("/api/history")
def get_personal_history(db: Session = Depends(database.get_db)):
    """Retrieve your personal problem-solving history"""
    records = db.query(models.ChatHistory).order_by(models.ChatHistory.created_at.desc()).limit(20).all()
    return records
