import { useState } from "react";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChatIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

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
    <div
      className={`flex flex-col h-full bg-[#171717] border-r border-white/5 transition-all duration-300 ${
        collapsed ? "w-14" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        {!collapsed && (
          <span className="text-sm font-semibold text-white/80 tracking-wide">Agent</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors ml-auto"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* New Chat */}
      <div className="p-2">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors text-sm"
        >
          <PlusIcon />
          {!collapsed && <span>New chat</span>}
        </button>
      </div>

      {/* Chat History */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          <p className="text-[11px] text-white/30 px-2 py-1 uppercase tracking-wider">Recent</p>
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg text-left text-sm transition-colors ${
                activeId === chat.id
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <ChatIcon />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* User */}
      <div className="p-2 border-t border-white/5">
        <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-white/10 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            R
          </div>
          {!collapsed && <span className="text-sm text-white/70">Reddy</span>}
        </button>
      </div>
    </div>
  );
}
