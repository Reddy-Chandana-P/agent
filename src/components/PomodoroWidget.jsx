import { useState, useEffect, useRef } from "react";

const MODES = {
  focus: { label: "Focus", duration: 25 * 60, color: "text-violet-600", ring: "stroke-violet-500" },
  short: { label: "Short Break", duration: 5 * 60, color: "text-emerald-600", ring: "stroke-emerald-500" },
  long:  { label: "Long Break", duration: 15 * 60, color: "text-blue-600", ring: "stroke-blue-500" },
};

const SIZE = 80;
const R = 34;
const CIRC = 2 * Math.PI * R;

export default function PomodoroWidget() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const intervalRef = useRef(null);

  const total = MODES[mode].duration;
  const progress = timeLeft / total;
  const dashOffset = CIRC * (1 - progress);

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

  const switchMode = (m) => {
    setMode(m);
    setTimeLeft(MODES[m].duration);
    setRunning(false);
  };

  const reset = () => { setTimeLeft(MODES[mode].duration); setRunning(false); };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const { color, ring } = MODES[mode];

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {collapsed ? (
        /* Collapsed pill */
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-2.5 hover:shadow-xl transition-all"
        >
          <span className={`text-sm font-bold tabular-nums ${color}`}>{mins}:{secs}</span>
          <span className="text-xs text-gray-400">{MODES[mode].label}</span>
          {running && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
        </button>
      ) : (
        /* Expanded widget */
        <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-5 w-56 animate-fade-up">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Pomodoro</span>
            <button onClick={() => setCollapsed(true)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 mb-4 bg-gray-50 rounded-xl p-1">
            {Object.entries(MODES).map(([k, v]) => (
              <button
                key={k}
                onClick={() => switchMode(k)}
                className={`flex-1 text-[10px] font-medium py-1 rounded-lg transition-all ${
                  mode === k ? "bg-white shadow text-gray-700" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {k === "focus" ? "Focus" : k === "short" ? "Short" : "Long"}
              </button>
            ))}
          </div>

          {/* Ring timer */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <svg width={SIZE} height={SIZE} className="-rotate-90">
                <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="#f3f4f6" strokeWidth="5" />
                <circle
                  cx={SIZE/2} cy={SIZE/2} r={R}
                  fill="none"
                  className={ring}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.8s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-xl font-bold tabular-nums ${color}`}>{mins}:{secs}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
                </svg>
              </button>

              <button
                onClick={() => setRunning((r) => !r)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  running
                    ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    : "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-200 hover:scale-105"
                }`}
              >
                {running ? "Pause" : "Start"}
              </button>

              <button
                onClick={() => { const keys = Object.keys(MODES); switchMode(keys[(keys.indexOf(mode)+1)%keys.length]); }}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="13 17 18 12 13 7"/>
                  <polyline points="6 17 11 12 6 7"/>
                </svg>
              </button>
            </div>

            <p className={`text-xs font-medium ${color}`}>{MODES[mode].label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
