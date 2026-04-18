/* ── Nav.jsx ── */

const Nav = ({ page, setPage }) => {
  const links = ["home", "chat", "about"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem", height: 62,
      background: "rgba(6,14,20,0.80)",
      backdropFilter: "blur(16px) saturate(1.4)",
      WebkitBackdropFilter: "blur(16px) saturate(1.4)",
      borderBottom: "0.5px solid var(--border)"
    }}>
      <button
        onClick={() => setPage("home")}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "baseline", gap: 1 }}
      >
        <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "var(--highlight)", letterSpacing: "-0.02em" }}>Vela</span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic", color: "var(--accent)", letterSpacing: "-0.02em" }}>AI</span>
      </button>

      <div style={{ display: "flex", gap: 6 }}>
        {links.map(l => {
          const active = page === l;
          return (
            <button
              key={l}
              onClick={() => setPage(l)}
              style={{
                fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500,
                padding: "6px 18px", borderRadius: 100,
                border: active ? "1px solid var(--accent)" : "1px solid transparent",
                background: active ? "rgba(75,189,224,0.12)" : "transparent",
                color: active ? "var(--highlight)" : "var(--text2)",
                cursor: "pointer", transition: "all 0.2s",
                textTransform: "capitalize", letterSpacing: "0.03em"
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border2)"; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "transparent"; }}}
            >{l}</button>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;