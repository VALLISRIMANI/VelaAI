import { useState } from "react";
import "./styles/theme.css";
import Background from "./components/Background.jsx";
import Nav from "./components/Nav.jsx";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

/* ════════════════════════════════
   VelaAI — Root
   Palette: Glacier (deep ocean blues, ice whites, frosted glass)
════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Background />
      <Nav page={page} setPage={setPage} />
      {page === "home"  && <HomePage setPage={setPage} />}
      {page === "chat"  && <ChatPage />}
      {page === "about" && <AboutPage setPage={setPage} />}
    </>
  );
}