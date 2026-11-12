'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const [showCmd, setShowCmd] = useState(false);
  const isHome = usePathname() === '/';

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowCmd(window.navigator.userAgent.includes("Mac"));
    }
  }, []);
  const handleClick = () => { // manually fire cmd + k
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  return (
    <div className={`border-b flex items-center justify-between shrink-0 ${isHome ? 'p-8 h-32' : 'px-4 md:px-8 h-16'}`}>
      <Link href={'/'} className={`italic font-playfair-display font-semibold ${isHome ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>myBLA</Link>
      <div className="flex items-center gap-2">
      <button onClick={handleClick} className={`flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition ${isHome ? 'h-10 px-3' : 'h-8 px-2.5'}`}>
        <LuSearch className="size-4" />
        <span className="text-sm">Search</span>
        {showCmd && <span className="hidden md:inline-flex items-center gap-1 ml-2">
          <kbd className="px-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-300 dark:border-zinc-700">⌘ Cmd</kbd>
          <kbd className="px-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-300 dark:border-zinc-700">K</kbd>
        </span>}
      </button>
      <ThemeToggle className={`inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition ${isHome ? 'size-10' : 'size-8'}`} />
      </div>
    </div>
  )
}