import React, { useEffect, useRef, useState } from 'react';
import * as api from '../api';

function CommandItem({ command }) {
  return (
    <li className='result__25f11' onSelect={command.run}>
      {command.toString()}
    </li>
  );
}

function QuickSwitcher({ open }) {
  const [element, setElement] = useState();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<unknown[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.stopPropagation();

      if (e.shiftKey) {
        setSelected((prevSelected) => (prevSelected + 1) % results.length);
      } else {
        setSelected((prevSelected) => (prevSelected - 1 + results.length) % results.length);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    let filteredResults = Array.from(api.commands.values());
    if (searchTerm.length > 0) filteredResults = filteredResults.filter(command =>
      command.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const result = filteredResults.find(r => r === searchTerm);

    if(result) {
      setElement(result);
    }
    
    setResults(filteredResults);
  };

  const mappedCommands = results.map((command, index) => (
    <CommandItem data-selected={index === selected} key={index++} command={command} />
  ));

  return (
    <div className='quickswitcher_b5bb0a'>
      <input
        ref={inputRef}
        className='input__2a648'
        onChange={handleSearch}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <div className='scroller_d4b86c auto_a3c0bd scrollerBase_f742b2'>
        {mappedCommands}
      </div>
    </div>
  );
}

function getTokens() {
  
}

export default QuickSwitcher;
