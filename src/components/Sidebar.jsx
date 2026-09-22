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

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeOpacity="0.7"/>
              </svg>
            </div>
            <span className="text-sm font-semibold gradient-text tracking-wide">Agent</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ml-auto"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* New Chat */}
      <div className="px-2 mb-3">
        <button
          onClick={onNewChat}
          className={`flex items-center gap-2 w-full p-2.5 rounded-xl border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-600 hover:text-violet-700 transition-all text-sm font-medium ${collapsed ? "justify-center" : ""}`}
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
          <p className="text-[10px] text-gray-400 px-2 py-1.5 uppercase tracking-widest font-medium">Recent</p>
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`group flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left text-sm transition-all ${
                activeId === chat.id
                  ? "bg-violet-50 text-violet-700 border border-violet-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent"
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
      <div className="p-2 mt-auto border-t border-gray-100">
        <button className={`flex items-center gap-2.5 w-full p-2 rounded-xl hover:bg-gray-50 transition-colors ${collapsed ? "justify-center" : ""}`}>
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              R
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          {!collapsed && (
            <div className="text-left">
              <p className="text-xs font-medium text-gray-700">Reddy</p>
              <p className="text-[10px] text-gray-400">Online</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
