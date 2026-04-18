import { useState, useRef, useEffect } from "react";
import SimpleMarkdown from "../components/SimpleMarkdown.jsx";

/* ── ChatPage.jsx — Glacier palette ── */

const BOT_OPTIONS = [
  { value: "basic_bot",                   label: "Basic Assistant",    icon: "◈" },
  { value: "basic_bot_with_validation",   label: "Validated Assistant",icon: "◎" },
  { value: "career_assistant_bot",        label: "Career Advisor",     icon: "▲" },
  { value: "code_assistant_bot",          label: "Code Mentor",        icon: "⟨⟩"},
  { value: "tutor_bot",                   label: "Tutor Bot",          icon: "◇" },
  { value: "multimode_bot",               label: "Multimode Bot",      icon: "⊕" },
  { value: "temperature_comparison_bot",  label: "Temp Comparison",    icon: "≈" },
];

const PROVIDER_OPTIONS = [
  { value: "groq",   label: "Groq Cloud" },
  { value: "ollama", label: "Ollama Local" },
];

/* ── Sidebar ── */
const Sidebar = ({ open, botType, setBotType, provider, setProvider, temperature, setTemp, useMemory, setMemory, sessionId, clearChat }) => (
  <aside style={{
    width: open ? 272 : 0, minWidth: open ? 272 : 0,
    overflow: "hidden", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    background: "var(--bg2)", borderRight: "0.5px solid var(--border)",
    display: "flex", flexDirection: "column", flexShrink: 0
  }}>
    <div style={{ padding: "1.25rem 1.1rem", overflowY: "auto", flex: 1 }}>
      {/* Section label */}
      <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: "1.1rem" }}>Configuration</p>

      {/* Bot select */}
      <div style={{ marginBottom: "1.3rem" }}>
        <label style={{ fontSize: 11.5, color: "var(--text3)", display: "block", marginBottom: 7 }}>Bot Type</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {BOT_OPTIONS.map(b => {
            const active = botType === b.value;
            return (
              <button key={b.value} onClick={() => setBotType(b.value)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", borderRadius: 10,
                border: active ? "1px solid var(--accent)" : "1px solid transparent",
                background: active ? "rgba(75,189,224,0.10)" : "transparent",
                color: active ? "var(--highlight)" : "var(--text2)",
                cursor: "pointer", fontSize: 13,
                fontWeight: active ? 500 : 400,
                textAlign: "left", transition: "all 0.15s"
              }}>
                <span style={{ fontSize: 14, color: active ? "var(--accent)" : "var(--text3)" }}>{b.icon}</span>
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Provider */}
      <div style={{ marginBottom: "1.3rem" }}>
        <label style={{ fontSize: 11.5, color: "var(--text3)", display: "block", marginBottom: 7 }}>LLM Provider</label>
        <div style={{ display: "flex", gap: 7 }}>
          {PROVIDER_OPTIONS.map(p => {
            const active = provider === p.value;
            return (
              <button key={p.value} onClick={() => setProvider(p.value)} style={{
                flex: 1, padding: "8px 0", borderRadius: 9, fontSize: 12, fontWeight: 500,
                border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: active ? "rgba(75,189,224,0.10)" : "transparent",
                color: active ? "var(--highlight)" : "var(--text2)",
                cursor: "pointer", transition: "all 0.15s"
              }}>{p.label}</button>
            );
          })}
        </div>
      </div>

      {/* Temperature */}
      <div style={{ marginBottom: "1.3rem" }}>
        <label style={{
          fontSize: 11.5, color: "var(--text3)",
          display: "flex", justifyContent: "space-between", marginBottom: 9
        }}>
          <span>Temperature</span>
          <span style={{ color: "var(--accent)", fontWeight: 600, fontFamily: "var(--mono)", fontSize: 12 }}>{temperature.toFixed(1)}</span>
        </label>
        <input
          type="range" min="0" max="1" step="0.1" value={temperature}
          onChange={e => setTemp(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={{ fontSize: 10, color: "var(--text3)" }}>Precise</span>
          <span style={{ fontSize: 10, color: "var(--text3)" }}>Creative</span>
        </div>
      </div>

      {/* Memory toggle */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: 11.5, color: "var(--text3)" }}>Session Memory</label>
          <div onClick={() => setMemory(m => !m)} style={{
            width: 40, height: 22, borderRadius: 11, cursor: "pointer",
            background: useMemory ? "var(--primary)" : "var(--bg3)",
            border: "1px solid var(--border2)", position: "relative",
            transition: "background 0.2s"
          }}>
            <div style={{
              position: "absolute", top: 2,
              left: useMemory ? 18 : 2,
              width: 16, height: 16, borderRadius: "50%",
              background: useMemory ? "var(--highlight)" : "var(--text3)",
              transition: "left 0.2s"
            }} />
          </div>
        </div>
        {useMemory && (
          <p style={{ fontSize: 10.5, color: "var(--text3)", marginTop: 6, lineHeight: 1.5 }}>
            Session: <span style={{ color: "var(--accent)", fontFamily: "var(--mono)" }}>{sessionId.slice(0,8)}…</span>
          </p>
        )}
      </div>

      {/* Active config summary */}
      <div style={{
        background: "rgba(6,14,20,0.6)", borderRadius: 10,
        padding: "10px 14px", border: "0.5px solid var(--border)"
      }}>
        <p style={{ fontSize: 10, color: "var(--text3)", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Active Config</p>
        <p style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.75 }}>
          {BOT_OPTIONS.find(b => b.value === botType)?.icon} {BOT_OPTIONS.find(b => b.value === botType)?.label}<br/>
          <span style={{ color: "var(--accent)" }}>{provider === "groq" ? "☁ Groq Cloud" : "⬡ Ollama Local"}</span><br/>
          Temp {temperature.toFixed(1)} · Memory {useMemory ? "On" : "Off"}
        </p>
      </div>
    </div>

    {/* Clear chat */}
    <div style={{ padding: "1rem 1.1rem", borderTop: "0.5px solid var(--border)" }}>
      <button
        onClick={clearChat}
        style={{
          width: "100%", padding: "8px", borderRadius: 8, fontSize: 12.5,
          background: "transparent", color: "var(--text3)",
          border: "0.5px solid var(--border)", cursor: "pointer",
          transition: "all 0.15s"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text3)"; }}
      >Clear Chat</button>
    </div>
  </aside>
);

/* ── Message bubble ── */
const MessageBubble = ({ msg }) => (
  <div className="fade-in" style={{
    display: "flex",
    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
    marginBottom: 18
  }}>
    {msg.role === "assistant" && (
      <div style={{
        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
        background: "rgba(27,111,168,0.25)", border: "1px solid var(--border2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: "var(--accent)", marginRight: 10, marginTop: 3
      }}>◈</div>
    )}
    <div style={{
      maxWidth: "72%",
      background: msg.role === "user"
        ? "linear-gradient(135deg, var(--primary) 0%, #0d4d7a 100%)"
        : "var(--bg3)",
      border: msg.role === "user" ? "1px solid rgba(75,189,224,0.2)" : "0.5px solid var(--border)",
      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
      padding: "12px 16px",
      color: msg.role === "user" ? "var(--highlight)" : "var(--text)"
    }}>
      {msg.role === "assistant"
        ? <SimpleMarkdown text={msg.content} />
        : <p style={{ fontSize: 14, lineHeight: 1.7 }}>{msg.content}</p>
      }
    </div>
  </div>
);

/* ── Typing indicator ── */
const TypingIndicator = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
    <div style={{
      width: 30, height: 30, borderRadius: "50%",
      background: "rgba(27,111,168,0.25)", border: "1px solid var(--border2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, color: "var(--accent)"
    }}>◈</div>
    <div style={{
      background: "var(--bg3)", border: "0.5px solid var(--border)",
      borderRadius: "4px 18px 18px 18px", padding: "12px 18px",
      display: "flex", gap: 5, alignItems: "center"
    }}>
      {[0, 0.2, 0.4].map((d, i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: "var(--accent)",
          animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${d}s`
        }} />
      ))}
    </div>
  </div>
);

/* ── ChatPage ── */
const ChatPage = () => {
  const [botType, setBotType]   = useState("basic_bot");
  const [provider, setProvider] = useState("groq");
  const [temperature, setTemp]  = useState(0.7);
  const [useMemory, setMemory]  = useState(false);
  const [sessionId]             = useState(() => Math.random().toString(36).slice(2));
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI assistant. Configure your preferences on the left, then ask me anything." }
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sidebarOpen, setSidebar] = useState(true);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);
  const selectedBot             = BOT_OPTIONS.find(b => b.value === botType);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages(m => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, bot_type: botType, provider, temperature, use_memory: useMemory, session_id: useMemory ? sessionId : null })
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.response || data.detail || "Error." }]);
    } catch (err) {
      setMessages(m => [...m, { role: "assistant", content: `⚠ Could not reach backend. Make sure FastAPI is running at localhost:8000.\n\nError: ${err.message}` }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKey = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };
  const clearChat = () => setMessages([{ role: "assistant", content: "Chat cleared. Start a new conversation!" }]);

  return (
    <div style={{ display: "flex", height: "100vh", paddingTop: 62, position: "relative", zIndex: 1 }}>
      <Sidebar
        open={sidebarOpen} botType={botType} setBotType={setBotType}
        provider={provider} setProvider={setProvider}
        temperature={temperature} setTemp={setTemp}
        useMemory={useMemory} setMemory={setMemory}
        sessionId={sessionId} clearChat={clearChat}
      />

      {/* Main chat area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Chat header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "0 1.5rem", height: 52,
          borderBottom: "0.5px solid var(--border)",
          background: "rgba(6,14,20,0.75)", backdropFilter: "blur(10px)"
        }}>
          <button
            onClick={() => setSidebar(s => !s)}
            style={{ background: "transparent", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 17, padding: 4 }}
            title="Toggle sidebar"
          >{sidebarOpen ? "◁" : "▷"}</button>

          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text2)" }}>
            {selectedBot?.icon} {selectedBot?.label}
          </span>
          <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: "auto" }}>
            {provider === "groq" ? "Groq · llama-3.3-70b" : "Ollama · llama3.2:1b"}
          </span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{
          padding: "1rem 1.5rem",
          borderTop: "0.5px solid var(--border)",
          background: "rgba(6,14,20,0.80)", backdropFilter: "blur(10px)"
        }}>
          <div
            style={{
              display: "flex", gap: 10, alignItems: "flex-end",
              background: "var(--bg3)", border: "0.5px solid var(--border2)",
              borderRadius: 16, padding: "10px 14px", transition: "border-color 0.2s"
            }}
            onFocusCapture={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
            onBlurCapture={e => { e.currentTarget.style.borderColor = "var(--border2)"; }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={`Message ${selectedBot?.label}…`}
              rows={1}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "var(--text)", fontSize: 14, lineHeight: 1.6, resize: "none",
                fontFamily: "var(--sans)", maxHeight: 120, overflow: "auto",
                caretColor: "var(--accent)"
              }}
              onInput={e => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: input.trim() && !loading ? "var(--primary)" : "var(--bg4)",
                border: input.trim() && !loading ? "1px solid rgba(75,189,224,0.3)" : "1px solid var(--border)",
                cursor: input.trim() && !loading ? "pointer" : "default",
                color: input.trim() && !loading ? "var(--highlight)" : "var(--text3)",
                fontSize: 16, transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
              onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.background = "var(--accent)"; }}
              onMouseLeave={e => { if (input.trim() && !loading) e.currentTarget.style.background = "var(--primary)"; }}
            >
              {loading
                ? <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid var(--text3)", borderTopColor: "var(--accent)", animation: "spin 0.7s linear infinite" }} />
                : "↑"}
            </button>
          </div>
          <p style={{ fontSize: 11, color: "var(--text3)", textAlign: "center", marginTop: 8 }}>
            Enter to send · Shift+Enter for newline
          </p>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;