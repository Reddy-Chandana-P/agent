import { useState, useRef } from "react";

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

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

  return (
    <div className="px-4 pb-5 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-[#1e1e1e] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/20 transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-white/85 placeholder-white/25 resize-none outline-none leading-relaxed max-h-40"
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className={`p-2 rounded-xl transition-all shrink-0 ${
              value.trim() && !disabled
                ? "bg-violet-600 hover:bg-violet-500 text-white"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            <SendIcon />
          </button>
        </div>
        <p className="text-center text-[11px] text-white/20 mt-2">
          Agent can make mistakes. Double-check important info.
        </p>
      </div>
    </div>
  );
}
