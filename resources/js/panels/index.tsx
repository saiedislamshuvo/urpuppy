import React from 'react';
import ReactDOM from 'react-dom/client';

// Public Components (used in Inertia pages)
import Navbar from '@/Components/Navigation/Navbarv2';
import Footer from '@/Components/Navigation/Footer';

// ===================================
// Component Registry
// Add your React components here to use them in Filament
// ===================================
const components: Record<string, React.ComponentType<any>> = {
    // Public components
    Navbar: Navbar,
    Footer: Footer,
};

interface AppProps {
    componentName: string;
    props?: Record<string, any>;
}

const App: React.FC<AppProps> = ({ componentName, props = {} }) => {
    const ComponentToRender = components[componentName];

    if (!ComponentToRender) {
        return (
            <div style={{ padding: '20px', background: '#fee', border: '1px solid #c00', borderRadius: '4px' }}>
                <strong>Component "{componentName}" not found.</strong>
                <br />
                <small>Available components: {Object.keys(components).join(', ')}</small>
            </div>
        );
    }

    return <ComponentToRender {...props} />;
};

// ===================================
// Initialize React components when DOM is ready
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Support both single and multiple React component containers
    const containers = document.querySelectorAll('[data-component]');

    containers.forEach((container) => {
        const componentName = container.getAttribute('data-component') || '';
        const propsString = container.getAttribute('data-props') || '{}';

        let props = {};
        try {
            props = JSON.parse(propsString);
        } catch (e) {
            console.error('Failed to parse props for component:', componentName, e);
        }

        const root = ReactDOM.createRoot(container);
        root.render(
            <App componentName={componentName} props={props} />
        );
    });
});