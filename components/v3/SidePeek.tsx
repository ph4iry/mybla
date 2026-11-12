'use client';
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useRef } from "react";
import { LuChevronDown, LuChevronsRight, LuChevronUp } from "react-icons/lu";

// Notion-style side peek: slides over the page from the right without hiding it.
// Clicks on elements marked `data-peek-row` don't close it, so picking another row just swaps the content.
export default function SidePeek({ open, onClose, onPrev, onNext, position, contentKey, children }:{
  open: boolean,
  onClose: () => void,
  onPrev?: () => void,
  onNext?: () => void,
  position?: string,
  contentKey?: string,
  children: ReactNode,
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (panelRef.current?.contains(target) || target.closest('[data-peek-row]')) return;
      onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [contentKey]);

  const navButton = "size-7 inline-flex items-center justify-center rounded text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          ref={panelRef}
          key="side-peek"
          role="dialog"
          aria-modal="false"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.3 }}
          className="fixed top-0 right-0 z-50 h-dvh w-full md:w-[min(42rem,60vw)] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.15)] dark:shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.6)] flex flex-col"
        >
          <div className="shrink-0 h-12 px-3 flex items-center gap-1 border-b border-stone-100 dark:border-stone-800">
            <button onClick={onClose} className={navButton} title="Close (Esc)">
              <LuChevronsRight className="size-5" />
              <span className="sr-only">Close</span>
            </button>
            <div className="w-px h-4 bg-stone-200 dark:bg-stone-700 mx-1" />
            <button onClick={onPrev} disabled={!onPrev} className={navButton} title="Previous">
              <LuChevronUp className="size-4" />
              <span className="sr-only">Previous</span>
            </button>
            <button onClick={onNext} disabled={!onNext} className={navButton} title="Next">
              <LuChevronDown className="size-4" />
              <span className="sr-only">Next</span>
            </button>
            {position && <span className="ml-1 text-xs text-stone-400 tabular-nums">{position}</span>}
          </div>
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto fancy-scrollbar">
            <div className="px-6 md:px-12 py-8 md:py-10">
              {children}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function PeekTitle({ children }:{ children: ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-bold font-playfair-display leading-tight text-stone-900 dark:text-stone-100 mb-6">{children}</h2>;
}

export function Properties({ children }:{ children: ReactNode }) {
  return <dl className="space-y-0.5 text-sm">{children}</dl>;
}

export function Property({ icon, label, children }:{ icon: ReactNode, label: string, children: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 py-1.5">
      <dt className="sm:w-36 shrink-0 flex items-center gap-2 text-stone-500 dark:text-stone-400 sm:min-h-6">
        <span className="size-4 shrink-0 text-stone-400 [&>svg]:size-4">{icon}</span>
        {label}
      </dt>
      <dd className="min-w-0 flex-1 flex flex-wrap gap-1 items-center sm:min-h-6 text-stone-800 dark:text-stone-200 break-words">{children}</dd>
    </div>
  );
}

export function PeekSection({ title, children }:{ title: string, children: ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{title}</h3>
      <div className="text-[15px] leading-relaxed text-stone-800 dark:text-stone-200">{children}</div>
    </section>
  );
}
