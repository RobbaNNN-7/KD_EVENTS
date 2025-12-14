import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tutorial from '../components/shared/Tutorial';
import Header from '../components/layout/Header';
import Event3DView from '../components/shared/Event3DView';
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
    const [ambience, setAmbience] = useState('day'); // 'day' | 'night'
    const [show3DView, setShow3DView] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Check if user has seen tutorial
    useEffect(() => {
        const tutorialCompleted = localStorage.getItem('eventCreatorTutorialCompleted');
        if (!tutorialCompleted) {
            setShowTutorial(true);
        }
    }, []);

    // Event objects library
    const eventObjects = [
        // Structures
        { id: 'stage', name: 'Stage', icon: '🎭', category: 'structures', color: '#8B4513', defaultSize: { width: 200, height: 150 } },
        { id: 'booth', name: 'Standard Booth', icon: '🏪', category: 'structures', color: '#4CAF50', defaultSize: { width: 100, height: 100 } },
        { id: 'entrance', name: 'Grand Entrance', icon: '🚪', category: 'structures', color: '#9E9E9E', defaultSize: { width: 120, height: 60 } },
        { id: 'dance-floor', name: 'Dance Floor', icon: '🕺', category: 'structures', color: '#FF6F00', defaultSize: { width: 180, height: 180 } },
        { id: 'bar', name: 'Bar Counter', icon: '🍷', category: 'structures', color: '#6D4C41', defaultSize: { width: 140, height: 80 } },

        // Wedding
        { id: 'mandap', name: 'Wedding Mandap', icon: '🛕', category: 'wedding', color: '#E91E63', defaultSize: { width: 200, height: 200 } },
        { id: 'floral-arch', name: 'Floral Arch', icon: '🌸', category: 'wedding', color: '#F48FB1', defaultSize: { width: 120, height: 40 } },
        { id: 'aisle', name: 'Aisle Runner', icon: '🛣️', category: 'wedding', color: '#FFCDD2', defaultSize: { width: 60, height: 300 } },
        { id: 'wedding-stage', name: 'Bride/Groom Stage', icon: '💒', category: 'wedding', color: '#FCE4EC', defaultSize: { width: 250, height: 120 } },

        // Concert
        { id: 'line-array', name: 'Line Array Speaker', icon: '🔊', category: 'concert', color: '#212121', defaultSize: { width: 60, height: 120 } },
        { id: 'truss', name: 'Lighting Truss', icon: '🏗️', category: 'concert', color: '#9E9E9E', defaultSize: { width: 300, height: 40 } },
        { id: 'spotlight', name: 'Spotlight', icon: '🔦', category: 'concert', color: '#FFD600', defaultSize: { width: 40, height: 40 } },
        { id: 'barrier', name: 'Crowd Barrier', icon: '🚧', category: 'concert', color: '#607D8B', defaultSize: { width: 100, height: 20 } },

        // Qawali/Traditional
        { id: 'floor-seating', name: 'Floor Gadda', icon: '🛋️', category: 'qawali', color: '#FF5722', defaultSize: { width: 100, height: 100 } },
        { id: 'bolster', name: 'Bolster (Gao Takia)', icon: '🌭', category: 'qawali', color: '#FFAB91', defaultSize: { width: 40, height: 20 } },
        { id: 'low-table', name: 'Low Wooden Table', icon: '🟫', category: 'qawali', color: '#795548', defaultSize: { width: 80, height: 80 } },
        { id: 'lantern', name: 'Decorative Lantern', icon: '🏮', category: 'qawali', color: '#FFC107', defaultSize: { width: 30, height: 50 } },

        // Destination
        { id: 'cabana', name: 'Beach Cabana', icon: '⛺', category: 'destination', color: '#FFF9C4', defaultSize: { width: 150, height: 150 } },
        { id: 'torch', name: 'Tiki Torch', icon: '🔥', category: 'destination', color: '#FF6E40', defaultSize: { width: 30, height: 30 } },
        { id: 'sunshade', name: 'Sunshade', icon: '☂️', category: 'destination', color: '#03A9F4', defaultSize: { width: 80, height: 80 } },

        // Furniture & Equipment
        { id: 'table-round', name: 'Round Table', icon: '⭕', category: 'furniture', color: '#795548', defaultSize: { width: 80, height: 80 } },
        { id: 'table-rect', name: 'Rectangular Table', icon: '⬛', category: 'furniture', color: '#8D6E63', defaultSize: { width: 120, height: 60 } },
        { id: 'chair', name: 'Chair', icon: '🪑', category: 'furniture', color: '#607D8B', defaultSize: { width: 40, height: 40 } },
        { id: 'sofa', name: 'Lounge Sofa', icon: '🛋️', category: 'furniture', color: '#3F51B5', defaultSize: { width: 120, height: 60 } },
        { id: 'banner', name: 'Banner/Standee', icon: '🚩', category: 'decor', color: '#E91E63', defaultSize: { width: 80, height: 160 } },
        { id: 'plants', name: 'Potted Plant', icon: '🌿', category: 'decor', color: '#4CAF50', defaultSize: { width: 40, height: 40 } },
        { id: 'screen', name: 'LED Screen', icon: '📺', category: 'equipment', color: '#212121', defaultSize: { width: 200, height: 120 } },
        { id: 'dj-booth', name: 'DJ Console', icon: '🎧', category: 'equipment', color: '#333333', defaultSize: { width: 100, height: 60 } },
    ];

    // Categories for filtering
    const categories = [
        { id: 'all', name: 'All', icon: '📦' },
        { id: 'wedding', name: 'Wedding', icon: '💍' },
        { id: 'concert', name: 'Concert', icon: '🎸' },
        { id: 'qawali', name: 'Qawali', icon: '🎼' },
        { id: 'destination', name: 'Dest.', icon: '🏖️' },
        { id: 'structures', name: 'Struct.', icon: '🏗️' },
        { id: 'furniture', name: 'Furniture', icon: '🪑' },
        { id: 'decor', name: 'Decor', icon: '✨' },
        { id: 'equipment', name: 'Equip.', icon: '🎛️' },
    ];

    // Pre-built templates
    const templates = [
        {
            id: 'wedding-royal',
            name: 'Royal Wedding',
            icon: '👑',
            items: [
                { id: 1, type: 'mandap', name: 'Wedding Mandap', icon: '🛕', x: 300, y: 100, width: 250, height: 250, rotation: 0, color: '#E91E63', zIndex: 1, opacity: 1 },
                { id: 2, type: 'aisle', name: 'Aisle Runner', icon: '🛣️', x: 400, y: 360, width: 60, height: 300, rotation: 0, color: '#FFCDD2', zIndex: 0, opacity: 1 },
                { id: 3, type: 'chair', name: 'Chair', icon: '🪑', x: 250, y: 400, width: 40, height: 40, rotation: 0, color: '#607D8B', zIndex: 1, opacity: 1 },
                { id: 4, type: 'chair', name: 'Chair', icon: '🪑', x: 550, y: 400, width: 40, height: 40, rotation: 0, color: '#607D8B', zIndex: 1, opacity: 1 },
            ]
        },
        {
            id: 'concert-rock',
            name: 'Rock Concert',
            icon: '🎸',
            items: [
                { id: 1, type: 'stage', name: 'Stage', icon: '🎭', x: 200, y: 50, width: 400, height: 200, rotation: 0, color: '#212121', zIndex: 0, opacity: 1 },
                { id: 2, type: 'screen', name: 'LED Screen', icon: '📺', x: 250, y: 20, width: 300, height: 150, rotation: 0, color: '#000', zIndex: 1, opacity: 1 },
                { id: 3, type: 'barrier', name: 'Crowd Barrier', icon: '🚧', x: 180, y: 260, width: 440, height: 20, rotation: 0, color: '#607D8B', zIndex: 1, opacity: 1 },
            ]
        },
        {
            id: 'qawali-night',
            name: 'Sufi Qawali',
            icon: '🌙',
            items: [
                { id: 1, type: 'floor-seating', name: 'Floor Gadda', icon: '🛋️', x: 100, y: 100, width: 600, height: 400, rotation: 0, color: '#FF5722', zIndex: 0, opacity: 0.8 },
                { id: 2, type: 'low-table', name: 'Low Wooden Table', icon: '🟫', x: 350, y: 250, width: 100, height: 100, rotation: 0, color: '#795548', zIndex: 1, opacity: 1 },
            ]
        }
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

        // Trigger confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
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

        const handleMouseMove = (moveEvent) => {
            const deltaX = (moveEvent.clientX - startX) / zoom;
            const deltaY = (moveEvent.clientY - startY) / zoom;

            setCanvasItems(items =>
                items.map(i =>
                    i.id === item.id
                        ? { ...i, x: startItemX + deltaX, y: startItemY + deltaY }
                        : i
                )
            );
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

    // Load Template
    const loadTemplate = (template) => {
        if (canvasItems.length > 0 && !confirm('Loading a template will clear your current design. Continue?')) {
            return;
        }

        // Generate unique IDs for template items to avoid conflict
        const newItems = template.items.map((item, index) => ({
            ...item,
            id: Date.now() + index
        }));

        setCanvasItems(newItems);
        setSelectedItem(null);
        // Optional: Set specific ambience for template if added to template data
        if (template.id.includes('night') || template.id.includes('concert')) {
            setAmbience('night');
        } else {
            setAmbience('day');
        }
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
            <Header />
            {/* Toolbar / Secondary Header */}
            <div className="creator-header">
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
            </div>

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
                            className={`tab ${panelOpen === 'templates' ? 'active' : ''}`}
                            onClick={() => setPanelOpen('templates')}
                            aria-label="Templates panel"
                        >
                            <i className="fas fa-magic"></i>
                            <span>Templates</span>
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

                    {panelOpen === 'templates' && (
                        <div className="designs-panel">
                            <h3>Quick Start Templates</h3>
                            <div className="designs-list">
                                {templates.map(tmpl => (
                                    <div key={tmpl.id} className="design-card">
                                        <div className="design-info">
                                            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{tmpl.icon}</span>
                                            <h4>{tmpl.name}</h4>
                                        </div>
                                        <button
                                            onClick={() => loadTemplate(tmpl)}
                                            className="btn-load"
                                            aria-label={`Use ${tmpl.name} template`}
                                        >
                                            Use
                                        </button>
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
                                onClick={() => setAmbience(prev => prev === 'day' ? 'night' : 'day')}
                                className={`tool-btn ${ambience === 'night' ? 'active' : ''}`}
                                aria-label="Toggle Day/Night mode"
                                title="Toggle Ambience"
                            >
                                <i className={`fas ${ambience === 'day' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                            <button
                                onClick={() => setShow3DView(true)}
                                className="tool-btn"
                                aria-label="Enter 3D Holodeck"
                                title="Enter 3D Holodeck"
                                style={{ color: '#E91E63' }}
                            >
                                <i className="fas fa-cube"></i>
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
                        className={`canvas ${gridVisible ? 'grid-visible' : ''} ${ambience}`}
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

            {/* 3D Holodeck Overlay */}
            {show3DView && (
                <Event3DView
                    items={canvasItems}
                    ambience={ambience}
                    onClose={() => setShow3DView(false)}
                />
            )}
        </div>
    );
};

export default EventCreator;
