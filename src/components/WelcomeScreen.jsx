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
    <div className="relative flex flex-col items-center justify-center h-full px-6 overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-2xl">

        {/* Logo + title */}
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-violet-500/40 blur-xl animate-pulse-glow" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.7"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.85"/>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-2">Hey, I'm Agent</h1>
            <p className="text-white/40 text-base">Your personal AI assistant — always ready to help.</p>
          </div>
        </div>

        {/* Suggestion cards */}
        <div className="grid grid-cols-3 gap-3 w-full animate-fade-up" style={{animationDelay:"0.1s", opacity:0}}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggest(s.text)}
              className="group flex flex-col gap-2 glass rounded-2xl p-4 text-left hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-[11px] text-violet-400/70 font-medium uppercase tracking-widest mb-0.5">{s.label}</p>
                <p className="text-xs text-white/55 group-hover:text-white/80 transition-colors leading-relaxed">{s.text}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-6 animate-fade-up" style={{animationDelay:"0.2s", opacity:0}}>
          {["Always on", "Private", "Fast"].map((label, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-dot text-emerald-400" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
