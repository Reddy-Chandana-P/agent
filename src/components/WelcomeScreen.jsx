const suggestions = [
  { icon: "📰", label: "News", text: "What's happening in tech today?" },
  { icon: "📅", label: "Planning", text: "Help me plan my week" },
  { icon: "✍️", label: "Writing", text: "Draft a professional email" },
  { icon: "💡", label: "Ideas", text: "Give me a productivity tip" },
  { icon: "🌤️", label: "Briefing", text: "Give me my morning briefing" },
  { icon: "🔍", label: "Research", text: "Summarize a topic for me" },
];

export default function WelcomeScreen({ onSuggest }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 bg-[#f5f5f7]">
      <div className="flex flex-col items-center gap-10 w-full max-w-2xl">

        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-violet-400/20 blur-xl animate-pulse-glow" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-200">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.7"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.85"/>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold gradient-text mb-3">Hey, I am Agent</h1>
            <p className="text-gray-500 text-lg">Your personal AI assistant — always ready to help.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggest(s.text)}
              className="group flex flex-col gap-2 bg-white rounded-2xl p-4 text-left border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-xs text-violet-500 font-semibold uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors leading-relaxed">{s.text}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {["Always on", "Private", "Fast"].map((label, i) => (
            <div key={i} className="flex items-center gap-1.5 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
