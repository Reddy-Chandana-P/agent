const suggestions = [
  { icon: "📰", text: "What's happening in tech today?" },
  { icon: "📅", text: "Help me plan my week" },
  { icon: "✍️", text: "Draft a professional email" },
  { icon: "💡", text: "Give me a productivity tip" },
];

export default function WelcomeScreen({ onSuggest }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 gap-8">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V15a1 1 0 0 0-2 0v1.93A8 8 0 0 1 4.07 13H6a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 0 0 2h1.93A8 8 0 0 1 13 16.93z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-1">Hey, I'm Agent</h1>
        <p className="text-white/40 text-sm">Your personal assistant. What can I help with?</p>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggest(s.text)}
            className="flex items-center gap-2 bg-[#1e1e1e] hover:bg-[#252525] border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 text-left transition-all"
          >
            <span className="text-lg">{s.icon}</span>
            <span className="text-sm text-white/60 hover:text-white/80">{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
