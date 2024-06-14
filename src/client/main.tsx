Object.assign(global, { _JSX: React.createElement });

import './global.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QuickSwitcher from './quickswitcher';

function Layer({ open }) {
    return (
        <div className='layer_c14d31'>
            <div className='focusLock__28507'>
                <div className='container_a35729 root_a28985 rootWithShadow_d20cd6' style={{ opacity: 1, transform: 'scale(1)' }}>
                    <QuickSwitcher open={open} />
                </div>
            </div>
        </div>
    );
}

function App() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.stopPropagation();
                setOpen((open) => !open);
            }
            else if(e.key == 'Escape' && open) {
                e.stopPropagation();
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className='layerContainer_a2fcaa' style={{ display: open ? 'block' : 'none' }}>
          <div 
            className='backdrop__1a911 withLayer__29ace'
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(0px)' }} 
          />;
          <Layer open={open} />
        </div>
    );
}

const overheatElem = document.createElement('overheat');
document.body.appendChild(overheatElem);

ReactDOM.render(<App />, overheatElem);
