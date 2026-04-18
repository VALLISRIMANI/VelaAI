/* ── SimpleMarkdown.jsx ── Glacier-themed markdown renderer */

/* Parses inline **bold** and `code` within any text string */
const inlineParse = (text) =>
  text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((p, j) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return <strong key={j} style={{ color: "var(--highlight)", fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`"))
      return <code key={j} style={{ background: "rgba(75,189,224,0.15)", padding: "1px 6px", borderRadius: 4, fontSize: 12, color: "var(--accent)", fontFamily: "var(--mono)" }}>{p.slice(1, -1)}</code>;
    return p;
  });

const SimpleMarkdown = ({ text }) => {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { codeLines.push(lines[i]); i++; }
      elements.push(
        <pre key={`code-${i}`} style={{
          background: "rgba(6,14,20,0.85)", border: "0.5px solid var(--border2)",
          borderRadius: 10, padding: "14px 18px", overflowX: "auto",
          fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.65,
          color: "var(--glow)", margin: "10px 0"
        }}>
          {lang && <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.12em" }}>{lang}</div>}
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} style={{ fontSize: 14, fontWeight: 600, color: "var(--highlight)", margin: "10px 0 4px", fontFamily: "var(--sans)" }}>{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} style={{ fontSize: 16, fontWeight: 600, color: "var(--highlight)", margin: "12px 0 6px", fontFamily: "var(--serif)" }}>{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={i} style={{ fontSize: 18, fontWeight: 600, color: "var(--highlight)", margin: "14px 0 8px", fontFamily: "var(--serif)" }}>{line.slice(2)}</h1>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={i} style={{ display: "flex", gap: 8, padding: "2px 0" }}>
          <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0, fontSize: 10 }}>◆</span>
          <span style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>{inlineParse(line.slice(2))}</span>
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      const dotIdx = line.indexOf(". ");
      const num = line.slice(0, dotIdx);
      const rest = line.slice(dotIdx + 2);
      elements.push(
        <div key={i} style={{ display: "flex", gap: 8, padding: "2px 0" }}>
          <span style={{ color: "var(--accent)", minWidth: 20, flexShrink: 0, fontWeight: 600, fontSize: 13 }}>{num}.</span>
          <span style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>{inlineParse(rest)}</span>
        </div>
      );
    } else if (line === "") {
      elements.push(<div key={i} style={{ height: 6 }} />);
    } else {
      elements.push(
        <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: "2px 0" }}>
          {inlineParse(line)}
        </p>
      );
    }
    i++;
  }

  return <div>{elements}</div>;
};

export default SimpleMarkdown;