import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveObject = ({ position, color, shape }: { position: [number, number, number], color: string, shape: 'sphere' | 'box' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time) * 0.2;
    meshRef.current.rotation.y += 0.01;
    if (clicked) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.5, 0.1));
    } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
    }
  });

  return (
    <mesh
      position={position}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => setClick(!clicked)}
      castShadow
    >
      {shape === 'sphere' && <sphereGeometry args={[0.7, 64, 64]} />}
      {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {shape === 'torus' && <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />}

      <MeshDistortMaterial
        color={hovered ? "#ff70a9" : color}
        speed={hovered ? 5 : 2}
        distort={hovered ? 0.6 : 0.3}
        radius={1}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const GamePlayer: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#050505] relative rounded-lg overflow-hidden group">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a970ff" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <group position={[0, 0, 0]}>
            <InteractiveObject position={[-2, 0, 0]} color="#a970ff" shape="sphere" />
            <InteractiveObject position={[0, 0, 0]} color="#70a9ff" shape="box" />
            <InteractiveObject position={[2, 0, 0]} color="#70ff88" shape="torus" />
        </group>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />

        <OrbitControls
            enableZoom={true}
            maxDistance={15}
            minDistance={3}
            autoRotate
            autoRotateSpeed={0.5}
        />
        <Environment preset="city" />
      </Canvas>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 text-white text-[10px] p-2 rounded border border-white/20 backdrop-blur-md">
              <p>Drag to Rotate</p>
              <p>Scroll to Zoom</p>
              <p>Click Objects to Scale</p>
          </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
        <span className="text-white text-xs font-bold tracking-tight">INTERACTIVE STREAM</span>
      </div>
    </div>
  );
};

export default GamePlayer;
