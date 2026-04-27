import { useMemo } from 'react';
import type { DroneDesignConfig } from '../../features/designer/types';

interface DroneModelProps {
  design: DroneDesignConfig;
}

export default function DroneModel({ design }: DroneModelProps) {
  const { frame, motors, propellers, battery, camera } = design;

  // Calculate arm positions based on frame type
  const armPositions = useMemo(() => {
    const motorCount = motors.quantity;
    const armLength = (frame.size / 1000) * 0.5; // Convert mm to meters and get radius
    const positions: [number, number, number][] = [];
    
    for (let i = 0; i < motorCount; i++) {
      const angle = (i * 2 * Math.PI) / motorCount;
      positions.push([
        Math.cos(angle) * armLength,
        0,
        Math.sin(angle) * armLength,
      ]);
    }
    
    return positions;
  }, [motors.quantity, frame.size]);

  const frameScale = frame.size / 250; // Normalize to 250mm base
  const propScale = propellers.size / 5; // Normalize to 5 inch base

  return (
    <group>
      {/* Center body/frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.15 * frameScale, 0.05, 0.15 * frameScale]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Battery (underneath center) */}
      <mesh position={[0, -0.04, 0]} castShadow>
        <boxGeometry args={[0.08 * frameScale, 0.03, 0.12 * frameScale]} />
        <meshStandardMaterial color="#1a4d2e" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Flight controller (on top of center) */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.04, 0.01, 0.04]} />
        <meshStandardMaterial color="#0f4c75" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Camera (if present) */}
      {camera.type !== 'none' && (
        <mesh position={[0, 0, frameScale * 0.1]} castShadow>
          <boxGeometry args={[0.03, 0.025, 0.02]} />
          <meshStandardMaterial 
            color={camera.type === 'payload' ? '#8b4513' : '#1a1a1a'} 
            metalness={0.4} 
            roughness={0.6} 
          />
        </mesh>
      )}

      {/* Arms, motors, and propellers */}
      {armPositions.map((pos, i) => {
        const [x, y, z] = pos;
        const armAngle = Math.atan2(z, x);
        
        return (
          <group key={i}>
            {/* Arm */}
            <mesh 
              position={[x / 2, 0, z / 2]} 
              rotation={[0, armAngle, 0]}
              castShadow
            >
              <boxGeometry args={[Math.sqrt(x * x + z * z), 0.015, 0.02]} />
              <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Motor */}
            <mesh position={[x, 0, z]} castShadow>
              <cylinderGeometry args={[0.02, 0.025, 0.04, 16]} />
              <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Motor shaft */}
            <mesh position={[x, 0.03, z]}>
              <cylinderGeometry args={[0.003, 0.003, 0.02, 8]} />
              <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Propeller */}
            <group position={[x, 0.04, z]} rotation={[0, i * 0.5, 0]}>
              {/* Prop blade 1 */}
              <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[0.08 * propScale, 0.002, 0.015 * propScale]} />
                <meshStandardMaterial 
                  color={i % 2 === 0 ? '#ff6b35' : '#004e89'} 
                  metalness={0.3} 
                  roughness={0.6}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              {/* Prop blade 2 */}
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.08 * propScale, 0.002, 0.015 * propScale]} />
                <meshStandardMaterial 
                  color={i % 2 === 0 ? '#ff6b35' : '#004e89'} 
                  metalness={0.3} 
                  roughness={0.6}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              {/* Prop center */}
              <mesh>
                <cylinderGeometry args={[0.01, 0.01, 0.005, 16]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}
