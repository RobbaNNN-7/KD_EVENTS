import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls,
    TransformControls,
    Stage,
    Cloud,
    Environment,
    Html,
    MeshReflectorMaterial,
    Sparkles,
    useCursor,
    ContactShadows,
    Text
} from '@react-three/drei';

// 3D version of a 2D item with proper position tracking
const EventItem3D = ({ item, isSelected, onSelect, onUpdate, movementPlane }) => {
    const meshRef = useRef();
    const transformRef = useRef();
    const [hovered, setHover] = useState(false);

    // Track 3D position locally to prevent reset during drag
    const initialElevation = item.elevation3D !== undefined ? item.elevation3D : item.height / 400;
    const [localPosition, setLocalPosition] = useState([
        ((item.x + item.width / 2) - 400) / 50, // Convert Top-Left to Center X
        initialElevation,
        ((item.y + item.height / 2) - 300) / 50 // Convert Top-Left to Center Y (mapped to Z)
    ]);

    useCursor(hovered);

    // Geometry selection based on type
    const getGeometry = () => {
        if (item.type.includes('table-round') || item.type.includes('plant')) {
            return <cylinderGeometry args={[item.width / 100, item.width / 100, 0.4, 32]} />;
        }
        return <boxGeometry args={[item.width / 50, 0.4, item.height / 50]} />;
    };

    // Determine which axes to show based on movement plane
    const getAxisVisibility = () => {
        switch (movementPlane) {
            case 'floor': // XZ plane (horizontal movement on floor)
                return { showX: true, showY: false, showZ: true };
            case 'vertical': // XY plane (vertical movement)
                return { showX: true, showY: true, showZ: false };
            default:
                return { showX: true, showY: false, showZ: true };
        }
    };

    const axisVisibility = getAxisVisibility();

    return (
        <group>
            <mesh
                ref={meshRef}
                position={localPosition}
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
                    metalness={0.6}
                    emissive={item.color}
                    emissiveIntensity={isSelected ? 0.8 : (hovered ? 0.4 : 0.1)}
                    envMapIntensity={1.5}
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

            {isSelected && (
                <TransformControls
                    ref={transformRef}
                    object={meshRef}
                    mode="translate"
                    showX={axisVisibility.showX}
                    showY={axisVisibility.showY}
                    showZ={axisVisibility.showZ}
                    onMouseUp={() => {
                        if (meshRef.current) {
                            const pos = meshRef.current.position;

                            // Convert 3D Center X back to 2D Top-Left X
                            const newX = (pos.x * 50) + 400 - (item.width / 2);

                            // Convert 3D Center Z back to 2D Top-Left Y
                            const newY = (pos.z * 50) + 300 - (item.height / 2);

                            const newElevation = pos.y;

                            // Update local position state to keep it in sync
                            setLocalPosition([pos.x, pos.y, pos.z]);

                            onUpdate(item.id, {
                                x: newX,
                                y: newY,
                                elevation3D: newElevation
                            });
                        }
                    }}
                />
            )}
        </group >
    );
};

const OrientationGuides = () => {
    return (
        <group position={[0, 0.05, 0]}>
            <Text
                position={[0, 0, -6.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.8}
                color="rgba(255,255,255,0.5)"
            >
                TOP (BACK)
            </Text>
            <Text
                position={[0, 0, 6.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.8}
                color="rgba(255,255,255,0.5)"
            >
                BOTTOM (FRONT)
            </Text>
            <Text
                position={[-8.5, 0, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                fontSize={0.8}
                color="rgba(255,255,255,0.5)"
            >
                LEFT
            </Text>
            <Text
                position={[8.5, 0, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                fontSize={0.8}
                color="rgba(255,255,255,0.5)"
            >
                RIGHT
            </Text>
            {/* Canvas Border Outline (16x12 matches 800x600 pixel canvas scaled by 50) */}
            {/* Thick White Border */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[16, 12]} />
                <meshBasicMaterial color="#ffffff" wireframe linewidth={3} />
            </mesh>
            {/* Semi-transparent fill to highlight the active area */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[16, 12]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
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
    // Movement plane: 'floor' (XZ) or 'vertical' (XY)
    const [movementPlane, setMovementPlane] = useState('floor');

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'black' }}>
            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 2001, color: 'white', pointerEvents: 'none' }}>
                <h2 style={{ margin: 0, textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>The Holodeck</h2>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Interactive 3D Preview</p>
            </div>

            {/* Movement Plane Toggle */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2001,
                display: 'flex',
                gap: '8px',
                background: 'rgba(0,0,0,0.6)',
                padding: '8px 16px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button
                    onClick={() => setMovementPlane('floor')}
                    style={{
                        background: movementPlane === 'floor' ? '#667eea' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <i className="fas fa-arrows-alt-h"></i>
                    Floor (XZ)
                </button>
                <button
                    onClick={() => setMovementPlane('vertical')}
                    style={{
                        background: movementPlane === 'vertical' ? '#667eea' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <i className="fas fa-arrows-alt-v"></i>
                    Vertical (XY)
                </button>
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

            {/* Adjusted Camera for better initial view */}
            <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }} dpr={[1, 2]}>
                <color attach="background" args={['#87CEEB']} />
                <Environment preset="sunset" />
                <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 10, -10]} />

                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
                <Sparkles count={50} scale={20} size={6} speed={0.4} opacity={0.3} color="#ffaa00" />

                {/* Visual Flair - ContactShadows enabled for realism */}
                <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />

                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />

                <group position={[0, 0, 0]} onPointerMissed={() => onSelectItem(null)}>
                    <ReflectiveFloor />
                    <gridHelper args={[16, 16, 0xff0000, 0x222222]} position={[0, 0.02, 0]} />
                    <OrientationGuides />
                    {items.map(item => (
                        <EventItem3D
                            key={item.id}
                            item={item}
                            isSelected={selectedId === item.id}
                            onSelect={onSelectItem}
                            onUpdate={onUpdateItem}
                            movementPlane={movementPlane}
                        />
                    ))}
                </group>

                {items.length > 0 && <Stage intensity={0.2} environment={null} adjustCamera={false} shadowBias={-0.001} />}
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                background: 'rgba(0,0,0,0.8)',
                padding: '16px 24px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: '30px',
                pointerEvents: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.8rem' }}>LMB</div>
                    <span>Select / Rotate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.8rem' }}>RMB</div>
                    <span>Pan Camera</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.8rem' }}>Scroll</div>
                    <span>Zoom</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.8rem' }}>Drag</div>
                    <span>Move Object</span>
                </div>
            </div>
        </div>
    );
};

export default Event3DView;
