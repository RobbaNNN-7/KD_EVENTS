import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Stars, Cloud, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D version of a 2D item
const EventItem3D = ({ item }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle hovering animation for selected items or just life
            meshRef.current.position.y = (item.height / 200) + Math.sin(state.clock.elapsedTime + item.id) * 0.1;
        }
    });

    // Determine geometry based on type (simplified for now)
    let Geometry = <boxGeometry args={[item.width / 50, item.height / 200, item.height / 50]} />;
    if (item.type.includes('table')) {
        Geometry = <cylinderGeometry args={[item.width / 100, item.width / 100, item.height / 200, 32]} />;
    } else if (item.type.includes('chair')) {
        Geometry = <boxGeometry args={[0.5, 0.8, 0.5]} />;
    } else if (item.type.includes('stage')) {
        Geometry = <boxGeometry args={[item.width / 50, 0.5, item.height / 50]} />;
    }

    return (
        <mesh
            ref={meshRef}
            position={[
                (item.x - 400) / 50, // Center and scale down
                item.height / 400,   // Base height off ground
                (item.y - 300) / 50  // Center and scale down
            ]}
            rotation={[0, -item.rotation * (Math.PI / 180), 0]} // Negative rotation for consistency
            castShadow
            receiveShadow
        >
            {/* Convert 2D shape to 3D primitive */}
            {item.type.includes('table-round') || item.type.includes('plant') ? (
                <cylinderGeometry args={[item.width / 100, item.width / 100, 0.4, 32]} />
            ) : (
                <boxGeometry args={[item.width / 50, 0.4, item.height / 50]} />
            )}

            <meshStandardMaterial
                color={item.color}
                roughness={0.3}
                metalness={0.2}
                emissive={item.type.includes('screen') ? item.color : '#000000'}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
};

const Floor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#222" roughness={0.8} metalness={0.2} />
            <gridHelper args={[100, 100, 0x444444, 0x222222]} rotation={[-Math.PI / 2, 0, 0]} />
        </mesh>
    );
};

const Event3DView = ({ items, ambience, onClose }) => {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'black' }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 2001,
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}
            >
                ✕
            </button>

            <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
                {ambience === 'night' ? (
                    <>
                        <color attach="background" args={['#050510']} />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        <fog attach="fog" args={['#050510', 5, 30]} />
                        <ambientLight intensity={0.2} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
                        <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
                    </>
                ) : (
                    <>
                        <color attach="background" args={['#87CEEB']} />
                        <Environment preset="sunset" />
                        <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 10, -10]} />
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
                    </>
                )}

                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.2} />

                <group position={[0, 0, 0]}>
                    <Floor />
                    {items.map(item => (
                        <EventItem3D key={item.id} item={item} />
                    ))}
                </group>

                {/* Visual Flair */}
                {items.length > 0 && <Stage intensity={0.5} environment={null} adjustCamera={false} />}
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px 20px',
                borderRadius: '30px',
                backdropFilter: 'blur(5px)',
                pointerEvents: 'none',
                fontFamily: 'Poppins, sans-serif'
            }}>
                <i className="fas fa-mouse"></i> Drag to Rotate • Scroll to Zoom
            </div>
        </div>
    );
};

export default Event3DView;
