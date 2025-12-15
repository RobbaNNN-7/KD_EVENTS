import { useState, useRef, useEffect, useCallback } from 'react';
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

    // Keep ref of items for event listeners
    const itemsRef = useRef(canvasItems);
    useEffect(() => {
        itemsRef.current = canvasItems;
    }, [canvasItems]);

    // HCI Enhancement: Undo/Redo History
    const [history, setHistory] = useState([[]]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const maxHistoryLength = 50;

    // HCI Enhancement: Toast Notifications
    const [toast, setToast] = useState(null);

    // HCI Enhancement: Keyboard Shortcuts Panel
    const [showShortcuts, setShowShortcuts] = useState(false);

    // HCI Enhancement: Accessibility Announcements (for screen readers)
    const [announcement, setAnnouncement] = useState('');

    // Show toast notification
    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Announce for screen readers
    const announce = useCallback((message) => {
        setAnnouncement(message);
        setTimeout(() => setAnnouncement(''), 1000);
    }, []);

    // Add to history (for undo/redo)
    const addToHistory = useCallback((newItems) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push([...newItems]);
        if (newHistory.length > maxHistoryLength) {
            newHistory.shift();
        }
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    // Undo action
    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCanvasItems([...history[newIndex]]);
            showToast('Undo successful', 'info');
            announce('Action undone');
        }
    }, [historyIndex, history, showToast, announce]);

    // Redo action
    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCanvasItems([...history[newIndex]]);
            showToast('Redo successful', 'info');
            announce('Action redone');
        }
    }, [historyIndex, history, showToast, announce]);

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

    // Helper function to add an item to the canvas
    const addItemToCanvas = useCallback((objectToAdd, dropX, dropY) => {
        // Default to center if coordinates not provided (e.g., via click)
        const canvasRect = canvasRef.current ? canvasRef.current.getBoundingClientRect() : { width: 800, height: 600 };
        // If dropX/Y are provided, use them. Otherwise center. 
        // Note: dropX/Y are relative to canvas top-left and scaled by zoom already in handleTouchEnd? 
        // No, handleTouchEnd passed (touch - left) / zoom.

        let finalX = dropX;
        let finalY = dropY;

        if (finalX === undefined || finalY === undefined) {
            // Center placement
            finalX = (canvasRect.width / zoom) / 2;
            finalY = (canvasRect.height / zoom) / 2;
        }

        const newItem = {
            id: Date.now(),
            type: objectToAdd.id,
            name: objectToAdd.name,
            icon: objectToAdd.icon,
            x: finalX - (objectToAdd.defaultSize.width / 2),
            y: finalY - (objectToAdd.defaultSize.height / 2),
            width: objectToAdd.defaultSize.width,
            height: objectToAdd.defaultSize.height,
            rotation: 0,
            color: objectToAdd.color,
            zIndex: canvasItems.length,
            opacity: 1,
        };

        setCanvasItems(prevItems => {
            const newItems = [...prevItems, newItem];
            addToHistory(newItems);
            return newItems;
        });
        setSelectedItem(newItem.id);

        // Trigger confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        showToast('Item added to canvas', 'success');
        announce(`Added ${newItem.name} to canvas`);
    }, [canvasItems, addToHistory, showToast, announce]); // Dependencies for useCallback

    // Handle drag start from object library
    const handleDragStart = (e, object) => {
        setDraggedObject(object);
        e.dataTransfer.effectAllowed = 'copy';
    };

    // Handle drag over canvas
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Mobile Touch DnD Logic
    const handleTouchStart = (e, object) => {
        // e.preventDefault(); // Don't prevent default here to allow scrolling if not dragging yet
        setDraggedObject(object);
    };

    const handleTouchMove = (e) => {
        // Just track movement if needed, mainly controlled by CSS touch-action
    };

    const handleTouchEnd = (e) => {
        if (draggedObject && canvasRef.current) {
            const touch = e.changedTouches[0];
            const canvasRect = canvasRef.current.getBoundingClientRect();

            // Check if drop is within canvas
            if (
                touch.clientX >= canvasRect.left &&
                touch.clientX <= canvasRect.right &&
                touch.clientY >= canvasRect.top &&
                touch.clientY <= canvasRect.bottom
            ) {
                const x = (touch.clientX - canvasRect.left) / zoom;
                const y = (touch.clientY - canvasRect.top) / zoom;

                addItemToCanvas(draggedObject, x, y);
            }
            setDraggedObject(null);
        }
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

        const newItems = [...canvasItems, newItem];
        setCanvasItems(newItems);
        addToHistory(newItems); // HCI: Add to history
        setSelectedItem(newItem.id);
        setDraggedObject(null);

        // Trigger confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        showToast('Item added to canvas', 'success');
        announce(`Added ${newItem.name} to canvas`);
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
            // HCI: Add to history on drag end
            addToHistory(itemsRef.current);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Update selected item property
    const updateSelectedItem = (property, value) => {
        const newItems = canvasItems.map(item =>
            item.id === selectedItem ? { ...item, [property]: value } : item
        );
        setCanvasItems(newItems);
        // Debounce history update for sliders could be better, but simple push for now
        // For sliders, this might create too many history entries. 
        // Ideally we'd only push on mouseUp of slider, but onChange is simpler for now.
        // Let's assume discrete updates or acceptable overhead.
        addToHistory(newItems);
    };

    // Delete selected item
    const deleteSelectedItem = () => {
        const newItems = canvasItems.filter(item => item.id !== selectedItem);
        setCanvasItems(newItems);
        addToHistory(newItems);
        setSelectedItem(null);
        showToast('Item deleted', 'info');
        announce('Item deleted');
    };

    // Change layer order
    const changeLayer = (direction) => {
        const item = canvasItems.find(i => i.id === selectedItem);
        if (!item) return;

        const newZIndex = direction === 'forward'
            ? Math.min(item.zIndex + 1, canvasItems.length - 1)
            : Math.max(item.zIndex - 1, 0);

        const newItems = canvasItems.map(i => {
            if (i.id === selectedItem) return { ...i, zIndex: newZIndex };
            // Simple z-index swap or adjustment could be more complex, 
            // but for now just clamping is enough for visual stacking in CSS grid/flex or absolute
            return i;
        });

        setCanvasItems(newItems);
        addToHistory(newItems);
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
        showToast('Design saved successfully!', 'success');
        announce('Design saved');
    };

    // Load design
    const loadDesign = (design) => {
        setCanvasItems(design.items);
        addToHistory(design.items);
        setSelectedItem(null);
        showToast(`Loaded ${design.name}`, 'info');
        announce(`Loaded design ${design.name}`);
    };

    // Clear canvas
    const clearCanvas = () => {
        if (confirm('Are you sure you want to clear the entire canvas?')) {
            const newItems = [];
            setCanvasItems(newItems);
            addToHistory(newItems);
            setSelectedItem(null);
            showToast('Canvas cleared', 'info');
            announce('Canvas cleared');
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
        addToHistory(newItems);
        setSelectedItem(null);

        // Optional: Set specific ambience for template if added to template data
        if (template.id.includes('night') || template.id.includes('concert')) {
            setAmbience('night');
        } else {
            setAmbience('day');
        }
        showToast(`Template ${template.name} loaded`, 'success');
        announce(`Loaded template ${template.name}`);
    };

    const selectedItemData = canvasItems.find(item => item.id === selectedItem);
    const filteredObjects = activeCategory === 'all'
        ? eventObjects
        : eventObjects.filter(obj => obj.category === activeCategory);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Undo: Ctrl+Z
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                undo();
            }
            // Redo: Ctrl+Y
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redo();
            }
            // Save: Ctrl+S
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveDesign();
            }
            // Toggle Shortcuts: ? (Shift+/)
            if (e.key === '?') {
                setShowShortcuts(prev => !prev);
            }

            if (e.key === 'Delete' && selectedItem) {
                deleteSelectedItem();
            }
            if (e.key === 'Escape') {
                setSelectedItem(null);
                setShowShortcuts(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem, undo, redo]); // Added dependencies

    return (
        <div className="event-creator">
            <Header />

            {/* HCI Enhancement: Live Region for Screen Readers */}
            <div className="sr-only" role="status" aria-live="polite">
                {announcement}
            </div>

            {/* HCI Enhancement: Toast Notifications */}
            {toast && (
                <div className={`toast toast-${toast.type} slide-in`}>
                    <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}`}></i>
                    {toast.message}
                </div>
            )}

            {/* HCI Enhancement: Keyboard Shortcuts Panel */}
            {showShortcuts && (
                <div className="shortcuts-panel" role="dialog" aria-label="Keyboard Shortcuts">
                    <div className="shortcuts-header">
                        <h3>Keyboard Shortcuts</h3>
                        <button onClick={() => setShowShortcuts(false)} aria-label="Close">×</button>
                    </div>
                    <div className="shortcuts-grid">
                        <div className="shortcut-item"><span>Undo</span> <kbd>Ctrl</kbd> + <kbd>Z</kbd></div>
                        <div className="shortcut-item"><span>Redo</span> <kbd>Ctrl</kbd> + <kbd>Y</kbd></div>
                        <div className="shortcut-item"><span>Save</span> <kbd>Ctrl</kbd> + <kbd>S</kbd></div>
                        <div className="shortcut-item"><span>Delete</span> <kbd>Del</kbd></div>
                        <div className="shortcut-item"><span>Deselect</span> <kbd>Esc</kbd></div>
                        <div className="shortcut-item"><span>Shortcuts</span> <kbd>?</kbd></div>
                    </div>
                </div>
            )}

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
                    <button onClick={() => setShowShortcuts(true)} className="btn-help" aria-label="Show Keyboard Shortcuts">
                        <i className="fas fa-keyboard"></i> Help
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
                                        draggable="true"
                                        onDragStart={() => setDraggedObject(obj)}
                                        onTouchStart={(e) => handleTouchStart(e, obj)}
                                        onTouchEnd={handleTouchEnd}
                                        onClick={() => addItemToCanvas(obj)} // Fallback click to add
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Drag ${obj.name} to canvas`}
                                        data-tooltip={obj.name}
                                    >
                                        <div className="object-icon">{obj.icon}</div>
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
                                data-tooltip="Toggle Grid"
                            >
                                <i className="fas fa-th"></i>
                            </button>
                            <button
                                onClick={() => setAmbience(prev => prev === 'day' ? 'night' : 'day')}
                                className={`tool-btn ${ambience === 'night' ? 'active' : ''}`}
                                aria-label="Toggle Day/Night mode"
                                data-tooltip="Toggle Ambience"
                            >
                                <i className={`fas ${ambience === 'day' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                            <button
                                onClick={() => setShow3DView(true)}
                                className="tool-btn"
                                aria-label="Enter 3D Holodeck"
                                data-tooltip="Enter 3D Holodeck"
                            >
                                <i className="fas fa-cube"></i>
                            </button>
                            <button
                                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                                className="tool-btn"
                                aria-label="Zoom out"
                                data-tooltip="Zoom Out"
                            >
                                <i className="fas fa-search-minus"></i>
                            </button>
                            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                            <button
                                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                                className="tool-btn"
                                aria-label="Zoom in"
                                data-tooltip="Zoom In"
                            >
                                <i className="fas fa-search-plus"></i>
                            </button>
                            <button
                                onClick={() => setZoom(1)}
                                className="tool-btn"
                                aria-label="Reset zoom"
                                data-tooltip="Reset Zoom (Fit)"
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
                                    onClick={(e) => e.stopPropagation()} /* Prevent click bubbling to canvas which causes deselection */
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${item.name} object`}
                                    data-tooltip={item.name} /* Tooltip for canvas item */
                                >
                                    <div className="item-icon">{item.icon}</div>
                                    {/* Removed visible text label to prevent overflow, using tooltip instead */}
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
                    onUpdateItem={(id, updates) => {
                        setCanvasItems(items => items.map(i => i.id === id ? { ...i, ...updates } : i));
                    }}
                    onSelectItem={setSelectedItem}
                    selectedId={selectedItem}
                />
            )}
        </div>
    );
};

export default EventCreator;
