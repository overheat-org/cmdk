Object.assign(global, { _JSX: React.createElement });

import './global.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Engine } from '@api';
import { Command } from 'cmdk';

const engine = new Engine();
const overheatElem = document.createElement('overheat');
document.body.appendChild(overheatElem);

function App() {
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState('');
    const [returned, setReturned] = useState('');
    const [elements, setElements] = useState<string[]>([]);

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (true) {
            case (e.ctrlKey || e.metaKey) && e.key == 'k':
                e.stopPropagation();
                setOpen(o => !o);
                break;

            case open && e.key == 'Escape':
                e.stopPropagation();
                setOpen(false);
                break;
            
            case open && e.key == 'Enter':
                e.stopPropagation();
                setReturned(engine.run(query) as string);
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        const result = query.length != 0 ? [] : [];
        setElements(result);
    }, [query]);

    return (
        <Command.Dialog container={overheatElem} open={open} onOpenChange={setOpen}>
            <Command.Input value={query} onValueChange={setQuery} />

            <Command.List>
                {elements.map(e => (
                    <Command.Item>{e}</Command.Item>
                ))}
            </Command.List>
        </Command.Dialog>
    );
}

ReactDOM.render(<App />, overheatElem);
