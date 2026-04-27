import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import DroneModel from './DroneModel';
import { useDesignStore } from '../../features/designer/DesignStore';

export default function DronePreviewCanvas() {
  const { design } = useDesignStore();

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2">
        <p className="text-sm font-medium">3D Preview</p>
        <p className="text-xs text-muted-foreground">Drag to rotate • Scroll to zoom</p>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />
        <pointLight position={[0, 3, 0]} intensity={0.3} />
        
        {/* Drone Model */}
        <DroneModel design={design} />
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a1a" opacity={0.3} transparent />
        </mesh>
      </Canvas>
    </div>
  );
}
