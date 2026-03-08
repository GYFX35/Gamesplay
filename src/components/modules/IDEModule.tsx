"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  FolderTree,
  FileCode,
  Terminal as TerminalIcon,
  Play,
  Save,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const IDEModule = () => {
  const [code, setCode] = useState(`// Welcome to Gamesplay IDE
// Write your game logic here

import { Entity, Component } from 'gamesplay-sdk';

export class PlayerMovement extends Component {
  speed: number = 5;

  onUpdate(deltaTime: number) {
    const input = this.entity.getComponent(Input);
    const movement = input.getMovementVector();

    this.entity.position.x += movement.x * this.speed * deltaTime;
    this.entity.position.z += movement.z * this.speed * deltaTime;
  }
}
`);

  const [activeFile, setActiveFile] = useState('PlayerMovement.ts');

  const files = [
    { name: 'src', isOpen: true, type: 'folder', children: [
      { name: 'components', isOpen: true, type: 'folder', children: [
        { name: 'PlayerMovement.ts', type: 'file' },
        { name: 'HealthSystem.ts', type: 'file' },
      ]},
      { name: 'main.ts', type: 'file' },
    ]},
    { name: 'assets', isOpen: false, type: 'folder', children: [] },
    { name: 'package.json', type: 'file' },
  ];

  const renderFileTree = (items: any[], depth = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-4 cursor-pointer hover:bg-zinc-800 transition-colors text-sm",
            activeFile === item.name && item.type === 'file' ? "bg-purple-600/20 text-purple-400" : "text-zinc-400"
          )}
          style={{ paddingLeft: `${depth * 16 + 16}px` }}
          onClick={() => item.type === 'file' && setActiveFile(item.name)}
        >
          {item.type === 'folder' ? (
            item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <FileCode size={14} className="text-blue-400" />
          )}
          <span>{item.name}</span>
        </div>
        {item.type === 'folder' && item.isOpen && item.children && renderFileTree(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar explorer */}
        <div className="w-64 border-r border-[#27272a] bg-[#0c0c0e] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Explorer</span>
            <FolderTree size={16} className="text-zinc-500" />
          </div>
          <div className="flex-1 overflow-auto py-2">
            {renderFileTree(files)}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-10 border-b border-[#27272a] bg-[#0f0f12] flex items-center px-4 justify-between shrink-0">
            <div className="flex items-center gap-2">
              <FileCode size={14} className="text-blue-400" />
              <span className="text-xs text-zinc-300">{activeFile}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 transition-colors">
                <Save size={14} />
              </button>
              <button className="p-1.5 bg-green-600/20 text-green-500 hover:bg-green-600/30 rounded flex items-center gap-2 px-3 transition-colors">
                <Play size={14} />
                <span className="text-xs font-medium uppercase tracking-tight">Run</span>
              </button>
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 },
              }}
            />
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="h-48 border-t border-[#27272a] bg-[#0c0c0e] flex flex-col shrink-0">
        <div className="h-8 border-b border-[#27272a] flex items-center px-4 bg-[#0f0f12]">
          <div className="flex items-center gap-2 text-zinc-400">
            <TerminalIcon size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Terminal</span>
          </div>
        </div>
        <div className="flex-1 p-4 font-mono text-sm text-zinc-400 overflow-auto">
          <div className="flex gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-zinc-500">~/gamesplay</span>
            <span>npm start</span>
          </div>
          <div className="mt-1 text-zinc-500 italic">[System] Compiling assets...</div>
          <div className="text-zinc-500 italic">[System] Starting development server...</div>
          <div className="text-zinc-300 mt-2">Ready on http://localhost:3000</div>
        </div>
      </div>
    </div>
  );
};

export default IDEModule;
