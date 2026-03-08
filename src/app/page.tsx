"use client";

import { useState } from "react";
import Sidebar, { ModuleType } from "@/components/layout/Sidebar";
import IDEModule from "@/components/modules/IDEModule";
import DesignerModule from "@/components/modules/DesignerModule";
import AIModule from "@/components/modules/AIModule";
import StreamingModule from "@/components/modules/StreamingModule";

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleType>("streaming");

  const renderModule = () => {
    switch (activeModule) {
      case "streaming":
        return <StreamingModule />;
      case "development":
        return <IDEModule />;
      case "design":
        return <DesignerModule />;
      case "ai":
        return <AIModule />;
      default:
        return <div className="p-8 text-2xl font-bold">Select a Module</div>;
    }
  };

  return (
    <main className="flex h-screen w-screen bg-[#09090b] text-zinc-100 overflow-hidden">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-[#27272a] flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-400 capitalize">
              {activeModule}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-green-500">SYSTEM READY</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-[#0c0c0e]">
          {renderModule()}
        </div>
      </div>
    </main>
  );
}
