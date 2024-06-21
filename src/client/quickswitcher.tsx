import React, { useEffect, useRef, useState } from 'react';
import engine from '../api/engine';

function CommandItem({ command }) {
  return (
    <li className='result' onSelect={command.run}>
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
    const result = engine.search(searchTerm);
    console.log({result});
    setSearch(searchTerm);


    // if(result) {
    //   setElement(result);
    // }
    
    // setResults(filteredResults);
  };

  const mappedCommands = results.map((command, index) => (
    <CommandItem data-selected={index === selected} key={index++} command={command} />
  ));

  return (
    <div className='quickswitcher'>
      <input
        ref={inputRef}
        className='input'
        onChange={handleSearch}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <div className='scroller scrollerBase'>
        {mappedCommands}
      </div>
    </div>
  );
}

export default QuickSwitcher;
