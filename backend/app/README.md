<div align="center">

<br/>

# ⚙️ VelaAI — Backend

### FastAPI · LangChain · Groq · Ollama

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![LangChain](https://img.shields.io/badge/LangChain-0.2-1C3C3C?style=flat-square)](https://langchain.com)
[![Groq](https://img.shields.io/badge/Groq-llama--3.3--70b-F55036?style=flat-square)](https://groq.com)
[![Ollama](https://img.shields.io/badge/Ollama-llama3.2:1b-333?style=flat-square)](https://ollama.com)
[![Pydantic](https://img.shields.io/badge/Pydantic-v2-E92063?style=flat-square)](https://docs.pydantic.dev)

<br/>

A modular, async FastAPI backend that orchestrates multi-bot LLM inference with swappable providers, session memory, and typed request/response schemas.

<br/>

</div>

---

## 📁 Folder Structure

```
backend/
└── app/
    ├── main.py                 # FastAPI app + CORS + router mount
    ├── schemas.py              # Pydantic request & response models
    │
    ├── api/
    │   └── chat.py             # POST /chat  endpoint
    │
    ├── core/
    │   ├── llm_factory.py      # Selects ChatGroq or ChatOllama
    │   ├── prompt_factory.py   # Builds system prompt per bot type
    │   └── memory.py           # In-memory session store (defaultdict)
    │
    └── services/
        └── chat_service.py     # Orchestrates prompt → llm → output
```

---

## 🔄 Request / Response Flow

```
POST /chat  { message, bot_type, provider, temperature, use_memory, session_id }
     │
     ▼
┌──────────────────────────────────────────────────┐
│                  chat.py (API Layer)              │
│  Validates schema · Calls ChatService             │
└────────────────────────┬─────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────┐
│               chat_service.py (Service Layer)     │
│                                                   │
│  1. PromptFactory  →  build system persona        │
│  2. LLMFactory     →  select provider             │
│  3. Memory         →  load session history        │
│  4. Chain          →  prompt | llm | parser       │
│  5. Memory         →  save new exchange           │
└────────────────────────┬─────────────────────────┘
                         │
                         ▼
              { "response": "..." }
```

---

## ⚙️ Environment Setup

### 1 — Clone & navigate

```bash
git clone https://github.com/your-username/velaai.git
cd llm/backend
```

### 2 — Create virtual environment

```bash
# Create
python -m venv .venv

# Activate — Linux / Mac
source .venv/bin/activate

# Activate — Windows (PowerShell)
.venv\Scripts\Activate.ps1

# Activate — Windows (CMD)
.venv\Scripts\activate.bat
```

### 3 — Install dependencies

```bash
pip install -r requirements.txt
```

### 4 — Configure environment variables

```bash
# Linux / Mac
cp .env.example .env

# Windows
copy .env.example .env
```

Then open `.env` and fill in:

```env
# ── Groq Cloud ──────────────────────────────────
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=llama-3.3-70b-versatile        # default, can omit

# ── Ollama Local ─────────────────────────────────
OLLAMA_BASE_URL=http://localhost:11434     # default, can omit
OLLAMA_MODEL=llama3.2:1b                  # default, can omit
```

> 🔑 Get a free Groq API key at [console.groq.com/keys](https://console.groq.com/keys)

---

## 🤖 Setting Up Ollama (Local LLM)

Ollama lets you run LLMs **completely offline on your machine** — no API key required.

### Install Ollama

| Platform | Command / Link |
|---|---|
| **macOS** | `brew install ollama` or [download .dmg](https://ollama.com/download) |
| **Linux** | `curl -fsSL https://ollama.com/install.sh \| sh` |
| **Windows** | [Download installer](https://ollama.com/download/windows) |

### Pull the model

```bash
# Pull the default model used by VelaAI (small, fast, ~800MB)
ollama pull llama3.2:1b

# Optional: pull a larger, smarter model
ollama pull llama3.1:8b
ollama pull mistral
```

### Start the Ollama server

```bash
ollama serve
```

> ✅ Ollama API runs at **http://localhost:11434**
> The backend will automatically connect to it when `provider=ollama` is selected.

### Verify it's working

```bash
ollama list              # shows downloaded models
ollama run llama3.2:1b   # interactive test in terminal
```

---

## ▶️ Running the Backend

```bash
# Development (auto-reload on file changes)
uvicorn app.main:app --reload

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

> ✅ API available at **http://localhost:8000**
> 📖 Interactive docs at **http://localhost:8000/docs** (Swagger UI)

---

## 🌐 API Reference

### `POST /chat`

**Request body:**

```json
{
  "message":    "Explain async/await in Python",
  "bot_type":   "code_assistant_bot",
  "provider":   "groq",
  "temperature": 0.7,
  "use_memory": true,
  "session_id": "abc123"
}
```

**Response:**

```json
{
  "response": "Sure! `async/await` in Python is used for..."
}
```

**Bot type values:**

```
basic_bot
basic_bot_with_validation
career_assistant_bot
code_assistant_bot
tutor_bot
multimode_bot
temperature_comparison_bot
```

**Provider values:**

```
groq     →  Groq Cloud  (requires GROQ_API_KEY)
ollama   →  Ollama Local (requires ollama serve)
```

---

## 🧩 Core Modules

### `llm_factory.py` — Provider Abstraction

```python
# Extend this to add new providers (OpenAI, Anthropic, etc.)
def get_llm(provider: str, temperature: float) -> BaseChatModel:
    if provider == "groq":
        return ChatGroq(model=GROQ_MODEL, temperature=temperature)
    elif provider == "ollama":
        return ChatOllama(model=OLLAMA_MODEL, base_url=OLLAMA_BASE_URL)
```

### `prompt_factory.py` — System Personas

Each bot type maps to a tailored system prompt injected into the LangChain template.

### `memory.py` — Session Store

Uses Python `defaultdict` to hold per-session `ConversationBufferMemory`. Sessions are keyed by `session_id` and persist for the lifetime of the process.

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| `Connection refused :8000` | Make sure `uvicorn` is running |
| `GROQ_API_KEY missing` | Check `.env` exists and key is set |
| `Ollama: connection refused` | Run `ollama serve` in a separate terminal |
| `model not found` | Run `ollama pull llama3.2:1b` |
| `CORS error from frontend` | Verify `FRONTEND_URL` in `main.py` matches your dev port |

---

<div align="center">
<sub>⚙️ VelaAI Backend · FastAPI + LangChain + Groq + Ollama</sub>
</div>