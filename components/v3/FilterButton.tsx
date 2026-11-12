import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

type FilterOption = {
  label: string;
  value: string;
};

type FilterPopoverProps<T> = {
  name: string;
  options: FilterOption[];
  selected: T[];
  onChange: (selected: T[]) => void;
  // tag classes (text + bg) matching how the value appears in the table
  colorFor?: (value: string) => string | undefined;
};

export default function FilterPopover<T>({ name, options, selected, onChange, colorFor }: FilterPopoverProps<T>) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // shift the menu sideways so it never runs past either edge of the viewport
  useLayoutEffect(() => {
    if (!open || !popoverRef.current || !menuRef.current) return;
    const left = popoverRef.current.getBoundingClientRect().left;
    const width = menuRef.current.offsetWidth;
    const gutter = 16;
    setOffset(Math.max(gutter - left, Math.min(0, window.innerWidth - gutter - width - left)));
  }, [open]);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: T) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const tagClass = (value: string) => colorFor?.(value) ?? 'text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800';
  const first = selected[0] as string | undefined;

  return (
    <div className="relative text-left overflow-visible" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`h-8 pl-2.5 pr-2 text-sm border rounded-md inline-flex items-center gap-1.5 whitespace-nowrap transition ${selected.length > 0 ? 'border-stone-400 dark:border-stone-500 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
      >
        <span className="text-stone-700 dark:text-stone-300">{name}</span>
        {first && (
          <span className={`px-1.5 rounded text-xs leading-5 max-w-[12ch] truncate ${tagClass(first)}`}>{options.find(o => o.value === first)?.label ?? first}</span>
        )}
        {selected.length > 1 && <span className="text-xs text-stone-500 dark:text-stone-400">+{selected.length - 1}</span>}
        <FaChevronDown className={`size-2.5 text-stone-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }} ref={menuRef} style={{ left: offset }} className={`absolute mt-1 w-max min-w-44 max-w-[min(24rem,calc(100vw-2rem))] rounded-md shadow-lg dark:shadow-black/50 bg-white dark:bg-stone-800 border dark:border-stone-700 z-50`}>
            <div className="p-1.5 max-h-72 overflow-auto">
              {options.map((option) => (
                <label key={option.value} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-stone-50 dark:hover:bg-stone-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value as T)}
                    onChange={() => toggleOption(option.value as T)}
                    className="form-checkbox size-3.5 rounded text-stone-800 dark:text-amber-400 dark:bg-stone-800 dark:border-stone-600 focus:ring-0 focus:ring-offset-0"
                  />
                  <span className={`px-1.5 rounded text-sm leading-6 ${tagClass(option.value)}`}>{option.label}</span>
                </label>
              ))}
            </div>
            {selected.length > 0 && (
              <div className="border-t p-1.5">
                <button onClick={() => onChange([])} className="w-full text-left text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-2 py-1">Clear</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
