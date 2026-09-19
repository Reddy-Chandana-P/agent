import { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const canSend = value.trim() && !disabled;

  return (
    <div className="px-4 pb-5 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="glass-input rounded-2xl px-4 py-3 flex items-end gap-3">

          {/* Mic button */}
          <button className="p-1.5 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/10 transition-all shrink-0 mb-0.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-white/85 placeholder-white/20 resize-none outline-none leading-relaxed max-h-40"
          />

          {/* Attach button */}
          <button className="p-1.5 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/10 transition-all shrink-0 mb-0.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`p-2 rounded-xl transition-all shrink-0 mb-0.5 ${
              canSend
                ? "bg-gradient-to-br from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/30 scale-100 hover:scale-105"
                : "bg-white/5 text-white/15 cursor-not-allowed"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <p className="text-center text-[11px] text-white/15 mt-2">
          Agent can make mistakes — double-check important info.
        </p>
      </div>
    </div>
  );
}
