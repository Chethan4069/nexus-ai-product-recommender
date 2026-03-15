from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
import datetime

class ChatHistory(Base):
    """
    Since this is a personal assistant for you, we don't need user accounts or logins.
    We just store the history of problems you asked and the solutions the AI provided.
    """
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_problem = Column(Text)
    ai_solution_summary = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
