import { useState, useEffect, useRef } from "react";

const MODES = {
  focus: { label: "Focus", duration: 25 * 60, color: "text-pink-600", ring: "stroke-pink-500", bg: "from-pink-100 to-rose-50", border: "border-pink-200" },
  short: { label: "Short", duration: 5 * 60, color: "text-rose-400", ring: "stroke-rose-400", bg: "from-pink-100 to-rose-50", border: "border-pink-200" },
  long:  { label: "Long",  duration: 15 * 60, color: "text-fuchsia-500", ring: "stroke-fuchsia-400", bg: "from-pink-100 to-rose-50", border: "border-pink-200" },
};

const SIZE = 64;
const R = 26;
const CIRC = 2 * Math.PI * R;

export default function PomodoroCard() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const total = MODES[mode].duration;
  const dashOffset = CIRC * (1 - timeLeft / total);
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const { color, ring, bg, border } = MODES[mode];

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const switchMode = (m) => { setMode(m); setTimeLeft(MODES[m].duration); setRunning(false); };

  return (
    <div className={`flex flex-col gap-3 bg-gradient-to-br ${bg} rounded-2xl p-4 border ${border} hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 hover:-translate-y-1.5`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-2xl">🍅</span>
        {running && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-pink-600">Pomodoro</p>

        {/* Mode tabs */}
        <div className="flex gap-1 mb-3 bg-white/60 rounded-lg p-0.5">
          {Object.entries(MODES).map(([k, v]) => (
            <button
              key={k}
              onClick={() => switchMode(k)}
              className={`flex-1 text-[9px] font-semibold py-0.5 rounded-md transition-all ${
                mode === k ? "bg-white shadow text-pink-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Ring + controls row */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <svg width={SIZE} height={SIZE} className="-rotate-90">
              <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="4" />
              <circle
                cx={SIZE/2} cy={SIZE/2} r={R}
                fill="none"
                className={ring}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-bold tabular-nums ${color}`}>{mins}:{secs}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <button
              onClick={() => setRunning(r => !r)}
              className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all ${
                running
                  ? "bg-white/80 text-gray-500 hover:bg-white"
                  : "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 hover:scale-105"
              }`}
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => { setTimeLeft(MODES[mode].duration); setRunning(false); }}
              className="w-full py-1 rounded-xl text-[10px] text-pink-400 hover:text-pink-600 hover:bg-white/60 transition-all font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
