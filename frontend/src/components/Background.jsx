/* ── Background.jsx ──
   Glacier atmosphere: noise grain + animated radial aurora */

const Background = () => (
  <>
    {/* Deep-sea radial gradient base */}
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      background: `
        radial-gradient(ellipse 80% 60% at 20% 10%, rgba(27,111,168,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 80%, rgba(75,189,224,0.10) 0%, transparent 55%),
        radial-gradient(ellipse 100% 80% at 50% 50%, rgba(6,14,20,1) 40%, transparent 100%)
      `
    }} />

    {/* Noise grain overlay */}
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.45,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat"
    }} />

    {/* Ice crystal grid — very faint */}
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(148,210,240,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148,210,240,0.025) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px"
    }} />
  </>
);

export default Background;