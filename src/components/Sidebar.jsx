import { useState } from "react";

const mockChats = [
  { id: 1, title: "Plan my week", time: "Today" },
  { id: 2, title: "Summarize this article", time: "Today" },
  { id: 3, title: "Morning briefing", time: "Yesterday" },
  { id: 4, title: "Top tech news", time: "Yesterday" },
  { id: 5, title: "Remind me about meeting", time: "Sep 15" },
];

export default function Sidebar({ onNewChat, activeId, onSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar-bg flex flex-col h-full transition-all duration-300 shrink-0 ${collapsed ? "w-14" : "w-60"}`}>

      {/* Decorative top gradient strip */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 shrink-0" />

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-violet-400/30 blur-sm" />
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeOpacity="0.7"/>
                </svg>
              </div>
            </div>
            <span className="text-base font-bold gradient-text tracking-wide">Agent</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-500 transition-all ml-auto"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* New Chat */}
      <div className="px-3 mb-4">
        <button
          onClick={onNewChat}
          className={`new-chat-btn flex items-center gap-2 w-full p-2.5 rounded-xl text-white text-sm font-semibold transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {!collapsed && <span>New chat</span>}
        </button>
      </div>

      {/* History */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          <p className="text-[10px] text-gray-400 px-2 py-1.5 uppercase tracking-widest font-bold">Recent</p>
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`group flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                activeId === chat.id
                  ? "bg-gradient-to-r from-violet-100 to-purple-50 text-violet-700 border border-violet-200 font-semibold shadow-sm"
                  : "text-gray-500 hover:bg-white/70 hover:text-gray-800 border border-transparent hover:shadow-sm"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-50">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* User */}
      <div className="p-3 mt-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-3" />
        <button className={`flex items-center gap-2.5 w-full p-2 rounded-xl hover:bg-white/60 transition-all ${collapsed ? "justify-center" : ""}`}>
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-violet-400/30 blur-sm" />
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-200">
              R
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
          </div>
          {!collapsed && (
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-700">Reddy</p>
              <p className="text-[11px] text-emerald-500 font-medium">● Online</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
