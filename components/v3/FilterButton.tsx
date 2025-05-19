import { Subject } from '@/types/Listings';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';

type FilterOption = {
  label: string;
  value: string;
};

type FilterPopoverProps<T> = {
  name: string;
  options: FilterOption[];
  selected: T[];
  onChange: (selected: T[]) => void;
};

export default function FilterPopover<T>({ name, options, selected, onChange }: FilterPopoverProps<T>) {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="relative text-left overflow-visible" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border-2 rounded-md hover:bg-slate-50"
      >
        {selected.length > 0 ? <>{name}: {selected[0]} {selected.length > 1 && `+${selected.length - 1}`}</> : name}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white border z-50">
            <div className="p-4 space-y-2">
              {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-1">
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value as T)}
                    onChange={() => toggleOption(option.value as T)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
