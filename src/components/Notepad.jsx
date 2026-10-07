import { useState, useEffect } from "react";

export default function Notepad({ onClose }) {
  const [text, setText] = useState(() => localStorage.getItem("agent-notepad") || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("agent-notepad", text);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 600);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl shadow-violet-200/50 w-full max-w-xl flex flex-col animate-fade-up border border-violet-100"
        style={{ height: "520px" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
              <span className="text-sm">📝</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Notepad</h2>
              <p className="text-[10px] text-gray-400">Auto-saved to browser</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 animate-fade-up">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Saved
              </span>
            )}
            <button
              onClick={() => { setText(""); localStorage.removeItem("agent-notepad"); }}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-all"
              title="Clear"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-600 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          autoFocus
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start typing your notes here..."
          className="flex-1 w-full px-5 py-4 text-sm text-gray-700 placeholder-gray-300 resize-none outline-none leading-relaxed rounded-b-3xl"
          style={{ fontFamily: "inherit" }}
        />

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[10px] text-gray-300">{text.length} characters · {text.split(/\s+/).filter(Boolean).length} words</span>
          <span className="text-[10px] text-gray-300">Click outside to close</span>
        </div>
      </div>
    </div>
  );
}
