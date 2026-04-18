/* ── AboutPage.jsx — Glacier palette ── */

const STACK = [
  { name: "React 18",    cat: "Frontend",     color: "#61DAFB", bg: "rgba(97,218,251,0.10)",  desc: "Component-based UI with hooks" },
  { name: "Vite",        cat: "Build Tool",   color: "#BD34FE", bg: "rgba(189,52,254,0.10)",  desc: "Lightning-fast HMR bundler" },
  { name: "FastAPI",     cat: "Backend",      color: "#00BFA5", bg: "rgba(0,191,165,0.10)",   desc: "Async Python REST framework" },
  { name: "LangChain",   cat: "AI Framework", color: "#4BBDE0", bg: "rgba(75,189,224,0.10)",  desc: "LLM orchestration & prompt chains" },
  { name: "Groq",        cat: "LLM Cloud",    color: "#F55036", bg: "rgba(245,80,54,0.10)",   desc: "Ultra-fast inference API" },
  { name: "Ollama",      cat: "LLM Local",    color: "#C8ECFA", bg: "rgba(200,236,250,0.08)", desc: "Run LLMs locally on-device" },
  { name: "Pydantic",    cat: "Validation",   color: "#E92063", bg: "rgba(233,32,99,0.10)",   desc: "Data validation & schemas" },
  { name: "CSS",    cat: "Styling",      color: "#4BBDE0", bg: "rgba(75,189,224,0.10)",  desc: "Custom glacier-themed styles" },
];

const BOTS = [
  { name: "Basic Assistant",    icon: "◈", desc: "General-purpose helpful AI for any topic." },
  { name: "Validated Assistant",icon: "◎", desc: "Validates user inputs before responding." },
  { name: "Career Advisor",     icon: "▲", desc: "Careers, job roles, roadmaps & skill paths." },
  { name: "Code Mentor",        icon: "⟨⟩",desc: "Code writing, debugging & best practices." },
  { name: "Tutor Bot",          icon: "◇", desc: "Step-by-step explanations for beginners." },
  { name: "Multimode Bot",      icon: "⊕", desc: "Versatile bot adapting to any context." },
  { name: "Temp Comparison",    icon: "≈", desc: "Same prompt at 0.1, 0.5 and 0.9 side-by-side." },
];

const ARCH = [
  { step: "1", label: "User Input",      desc: "React frontend collects message + config params" },
  { step: "2", label: "POST /chat",      desc: "FastAPI receives ChatRequest with bot_type, provider, temperature" },
  { step: "3", label: "Prompt Factory",  desc: "Builds LangChain ChatPromptTemplate with system persona" },
  { step: "4", label: "LLM Factory",     desc: "Instantiates ChatGroq or ChatOllama with selected params" },
  { step: "5", label: "LangChain Chain", desc: "prompt | llm | StrOutputParser runs in sequence" },
  { step: "6", label: "Memory Store",    desc: "Optional session history appended via in-memory defaultdict" },
  { step: "7", label: "Response",        desc: "ChatResponse JSON returned → rendered as Markdown in UI" },
];

const SectionLabel = ({ children }) => (
  <p style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{children}</p>
);

const AboutPage = ({ setPage }) => (
  <div style={{ paddingTop: 62, minHeight: "100vh", position: "relative", zIndex: 1 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem 4rem" }}>

      {/* Page heading */}
      <div className="fade-up" style={{ marginBottom: "3.5rem" }}>
        <SectionLabel>About This Project</SectionLabel>
        <h1 style={{
          fontFamily: "var(--serif)", fontSize: "clamp(2rem,5vw,3.5rem)",
          lineHeight: 1.08, color: "var(--text)"
        }}>
          Architecture &<br/>
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Tech Stack</em>
        </h1>
      </div>

      {/* ── Request Flow ── */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--text)", marginBottom: "1.5rem" }}>Request Flow</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ARCH.map((a, i) => (
            <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.06}s`, display: "flex", gap: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(27,111,168,0.2)", border: "1px solid var(--border2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600, color: "var(--accent)"
                }}>{a.step}</div>
                {i < ARCH.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 20, background: "var(--border)", margin: "4px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: 22 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--highlight)", marginBottom: 2 }}>{a.label}</p>
                <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.55 }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--text)", marginBottom: "1.5rem" }}>Tech Stack</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {STACK.map((s, i) => (
            <div key={s.name} className="fade-up" style={{
              animationDelay: `${i * 0.055}s`,
              background: "var(--glass2)", backdropFilter: "blur(8px)",
              border: "0.5px solid var(--border)",
              borderRadius: 14, padding: "1rem 1.2rem",
              transition: "border-color 0.2s, transform 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{s.name}</span>
                <span style={{
                  fontSize: 10, padding: "3px 8px", borderRadius: 100, fontWeight: 500,
                  background: s.bg, color: s.color, letterSpacing: "0.04em"
                }}>{s.cat}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Available Bots ── */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--text)", marginBottom: "1.5rem" }}>Available Bots</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {BOTS.map((b, i) => (
            <div key={b.name} className="fade-up" style={{
              animationDelay: `${i * 0.055}s`,
              display: "flex", gap: 12, alignItems: "flex-start",
              background: "var(--glass2)", backdropFilter: "blur(8px)",
              border: "0.5px solid var(--border)",
              borderRadius: 14, padding: "1rem 1.2rem",
              transition: "border-color 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "rgba(27,111,168,0.18)", border: "1px solid var(--border2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: "var(--accent)"
              }}>{b.icon}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--highlight)", marginBottom: 3 }}>{b.name}</p>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "var(--glass2)", backdropFilter: "blur(12px)",
        border: "0.5px solid var(--border)", borderRadius: 20,
        padding: "3rem", textAlign: "center"
      }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--text)", marginBottom: 10 }}>
          Try it yourself
        </h2>
        <p style={{ color: "var(--text2)", marginBottom: "1.5rem", fontSize: 15 }}>Pick a bot and start exploring the system.</p>
        <button
          onClick={() => setPage("chat")}
          style={{
            fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14,
            padding: "12px 36px", borderRadius: 100,
            background: "var(--primary)", color: "var(--highlight)",
            border: "1px solid rgba(75,189,224,0.3)", cursor: "pointer",
            boxShadow: "0 0 30px rgba(27,111,168,0.35)",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--primary)"; }}
        >Open Chat →</button>
      </section>

      <footer style={{ padding: "2rem 0", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--text3)" }}>VelaAI · FastAPI + LangChain + Groq + Ollama</p>
      </footer>
    </div>
  </div>
);

export default AboutPage;