import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    TransformControls,
    Stage,
    Stars,
    Cloud,
    Environment,
    Html,
    MeshReflectorMaterial,
    Sparkles,
    useCursor
} from '@react-three/drei';
import * as THREE from 'three';

// 3D version of a 2D item
const EventItem3D = ({ item, isSelected, onSelect, onUpdate }) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    useCursor(hovered);

    // Geometry selection based on type
    const getGeometry = () => {
        if (item.type.includes('table-round') || item.type.includes('plant')) {
            return <cylinderGeometry args={[item.width / 100, item.width / 100, 0.4, 32]} />;
        }
        return <boxGeometry args={[item.width / 50, 0.4, item.height / 50]} />;
    };

    return (
        <group>
            <mesh
                ref={meshRef}
                position={[
                    (item.x - 400) / 50,
                    item.height / 400,
                    (item.y - 300) / 50
                ]}
                rotation={[0, -item.rotation * (Math.PI / 180), 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.id);
                }}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                castShadow
                receiveShadow
            >
                {getGeometry()}
                <meshStandardMaterial
                    color={item.color}
                    roughness={0.2}
                    metalness={0.5}
                    emissive={isSelected ? item.color : (item.type.includes('screen') ? item.color : '#000000')}
                    emissiveIntensity={isSelected ? 0.8 : 0.2}
                />

                {/* Floating Label */}
                {(hovered || isSelected) && (
                    <Html position={[0, 1, 0]} center distanceFactor={10}>
                        <div style={{
                            background: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                            backdropFilter: 'blur(4px)',
                            border: `1px solid ${item.color}`,
                            pointerEvents: 'none'
                        }}>
                            {item.name}
                        </div>
                    </Html>
                )}
            </mesh>

            {/* Transform Controls for Interaction */}
            {isSelected && (
                <TransformControls
                    object={meshRef}
                    mode="translate"
                    onObjectChange={(e) => {
                        if (meshRef.current) {
                            const newX = (meshRef.current.position.x * 50) + 400;
                            const newY = (meshRef.current.position.z * 50) + 300;
                            onUpdate(item.id, { x: newX, y: newY });
                        }
                    }}
                />
            )}
        </group>
    );
};

const ReflectiveFloor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={0.1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
            />
        </mesh>
    );
};

const Event3DView = ({ items, ambience, onClose, onUpdateItem, onSelectItem, selectedId }) => {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'black' }}>
            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 2001, color: 'white', pointerEvents: 'none' }}>
                <h2 style={{ margin: 0, textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>The Holodeck</h2>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Interactive 3D Preview</p>
            </div>

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
                    fontWeight: 'bold',
                    boxShadow: '0 0 20px rgba(255,255,255,0.2)'
                }}
            >
                ✕
            </button>

            <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }} dpr={[1, 2]}>
                {ambience === 'night' ? (
                    <>
                        <color attach="background" args={['#050510']} />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        <fog attach="fog" args={['#050510', 5, 40]} />
                        <ambientLight intensity={0.2} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
                        <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={2} castShadow color="#4d4dff" />
                        <Sparkles count={100} scale={20} size={4} speed={0.4} opacity={0.5} color="#4d4dff" />
                    </>
                ) : (
                    <>
                        <color attach="background" args={['#87CEEB']} />
                        <Environment preset="sunset" />
                        <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 10, -10]} />
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
                        <Sparkles count={50} scale={20} size={6} speed={0.4} opacity={0.3} color="#ffaa00" />
                    </>
                )}

                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />

                <group position={[0, 0, 0]} onPointerMissed={() => onSelectItem(null)}>
                    <ReflectiveFloor />
                    {items.map(item => (
                        <EventItem3D
                            key={item.id}
                            item={item}
                            isSelected={selectedId === item.id}
                            onSelect={onSelectItem}
                            onUpdate={onUpdateItem}
                        />
                    ))}
                </group>

                {/* Visual Flair */}
                {items.length > 0 && <Stage intensity={0.2} environment={null} adjustCamera={false} shadowBias={-0.001} />}
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                background: 'rgba(0,0,0,0.6)',
                padding: '12px 24px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                pointerEvents: 'none',
                fontFamily: 'Poppins, sans-serif',
                display: 'flex',
                gap: '20px',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <span><i className="fas fa-mouse-pointer"></i> Select to Edit</span>
                <span><i className="fas fa-arrows-alt"></i> Drag to Move</span>
                <span><i className="fas fa-video"></i> Rotate Camera</span>
            </div>
        </div>
    );
};

export default Event3DView;
