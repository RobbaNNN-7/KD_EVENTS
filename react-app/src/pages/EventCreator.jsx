import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tutorial from '../components/shared/Tutorial';
import './EventCreator.css';

const EventCreator = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [canvasItems, setCanvasItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [draggedObject, setDraggedObject] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [panelOpen, setPanelOpen] = useState('objects');
    const [zoom, setZoom] = useState(1);
    const [gridVisible, setGridVisible] = useState(true);
    const [savedDesigns, setSavedDesigns] = useState([]);
    const [showTutorial, setShowTutorial] = useState(false);

    // Check if user has seen tutorial
    useEffect(() => {
        const tutorialCompleted = localStorage.getItem('eventCreatorTutorialCompleted');
        if (!tutorialCompleted) {
            setShowTutorial(true);
        }
    }, []);

    // Event objects library
    const eventObjects = [
        { id: 'stage', name: 'Stage', icon: '🎭', category: 'structures', color: '#8B4513', defaultSize: { width: 200, height: 150 } },
        { id: 'booth', name: 'Booth', icon: '🏪', category: 'structures', color: '#4CAF50', defaultSize: { width: 100, height: 100 } },
        { id: 'table-round', name: 'Round Table', icon: '⭕', category: 'furniture', color: '#795548', defaultSize: { width: 80, height: 80 } },
        { id: 'table-rect', name: 'Rectangular Table', icon: '⬛', category: 'furniture', color: '#8D6E63', defaultSize: { width: 120, height: 60 } },
        { id: 'seating', name: 'Seating Area', icon: '🪑', category: 'furniture', color: '#607D8B', defaultSize: { width: 150, height: 120 } },
        { id: 'banner', name: 'Banner', icon: '🚩', category: 'decor', color: '#E91E63', defaultSize: { width: 180, height: 60 } },
        { id: 'lights', name: 'Lighting', icon: '💡', category: 'decor', color: '#FFC107', defaultSize: { width: 60, height: 60 } },
        { id: 'plants', name: 'Plants', icon: '🌿', category: 'decor', color: '#4CAF50', defaultSize: { width: 50, height: 80 } },
        { id: 'flowers', name: 'Flower Arrangement', icon: '💐', category: 'decor', color: '#E91E63', defaultSize: { width: 60, height: 60 } },
        { id: 'bar', name: 'Bar Counter', icon: '🍷', category: 'structures', color: '#6D4C41', defaultSize: { width: 140, height: 80 } },
        { id: 'dj-booth', name: 'DJ Booth', icon: '🎧', category: 'structures', color: '#212121', defaultSize: { width: 100, height: 100 } },
        { id: 'screen', name: 'Screen/Display', icon: '📺', category: 'equipment', color: '#424242', defaultSize: { width: 140, height: 100 } },
        { id: 'speaker', name: 'Speaker', icon: '🔊', category: 'equipment', color: '#000000', defaultSize: { width: 50, height: 70 } },
        { id: 'entrance', name: 'Entrance', icon: '🚪', category: 'structures', color: '#9E9E9E', defaultSize: { width: 100, height: 40 } },
        { id: 'dance-floor', name: 'Dance Floor', icon: '🕺', category: 'structures', color: '#FF6F00', defaultSize: { width: 180, height: 180 } },
    ];

    // Categories for filtering
    const categories = [
        { id: 'all', name: 'All Objects', icon: '📦' },
        { id: 'structures', name: 'Structures', icon: '🏗️' },
        { id: 'furniture', name: 'Furniture', icon: '🪑' },
        { id: 'decor', name: 'Decorations', icon: '✨' },
        { id: 'equipment', name: 'Equipment', icon: '🎛️' },
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    // Handle drag start from object library
    const handleDragStart = (e, object) => {
        setDraggedObject(object);
        e.dataTransfer.effectAllowed = 'copy';
    };

    // Handle drop on canvas
    const handleCanvasDrop = (e) => {
        e.preventDefault();
        if (!draggedObject) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;

        const newItem = {
            id: Date.now(),
            type: draggedObject.id,
            name: draggedObject.name,
            icon: draggedObject.icon,
            x: x - (draggedObject.defaultSize.width / 2),
            y: y - (draggedObject.defaultSize.height / 2),
            width: draggedObject.defaultSize.width,
            height: draggedObject.defaultSize.height,
            rotation: 0,
            color: draggedObject.color,
            zIndex: canvasItems.length,
            opacity: 1,
        };

        setCanvasItems([...canvasItems, newItem]);
        setSelectedItem(newItem.id);
        setDraggedObject(null);
    };

    // Handle canvas item drag
    const handleItemMouseDown = (e, item) => {
        e.stopPropagation();
        setSelectedItem(item.id);
        setIsDragging(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const startItemX = item.x;
        const startItemY = item.y;
        let lastUpdateTime = Date.now();
        let pendingUpdate = false;

        const handleMouseMove = (moveEvent) => {
            const now = Date.now();
            const deltaX = (moveEvent.clientX - startX) / zoom;
            const deltaY = (moveEvent.clientY - startY) / zoom;

            const newX = startItemX + deltaX;
            const newY = startItemY + deltaY;

            // Throttle updates to 60fps max
            if (!pendingUpdate && now - lastUpdateTime > 16) {
                lastUpdateTime = now;
                setCanvasItems(items =>
                    items.map(i =>
                        i.id === item.id
                            ? { ...i, x: newX, y: newY }
                            : i
                    )
                );
            } else if (!pendingUpdate) {
                pendingUpdate = true;
                requestAnimationFrame(() => {
                    setCanvasItems(items =>
                        items.map(i =>
                            i.id === item.id
                                ? { ...i, x: newX, y: newY }
                                : i
                        )
                    );
                    pendingUpdate = false;
                    lastUpdateTime = Date.now();
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Update selected item property
    const updateSelectedItem = (property, value) => {
        setCanvasItems(items =>
            items.map(item =>
                item.id === selectedItem ? { ...item, [property]: value } : item
            )
        );
    };

    // Delete selected item
    const deleteSelectedItem = () => {
        setCanvasItems(items => items.filter(item => item.id !== selectedItem));
        setSelectedItem(null);
    };

    // Change layer order
    const changeLayer = (direction) => {
        const item = canvasItems.find(i => i.id === selectedItem);
        if (!item) return;

        const newZIndex = direction === 'forward'
            ? Math.min(item.zIndex + 1, canvasItems.length - 1)
            : Math.max(item.zIndex - 1, 0);

        setCanvasItems(items =>
            items.map(i => {
                if (i.id === selectedItem) return { ...i, zIndex: newZIndex };
                if (direction === 'forward' && i.zIndex === newZIndex && i.id !== selectedItem) {
                    return { ...i, zIndex: i.zIndex - 1 };
                }
                if (direction === 'back' && i.zIndex === newZIndex && i.id !== selectedItem) {
                    return { ...i, zIndex: i.zIndex + 1 };
                }
                return i;
            })
        );
    };

    // Save design
    const saveDesign = () => {
        const designName = prompt('Enter a name for this design:');
        if (!designName) return;

        const design = {
            id: Date.now(),
            name: designName,
            items: canvasItems,
            timestamp: new Date().toISOString(),
        };

        setSavedDesigns([...savedDesigns, design]);
        alert('Design saved successfully!');
    };

    // Load design
    const loadDesign = (design) => {
        setCanvasItems(design.items);
        setSelectedItem(null);
    };

    // Clear canvas
    const clearCanvas = () => {
        if (confirm('Are you sure you want to clear the entire canvas?')) {
            setCanvasItems([]);
            setSelectedItem(null);
        }
    };

    // Export as image
    const exportCanvas = () => {
        alert('Export functionality would generate a PNG/PDF of your event layout!');
    };

    const selectedItemData = canvasItems.find(item => item.id === selectedItem);
    const filteredObjects = activeCategory === 'all'
        ? eventObjects
        : eventObjects.filter(obj => obj.category === activeCategory);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' && selectedItem) {
                deleteSelectedItem();
            }
            if (e.key === 'Escape') {
                setSelectedItem(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);

    return (
        <div className="event-creator">
            {/* Header */}
            <header className="creator-header">
                <div className="header-left">
                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                        aria-label="Go back to home"
                    >
                        <i className="fas fa-arrow-left"></i>
                        <span>Back to Home</span>
                    </button>
                    <h1>Event Design Canvas</h1>
                </div>
                <div className="header-actions">
                    <button 
                        onClick={() => setShowTutorial(true)} 
                        className="btn-help" 
                        aria-label="Show tutorial"
                        title="View tutorial"
                    >
                        <i className="fas fa-question-circle"></i>
                    </button>
                    <button onClick={saveDesign} className="btn-save" aria-label="Save design">
                        <i className="fas fa-save"></i> Save
                    </button>
                    <button onClick={exportCanvas} className="btn-export" aria-label="Export design">
                        <i className="fas fa-download"></i> Export
                    </button>
                    <button onClick={clearCanvas} className="btn-clear" aria-label="Clear canvas">
                        <i className="fas fa-trash"></i> Clear
                    </button>
                </div>
            </header>

            <div className="creator-main">
                {/* Left Sidebar - Object Library */}
                <aside className="sidebar sidebar-left">
                    <div className="sidebar-tabs">
                        <button
                            className={`tab ${panelOpen === 'objects' ? 'active' : ''}`}
                            onClick={() => setPanelOpen('objects')}
                            aria-label="Objects panel"
                        >
                            <i className="fas fa-shapes"></i>
                            <span>Objects</span>
                        </button>
                        <button
                            className={`tab ${panelOpen === 'designs' ? 'active' : ''}`}
                            onClick={() => setPanelOpen('designs')}
                            aria-label="Saved designs panel"
                        >
                            <i className="fas fa-folder-open"></i>
                            <span>Saved</span>
                        </button>
                    </div>

                    {panelOpen === 'objects' && (
                        <div className="objects-panel">
                            <div className="category-filters">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat.id)}
                                        aria-label={`Filter by ${cat.name}`}
                                    >
                                        <span className="cat-icon">{cat.icon}</span>
                                        <span className="cat-name">{cat.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="objects-grid">
                                {filteredObjects.map(obj => (
                                    <div
                                        key={obj.id}
                                        className="object-card"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, obj)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Drag ${obj.name} to canvas`}
                                    >
                                        <div className="object-icon">{obj.icon}</div>
                                        <div className="object-name">{obj.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {panelOpen === 'designs' && (
                        <div className="designs-panel">
                            <h3>Saved Designs</h3>
                            {savedDesigns.length === 0 ? (
                                <p className="empty-state">No saved designs yet</p>
                            ) : (
                                <div className="designs-list">
                                    {savedDesigns.map(design => (
                                        <div key={design.id} className="design-card">
                                            <div className="design-info">
                                                <h4>{design.name}</h4>
                                                <p>{new Date(design.timestamp).toLocaleDateString()}</p>
                                            </div>
                                            <button
                                                onClick={() => loadDesign(design)}
                                                className="btn-load"
                                                aria-label={`Load ${design.name}`}
                                            >
                                                Load
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </aside>

                {/* Canvas Area */}
                <main className="canvas-container">
                    <div className="canvas-toolbar">
                        <div className="toolbar-group">
                            <button
                                onClick={() => setGridVisible(!gridVisible)}
                                className={`tool-btn ${gridVisible ? 'active' : ''}`}
                                aria-label="Toggle grid"
                            >
                                <i className="fas fa-th"></i>
                            </button>
                            <button
                                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                                className="tool-btn"
                                aria-label="Zoom out"
                            >
                                <i className="fas fa-search-minus"></i>
                            </button>
                            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                            <button
                                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                                className="tool-btn"
                                aria-label="Zoom in"
                            >
                                <i className="fas fa-search-plus"></i>
                            </button>
                            <button
                                onClick={() => setZoom(1)}
                                className="tool-btn"
                                aria-label="Reset zoom"
                            >
                                <i className="fas fa-compress"></i>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={canvasRef}
                        className={`canvas ${gridVisible ? 'grid-visible' : ''}`}
                        style={{ transform: `scale(${zoom})` }}
                        onDrop={handleCanvasDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => setSelectedItem(null)}
                    >
                        {canvasItems
                            .sort((a, b) => a.zIndex - b.zIndex)
                            .map(item => (
                                <div
                                    key={item.id}
                                    className={`canvas-item ${selectedItem === item.id ? 'selected' : ''}`}
                                    style={{
                                        left: `${item.x}px`,
                                        top: `${item.y}px`,
                                        width: `${item.width}px`,
                                        height: `${item.height}px`,
                                        backgroundColor: item.color,
                                        transform: `rotate(${item.rotation}deg)`,
                                        opacity: item.opacity,
                                        zIndex: item.zIndex,
                                    }}
                                    onMouseDown={(e) => handleItemMouseDown(e, item)}
                                    onClick={(e) => e.stopPropagation()}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${item.name} object`}
                                >
                                    <div className="item-icon">{item.icon}</div>
                                    <div className="item-label">{item.name}</div>
                                </div>
                            ))}

                        {canvasItems.length === 0 && (
                            <div className="canvas-placeholder">
                                <i className="fas fa-hand-pointer"></i>
                                <p>Drag objects from the left panel to start designing your event</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar - Properties */}
                <aside className="sidebar sidebar-right">
                    <h3>Properties</h3>

                    {selectedItemData ? (
                        <div className="properties-panel">
                            <div className="property-group">
                                <label>Object Type</label>
                                <div className="property-display">
                                    <span className="display-icon">{selectedItemData.icon}</span>
                                    <span>{selectedItemData.name}</span>
                                </div>
                            </div>

                            <div className="property-group">
                                <label htmlFor="item-width">Width: {Math.round(selectedItemData.width)}px</label>
                                <input
                                    id="item-width"
                                    type="range"
                                    min="30"
                                    max="400"
                                    value={selectedItemData.width}
                                    onChange={(e) => updateSelectedItem('width', parseInt(e.target.value))}
                                    aria-label="Adjust width"
                                />
                            </div>

                            <div className="property-group">
                                <label htmlFor="item-height">Height: {Math.round(selectedItemData.height)}px</label>
                                <input
                                    id="item-height"
                                    type="range"
                                    min="30"
                                    max="400"
                                    value={selectedItemData.height}
                                    onChange={(e) => updateSelectedItem('height', parseInt(e.target.value))}
                                    aria-label="Adjust height"
                                />
                            </div>

                            <div className="property-group">
                                <label htmlFor="item-rotation">Rotation: {Math.round(selectedItemData.rotation)}°</label>
                                <input
                                    id="item-rotation"
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={selectedItemData.rotation}
                                    onChange={(e) => updateSelectedItem('rotation', parseInt(e.target.value))}
                                    aria-label="Adjust rotation"
                                />
                            </div>

                            <div className="property-group">
                                <label htmlFor="item-opacity">Opacity: {Math.round(selectedItemData.opacity * 100)}%</label>
                                <input
                                    id="item-opacity"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={selectedItemData.opacity}
                                    onChange={(e) => updateSelectedItem('opacity', parseFloat(e.target.value))}
                                    aria-label="Adjust opacity"
                                />
                            </div>

                            <div className="property-group">
                                <label htmlFor="item-color">Color</label>
                                <input
                                    id="item-color"
                                    type="color"
                                    value={selectedItemData.color}
                                    onChange={(e) => updateSelectedItem('color', e.target.value)}
                                    aria-label="Change color"
                                />
                            </div>

                            <div className="property-group">
                                <label>Layer Order</label>
                                <div className="layer-controls">
                                    <button
                                        onClick={() => changeLayer('forward')}
                                        className="layer-btn"
                                        aria-label="Bring forward"
                                    >
                                        <i className="fas fa-arrow-up"></i> Forward
                                    </button>
                                    <button
                                        onClick={() => changeLayer('back')}
                                        className="layer-btn"
                                        aria-label="Send backward"
                                    >
                                        <i className="fas fa-arrow-down"></i> Backward
                                    </button>
                                </div>
                            </div>

                            <div className="property-group">
                                <button
                                    onClick={deleteSelectedItem}
                                    className="btn-delete"
                                    aria-label="Delete object"
                                >
                                    <i className="fas fa-trash"></i> Delete Object
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <i className="fas fa-mouse-pointer"></i>
                            <p>Select an object on the canvas to edit its properties</p>
                        </div>
                    )}
                </aside>
            </div>

            {/* Tutorial Overlay */}
            {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
        </div>
    );
};

export default EventCreator;
