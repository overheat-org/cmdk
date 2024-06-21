Object.assign(global, { _JSX: React.createElement });

import './global.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QuickSwitcher from './quickswitcher';

function Layer({ open }) {
    return (
        <div className='layer'>
            <div className='focusLock'>
                <div className='container root rootWithShadow' style={{ opacity: 1, transform: 'scale(1)' }}>
                    <QuickSwitcher open={open} />
                </div>
            </div>
        </div>
    );
}

function App() {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.stopPropagation();
                setOpen((open) => !open);
            }
            else if(open && e.key == 'Escape') {
                e.stopPropagation();
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className='layerContainer' style={{ display: open ? 'block' : 'none' }}>
          <div 
            className='backdrop withLayer'
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(0px)' }} 
          />;
          <Layer open={open} />
        </div>
    );
}

const overheatElem = document.createElement('overheat');
document.body.appendChild(overheatElem);

ReactDOM.render(<App />, overheatElem);
