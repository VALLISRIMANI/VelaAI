import { useState, useEffect } from "react";

/* ── HomePage.jsx — Glacier palette ── */

const FEATURES = [
  { icon: "◈", title: "Multi-Bot Intelligence", desc: "6 specialized bots — from Career Advisor to Code Mentor. Each precision-tuned for its domain." },
  { icon: "⊕", title: "Dual LLM Providers", desc: "Switch between local Ollama models and blazing-fast Groq cloud inference in one click." },
  { icon: "◎", title: "Persistent Memory", desc: "Session-aware context window keeps conversations coherent across long exchanges." },
  { icon: "◇", title: "Temperature Control", desc: "Fine-tune creativity vs precision. Compare all temperatures side-by-side with one bot." },
  { icon: "▷", title: "Streaming Responses", desc: "Real-time token streaming via FastAPI for a fluid, responsive chat experience." },
  { icon: "◻", title: "Markdown Rendering", desc: "Beautifully formatted responses with code blocks, lists, and structured output." },
];

const STATS = [["6","Specialized Bots"],["2","LLM Backends"],["∞","Memory Sessions"],["3","Temp Modes"]];

const FeatureCard = ({ icon, title, desc, delay }) => (
  <div
    className="fade-up"
    style={{
      animationDelay: delay,
      background: "var(--glass2)", backdropFilter: "blur(10px)",
      border: "0.5px solid var(--border)",
      borderRadius: 18, padding: "1.75rem",
      transition: "border-color 0.25s, transform 0.25s, background 0.25s",
      cursor: "default"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "var(--border3)";
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.background = "rgba(20,40,64,0.7)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.background = "var(--glass2)";
    }}
  >
    <div style={{
      width: 40, height: 40, borderRadius: 12, marginBottom: 16,
      background: "rgba(75,189,224,0.1)", border: "1px solid var(--border2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18, color: "var(--accent)"
    }}>{icon}</div>
    <h3 style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15, color: "var(--highlight)", marginBottom: 8 }}>{title}</h3>
    <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7 }}>{desc}</p>
  </div>
);

const HomePage = ({ setPage }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ paddingTop: 62, minHeight: "100vh", position: "relative", zIndex: 1 }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "5rem 2rem 4rem", position: "relative"
      }}>
        {/* Hero aurora orb */}
        <div style={{
          position: "absolute", top: "28%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 500, borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(27,111,168,0.22) 0%, rgba(75,189,224,0.06) 40%, transparent 70%)"
        }} className="float" />

        {/* Badge */}
        <div className="fade-up" style={{ animationDelay: "0.05s" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, fontWeight: 500, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--accent)",
            border: "1px solid var(--border2)", padding: "6px 18px",
            borderRadius: 100, marginBottom: "2rem",
            background: "rgba(75,189,224,0.06)"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            Powered by Groq · Ollama · FastAPI
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up" style={{
          animationDelay: "0.18s",
          fontFamily: "var(--serif)", fontSize: "clamp(3rem,3vw,6.5rem)",
          lineHeight: 1.04, letterSpacing: "-0.025em",
          color: "var(--text)", maxWidth: 860
        }}>
          GenAI LLM Chat Bots<br/>
          <em style={{ color: "var(--accent)", fontStyle: "italic", fontSize: "clamp(1.5rem,1vw,6.5rem)" }}>Interact with AI models powered by LangChain.</em>
        </h1>

        {/* Subtext */}
        <p className="fade-up" style={{
          animationDelay: "0.33s",
          fontSize: 18, color: "var(--text2)", maxWidth: 540,
          lineHeight: 1.75, marginTop: "1.5rem"
        }}>
          A full-stack GenAI playground with swappable LLM backends,
          specialized bots, memory, and real-time streaming.
        </p>

        {/* CTAs */}
        <div className="fade-up" style={{
          animationDelay: "0.48s",
          display: "flex", gap: 12, marginTop: "2.5rem",
          flexWrap: "wrap", justifyContent: "center"
        }}>
          <button
            onClick={() => setPage("chat")}
            style={{
              fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15,
              padding: "14px 38px", borderRadius: 100,
              background: "var(--primary)", color: "var(--highlight)",
              border: "1px solid rgba(75,189,224,0.3)", cursor: "pointer",
              boxShadow: "0 0 40px rgba(27,111,168,0.5)",
              transition: "all 0.22s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(75,189,224,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(27,111,168,0.5)"; }}
          >Start Chatting →</button>

          <button
            onClick={() => setPage("about")}
            style={{
              fontFamily: "var(--sans)", fontWeight: 500, fontSize: 15,
              padding: "14px 36px", borderRadius: 100,
              background: "transparent", color: "var(--text2)",
              border: "1px solid var(--border2)", cursor: "pointer",
              transition: "all 0.22s"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--highlight)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; }}
          >View Architecture</button>
        </div>

        {/* Stat pills */}
        <div className="fade-up" style={{
          animationDelay: "0.63s",
          display: "flex", gap: 14, marginTop: "3.5rem",
          flexWrap: "wrap", justifyContent: "center"
        }}>
          {STATS.map(([n, l]) => (
            <div key={l} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              background: "var(--glass2)", backdropFilter: "blur(8px)",
              border: "0.5px solid var(--border)", borderRadius: 16,
              padding: "14px 26px", minWidth: 110,
              transition: "border-color 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <span style={{ fontFamily: "var(--serif)", fontSize: 30, color: "var(--accent)", lineHeight: 1.1 }}>{n}</span>
              <span style={{ fontSize: 11, color: "var(--text3)", marginTop: 4, textAlign: "center", letterSpacing: "0.05em" }}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "5rem 2rem 6rem", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="fade-up" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>What's Inside</p>
          <h2 className="fade-up" style={{
            animationDelay: "0.1s",
            fontFamily: "var(--serif)", fontSize: "clamp(2rem,4vw,3rem)",
            color: "var(--text)", lineHeight: 1.1
          }}>Built for <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Builders</em></h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} delay={`${0.08 * i}s`} />)}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{
        padding: "5rem 2rem",
        textAlign: "center",
        borderTop: "0.5px solid var(--border)"
      }}>
        <h2 className="fade-up" style={{
          fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
          color: "var(--text)", marginBottom: "1rem"
        }}>Ready to explore?</h2>
        <p className="fade-up" style={{ animationDelay: "0.1s", color: "var(--text2)", marginBottom: "2rem", fontSize: 16 }}>
          Pick a bot, choose your provider, and start a conversation.
        </p>
        <button
          className="fade-up ice-glow"
          style={{
            animationDelay: "0.2s",
            fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15,
            padding: "14px 46px", borderRadius: 100,
            background: "var(--primary)", color: "var(--highlight)",
            border: "1px solid rgba(75,189,224,0.3)", cursor: "pointer",
            transition: "all 0.22s"
          }}
          onClick={() => setPage("chat")}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--primary)"; }}
        >Open Chat →</button>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "1.5rem 2.5rem",
        borderTop: "0.5px solid var(--border)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 15, color: "var(--text3)" }}>VelaAI</span>
        <span style={{ fontSize: 12, color: "var(--text3)" }}>FastAPI · LangChain · Groq · Ollama</span>
      </footer>
    </div>
  );
};

export default HomePage;