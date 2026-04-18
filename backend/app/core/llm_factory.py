import os
from langchain_ollama import ChatOllama
from langchain_groq import ChatGroq

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL    = os.getenv("OLLAMA_MODEL",    "llama3.2:1b")   # change to any model you have pulled
GROQ_MODEL      = os.getenv("GROQ_MODEL",      "llama-3.3-70b-versatile")

def get_llm(provider: str, model: str, temperature: float):
    if provider == "ollama":
        return ChatOllama(
            model=model,
            base_url=OLLAMA_BASE_URL,
            temperature=temperature,
        )
    elif provider == "groq":
        return ChatGroq(
            model=model,
            temperature=temperature,
            api_key=os.getenv("GROQ_API_KEY"),
        )
    else:
        raise ValueError(f"Unsupported provider: {provider}")