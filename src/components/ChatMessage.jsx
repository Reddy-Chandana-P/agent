export default function ChatMessage({ role, content, isNew }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 px-4 py-2 animate-fade-up ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="relative shrink-0 mt-1">
          <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-md" />
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.7"/>
            </svg>
          </div>
        </div>
      )}

      <div
        className={`max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "msg-user text-white/90 rounded-br-sm"
            : "msg-agent text-white/80 rounded-bl-sm"
        }`}
      >
        {content}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-white shadow-lg shadow-violet-500/20">
          R
        </div>
      )}
    </div>
  );
}
