"use client";

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Stage, useHelper, Environment } from '@react-three/drei';
import {
  Plus,
  Trash2,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
  Palette,
  Box as BoxIcon,
  Circle as SphereIcon,
  Cone,
  Type
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignerObject {
  id: string;
  type: 'box' | 'sphere' | 'cone' | 'text';
  position: [number, number, number];
  color: string;
  name: string;
}

const DesignerModule = () => {
  const [objects, setObjects] = useState<DesignerObject[]>([
    { id: '1', type: 'box', position: [0, 0.5, 0], color: '#7c3aed', name: 'Hero Cube' },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addObject = (type: DesignerObject['type']) => {
    const newObj: DesignerObject = {
      id: Math.random().toString(36).substring(2, 11),
      type,
      position: [Math.random() * 2 - 1, 0.5, Math.random() * 2 - 1],
      color: '#ffffff',
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${objects.length + 1}`
    };
    setObjects([...objects, newObj]);
    setSelectedId(newObj.id);
  };

  const removeObject = (id: string) => {
    setObjects(objects.filter(o => o.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="flex h-full overflow-hidden bg-[#0c0c0e]">
      {/* Tools Sidebar */}
      <div className="w-16 border-r border-[#27272a] bg-[#0f0f12] flex flex-col items-center py-6 gap-6">
        <button onClick={() => addObject('box')} className="p-3 text-zinc-400 hover:bg-zinc-800 rounded-xl transition-colors">
          <BoxIcon size={20} />
        </button>
        <button onClick={() => addObject('sphere')} className="p-3 text-zinc-400 hover:bg-zinc-800 rounded-xl transition-colors">
          <SphereIcon size={20} />
        </button>
        <button onClick={() => addObject('cone')} className="p-3 text-zinc-400 hover:bg-zinc-800 rounded-xl transition-colors">
          <Cone size={20} />
        </button>
        <div className="h-px w-8 bg-zinc-800" />
        <button className="p-3 text-zinc-400 hover:bg-zinc-800 rounded-xl transition-colors">
          <Palette size={20} />
        </button>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative bg-[#09090b]">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
           <div className="bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
             3D Viewport
           </div>
        </div>

        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Stage intensity={0.5} environment="city" shadows="contact">
              {objects.map((obj) => (
                <mesh
                  key={obj.id}
                  position={obj.position}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(obj.id);
                  }}
                >
                  {obj.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
                  {obj.type === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
                  {obj.type === 'cone' && <coneGeometry args={[0.7, 1.4, 32]} />}
                  <meshStandardMaterial
                    color={obj.id === selectedId ? '#a855f7' : obj.color}
                    emissive={obj.id === selectedId ? '#2e1065' : '#000000'}
                  />
                </mesh>
              ))}
            </Stage>
            <Grid
              infiniteGrid
              fadeDistance={20}
              cellColor="#27272a"
              sectionColor="#4b5563"
              sectionSize={5}
            />
            <OrbitControls makeDefault />
          </Suspense>
        </Canvas>
      </div>

      {/* Properties Panel */}
      <div className="w-72 border-l border-[#27272a] bg-[#0f0f12] flex flex-col">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Hierarchy</span>
          <Layers size={16} className="text-zinc-500" />
        </div>
        <div className="flex-1 overflow-auto p-2">
          {objects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => setSelectedId(obj.id)}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors group",
                selectedId === obj.id ? "bg-purple-600/20 text-purple-400" : "text-zinc-400 hover:bg-zinc-800"
              )}
            >
              <div className="flex items-center gap-2 text-sm">
                {obj.type === 'box' && <BoxIcon size={14} />}
                {obj.type === 'sphere' && <SphereIcon size={14} />}
                {obj.type === 'cone' && <Cone size={14} />}
                <span>{obj.name}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeObject(obj.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {selectedId && (
          <div className="p-4 border-t border-[#27272a] bg-[#0c0c0e]">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-4">Properties</span>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Name</label>
                <input
                  type="text"
                  value={objects.find(o => o.id === selectedId)?.name}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-2 py-1.5 text-xs text-zinc-200"
                  onChange={(e) => {
                    const val = e.target.value;
                    setObjects(objects.map(o => o.id === selectedId ? { ...o, name: val } : o));
                  }}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Color</label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded border border-[#27272a]" style={{ backgroundColor: objects.find(o => o.id === selectedId)?.color }} />
                  <input
                    type="text"
                    value={objects.find(o => o.id === selectedId)?.color}
                    className="flex-1 bg-[#18181b] border border-[#27272a] rounded px-2 py-1.5 text-xs text-zinc-200"
                    onChange={(e) => {
                      const val = e.target.value;
                      setObjects(objects.map(o => o.id === selectedId ? { ...o, color: val } : o));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignerModule;
