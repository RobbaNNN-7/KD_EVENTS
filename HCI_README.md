# HCI Principles Implementation Guide

This project demonstrates the application of key **Human-Computer Interaction (HCI)** principles to create an engaging, accessible, and user-friendly Event Creator application.

## 1. User-Centered Design (UCD)
We focused on the user's need for control, feedback, and error prevention.
- **Undo/Redo System**: Users can experiment freely with a full history stack (`Ctrl+Z` / `Ctrl+Y`).
- **Contextual Feedback**: Toast notifications provide immediate confirmation for all actions (e.g., "Item deleted", "Design saved").
- **Onboarding**: A guided tutorial introduces new users to the interface.

## 2. Accessibility (a11y)
The application adheres to WCAG 2.1 AA standards.
- **Keyboard Navigation**: Full support for keyboard-only users.
- **ARIA Labels**: All interactive elements have descriptive `aria-label` attributes.
- **Screen Reader Support**: A live region (`role="status"`) announces dynamic changes like item additions or movements.
- **Focus Indicators**: High-contrast outline styles for focused elements.

## 3. Visual Design Principles
- **Hierarchy**: Clear distinction between primary (Header/Canvas) and secondary (Sidebars) areas.
- **Color**: A coherent color palette using semantic colors (Green for success, Blue for primary actions).
- **Whitespace**: Consistent 8px grid system for spacing to reduce cognitive load.

## 4. Feedback & Response Time
- **Micro-interactions**: Hover effects on buttons and list items provide immediate visual feedback.
- **Animations**: Smooth transitions (300ms ease-out) for toast notifications and modal appearances make the interface feel responsive.

## 5. Error Prevention & Handling
- **Confirmation Dialogs**: Destructive actions like "Clear Canvas" require user confirmation.
- **Visual Cues**: Invalid actions (like dragging outside bounds) are visually discouraged (though allowed for flexibility, they are constrained in 3D).

## 6. Fitts's Law
- **Target Size**: All touch targets (buttons, icons) are at least 44x44px or have ample padding.
- **Edge Placement**: Important tools are placed at screen edges (Top Toolbar, Sidebars) for easy infinite-width targeting.

## 7. Direct Manipulation
- **Drag & Drop**: Users interact directly with objects on the canvas, mirroring physical manipulation.
- **3D Interaction**: The 'Holodeck' view allows users to directly manipulate objects in 3D space with move/rotate controls.

## 8. 3D Graphics & Rendering
- **PBR Materials**: Physically Based Rendering for realistic object surfaces (roughness/metalness).
- **Lighting**: A combination of Ambient, Directional (Key), and Environment lighting for depth.
- **Shadows**: `ContactShadows` provide a grounding effect, preventing objects from looking like they are floating.

## 9. Consistency
- **Standardized Icons**: FontAwesome icons used consistently for similar actions.
- **Uniform Terminology**: "Design", "Canvas", "Item" terminology used throughout the UI and help text.

## 10. Memory Load Reduction
- **Keyboard Shortcuts Panel**: A dedicated panel (`?`) helps users recall shortcuts without leaving the context.
- **Visible Status**: Current settings (Zoom level, Ambience) are always visible.

## 11. Learnability
- **Tooltips**: Hovering over icons reveals their function.
- **Predictability**: Standard UI patterns (Left sidebar for library, Right for properties) lower the learning curve.

---

## Technical Stack
- **React**: Component-based UI.
- **Three.js / React Three Fiber**: 3D rendering engine.
- **CSS3**: For styling and animations.
