<div align="center">

<br/>

```
 ██╗   ██╗███████╗██╗      █████╗  █████╗ ██╗
 ██║   ██║██╔════╝██║     ██╔══██╗██╔══██╗██║
 ██║   ██║█████╗  ██║     ███████║███████║██║
 ╚██╗ ██╔╝██╔══╝  ██║     ██╔══██║██╔══██║██║
  ╚████╔╝ ███████╗███████╗██║  ██║██║  ██║██║
   ╚═══╝  ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝
```

### *Navigate the AI Frontier*

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![LangChain](https://img.shields.io/badge/LangChain-0.2-1C3C3C?style=flat-square&logo=chainlink&logoColor=white)](https://langchain.com)
[![Groq](https://img.shields.io/badge/Groq-Cloud-F55036?style=flat-square)](https://groq.com)
[![Ollama](https://img.shields.io/badge/Ollama-Local-ffffff?style=flat-square)](https://ollama.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-4BBDE0?style=flat-square)](LICENSE)

<br/>

**VelaAI** is a full-stack GenAI playground with swappable LLM backends, 7 specialized bots, session memory, real-time streaming, and a production-grade React frontend — all in one elegant interface.

<br/>

[🚀 Quick Start](#-quick-start) · [🏗 Architecture](#-architecture) · [🤖 Bots](#-bots) · [📦 Frontend Docs](frontend/README.md) · [⚙️ Backend Docs](llm/backend/README.md)

<br/>

</div>

---

## 📸 Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        VelaAI UI                            │
│  ┌──────────────┐  ┌───────────────────────────────────┐    │
│  │  Bot Sidebar │  │         Chat Window               │    │
│  │              │  │  ┌─────────────────────────────┐  │    │
│  │  ◈ Basic     │  │  │  ◈  Hello! How can I help? │  │    │
│  │  ◎ Validated │  │  └─────────────────────────────┘  │    │
│  │  ▲ Career    │  │                    ┌─────────────┐ │   │
│  │  ⟨⟩ Code      │  │                    │  User msg    │ │   │
│  │  ◇ Tutor    │  │                    └─────────────┘ │    │
│  │  ⊕ Multi    │  │  ┌────────────────────────────┐   │    │
│  │  ≈ Temp Cmp  │  │  │  Message ${selectedBot}…  ↑ │   │   │
│  │              │  │  └────────────────────────────┘   │    │
│  └──────────────┘  └───────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **7 Specialized Bots** | Basic, Validated, Career Advisor, Code Mentor, Tutor, Multimode, Temp Comparison |
| ☁️ **Dual LLM Providers** | Switch between Groq Cloud (`llama-3.3-70b`) and Ollama Local (`llama3.2:1b`) |
| 🧠 **Session Memory** | Per-session conversation history via LangChain memory |
| 🌡️ **Temperature Control** | 0.0 → 1.0 slider: precise to creative |
| ⚡ **Streaming Responses** | Real-time token delivery via FastAPI async |
| 📝 **Markdown Rendering** | Code blocks, bold, inline code, lists — all beautifully styled |
| 🎨 **Glacier UI Theme** | Deep ocean blues, frosted glass, ice-white typography |

---

## 🏗 Architecture

```
llm/
├── frontend/                       # React 18 + Vite (Glacier UI)
│   └── src/
│       ├── App.jsx                 # Root router
│       ├── components/             # Nav, Background, SimpleMarkdown
│       ├── pages/                  # HomePage, ChatPage, AboutPage
│       └── styles/                 # theme.css (CSS variables)
│
└── backend/                        # FastAPI + LangChain
    └── app/
        ├── main.py                 # Entrypoint + CORS
        ├── schemas.py              # Pydantic models
        ├── api/
        │   └── chat.py             # POST /chat endpoint
        ├── core/
        │   ├── llm_factory.py      # Provider abstraction
        │   ├── prompt_factory.py   # System prompts per bot
        │   └── memory.py           # Session store
        └── services/
            └── chat_service.py     # Orchestration logic
```

### Request Flow

```
Browser → POST /chat → FastAPI → ChatService
                                     ├── PromptFactory  (builds system prompt)
                                     ├── LLMFactory     (selects Groq / Ollama)
                                     └── Memory         (reads/writes session)
                                           ↓
                                     LangChain Chain
                                     (prompt | llm | StrOutputParser)
                                           ↓
                                     JSON Response → React UI
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | ≥ 18 | [nodejs.org](https://nodejs.org) |
| Python | ≥ 3.10 | [python.org](https://python.org) |
| Git | any | [git-scm.com](https://git-scm.com) |
| Ollama *(optional)* | latest | [ollama.com](https://ollama.com) |

### 1 — Clone the repo

```bash
git clone https://github.com/your-username/velaai.git
cd velaai
```

### 2 — Start the Backend

```bash
cd llm/backend
python -m venv .venv

# Activate (Linux/Mac)
source .venv/bin/activate

# Activate (Windows)
.venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env          # then edit .env with your keys
uvicorn app.main:app --reload
```

> ✅ Backend runs at **http://localhost:8000**

### 3 — Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

> ✅ Frontend runs at **http://localhost:5173**

---

## 🤖 Bots

| Icon | Bot | Best For |
|---|---|---|
| ◈ | **Basic Assistant** | General-purpose Q&A |
| ◎ | **Validated Assistant** | Input validation before responding |
| ▲ | **Career Advisor** | Job roles, roadmaps, skill paths |
| ⟨⟩ | **Code Mentor** | Writing, debugging, best practices |
| ◇ | **Tutor Bot** | Step-by-step beginner explanations |
| ⊕ | **Multimode Bot** | Adapts to any conversational context |
| ≈ | **Temp Comparison** | Same prompt at 0.1 / 0.5 / 0.9 side-by-side |

---

## 🌡️ LLM Providers

| Provider | Model | Type | Speed |
|---|---|---|---|
| **Groq** | `llama-3.3-70b-versatile` | Cloud API | ⚡ Ultra-fast |
| **Ollama** | `llama3.2:1b` | Local | 🔒 Private |

---

## 📄 License

MIT © VelaAI — see [LICENSE](LICENSE)

---

<div align="center">
<sub>Built with FastAPI · LangChain · Groq · Ollama · React · Vite</sub>
</div>