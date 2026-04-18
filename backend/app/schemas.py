from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    bot_type: str
    provider: str
    temperature: Optional[float] = 0.7
    use_memory: bool = False
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: Optional[str] = None