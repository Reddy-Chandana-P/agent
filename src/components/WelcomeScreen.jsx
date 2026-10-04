import PomodoroCard from "./PomodoroCard";

const suggestions = [
  { icon: "📰", label: "News", text: "What's happening in tech today?", from: "from-orange-100", to: "to-amber-50", border: "border-orange-200", accent: "text-orange-500", shadow: "hover:shadow-orange-100" },
  { icon: "📅", label: "Planning", text: "Help me plan my week", from: "from-violet-100", to: "to-purple-50", border: "border-violet-200", accent: "text-violet-600", shadow: "hover:shadow-violet-100" },
  { icon: "✍️", label: "Writing", text: "Draft a professional email", from: "from-blue-100", to: "to-indigo-50", border: "border-blue-200", accent: "text-blue-600", shadow: "hover:shadow-blue-100" },
  { icon: "💡", label: "Ideas", text: "Give me a productivity tip", from: "from-yellow-100", to: "to-lime-50", border: "border-yellow-200", accent: "text-yellow-600", shadow: "hover:shadow-yellow-100" },
  { icon: "🌤️", label: "Briefing", text: "Give me my morning briefing", from: "from-sky-100", to: "to-cyan-50", border: "border-sky-200", accent: "text-sky-600", shadow: "hover:shadow-sky-100" },
];

export default function WelcomeScreen({ onSuggest }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 overflow-hidden main-bg">

      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-blob pointer-events-none" style={{animationDelay:"3s"}} />
      <div className="absolute top-1/2 left-[-100px] w-64 h-64 bg-blue-200/25 rounded-full blur-3xl animate-blob pointer-events-none" style={{animationDelay:"1.5s"}} />

      {["top-20 left-1/4 w-2 h-2 bg-violet-400","top-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400","bottom-1/3 left-1/3 w-2 h-2 bg-blue-400","bottom-20 right-1/3 w-1.5 h-1.5 bg-amber-400"].map((cls, i) => (
        <div key={i} className={`absolute ${cls} rounded-full opacity-60 animate-float pointer-events-none`} style={{animationDelay:`${i*1.2}s`}} />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-2xl">

        <div className="flex flex-col items-center gap-5 animate-fade-up">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-400/40 to-pink-400/40 blur-2xl animate-pulse-glow" />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-violet-400/40">
              <div className="absolute top-2 left-2 w-8 h-8 rounded-2xl bg-white/20 blur-md" />
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.7"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.85"/>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold gradient-text mb-3 tracking-tight">Hey, I'm Agent ✨</h1>
            <p className="text-gray-400 text-lg font-light">Your personal AI assistant — always ready to help.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full animate-fade-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggest(s.text)}
              className={`group flex flex-col gap-3 bg-gradient-to-br ${s.from} ${s.to} rounded-2xl p-4 text-left border ${s.border} hover:shadow-xl ${s.shadow} transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{s.icon}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`opacity-0 group-hover:opacity-100 transition-opacity ${s.accent}`}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${s.accent}`}>{s.label}</p>
                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors leading-relaxed">{s.text}</p>
              </div>
            </button>
          ))}
          <PomodoroCard />
        </div>

        <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.25s", opacity: 0 }}>
          {[
            { label: "Always on", color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
            { label: "Private", color: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
            { label: "Fast", color: "bg-pink-500", bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
          ].map((s, i) => (
            <div key={i} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${s.bg} ${s.text} border ${s.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
