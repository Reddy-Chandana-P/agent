import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import WelcomeScreen from "./components/WelcomeScreen";
import PomodoroWidget from "./components/PomodoroWidget";

const MOCK_REPLY = "I'm your personal agent — backend coming soon! For now I'm just a pretty face 😄";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: MOCK_REPLY }]);
      setLoading(false);
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveChat(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onNewChat={handleNewChat} activeId={activeChat} onSelect={setActiveChat} />

      <div className="flex flex-col flex-1 overflow-hidden main-bg">

        {/* Topbar */}
        <div className="topbar-bg flex items-center justify-between px-6 py-3.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
              <span className="text-sm text-gray-500 font-medium">
                {messages.length === 0 ? "New conversation" : "Conversation"}
              </span>
            </div>
            {messages.length > 0 && (
              <span className="text-[10px] bg-gradient-to-r from-violet-100 to-pink-100 text-violet-600 px-2.5 py-1 rounded-full font-bold border border-violet-200">
                {messages.filter(m => m.role === "user").length} messages
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[
              <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
              <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>,
              <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
            ].map((path, i) => (
              <button key={i} className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-300 hover:text-violet-500 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{path}</svg>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggest={handleSend} />
          ) : (
            <div className="max-w-3xl mx-auto py-6 space-y-1">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              {loading && (
                <div className="flex gap-3 px-4 py-2 animate-fade-up">
                  <div className="relative shrink-0 mt-1">
                    <div className="absolute inset-0 rounded-full bg-violet-400/30 blur-md" />
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.7"/>
                      </svg>
                    </div>
                  </div>
                  <div className="msg-agent rounded-2xl rounded-bl-sm px-5 py-3 flex items-center gap-2">
                    {["0ms","150ms","300ms"].map((d,i) => (
                      <span key={i} className={`w-2 h-2 rounded-full animate-bounce ${["bg-violet-400","bg-purple-400","bg-pink-400"][i]}`} style={{animationDelay:d}} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
      <PomodoroWidget />
    </div>
  );
}
