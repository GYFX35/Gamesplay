import React from 'react';
import {
  Gamepad2,
  Code2,
  Box,
  Bot,
  Tv,
  Settings,
  Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ModuleType = 'streaming' | 'development' | 'design' | 'ai';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  const items = [
    { id: 'streaming' as const, icon: Tv, label: 'Streaming' },
    { id: 'development' as const, icon: Code2, label: 'Dev IDE' },
    { id: 'design' as const, icon: Box, label: '3D Designer' },
    { id: 'ai' as const, icon: Bot, label: 'AI Agent' },
  ];

  return (
    <div className="flex flex-col w-16 md:w-20 bg-[#0f0f12] border-r border-[#27272a] h-full items-center py-6 gap-8">
      <div className="p-3 bg-purple-600 rounded-xl mb-4 shadow-lg shadow-purple-500/20">
        <Gamepad2 className="w-6 h-6 text-white" />
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={cn(
              "p-3 rounded-xl transition-all duration-200 group relative",
              activeModule === item.id
                ? "bg-purple-600/10 text-purple-500"
                : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <button className="p-3 text-zinc-500 hover:text-zinc-300">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
