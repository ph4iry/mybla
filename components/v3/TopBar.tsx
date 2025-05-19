'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { PiStarFourFill } from "react-icons/pi";

export default function TopBar() {
  const [showCmd, setShowCmd] = useState(false);

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
    <div className="border-b p-8 h-32 flex items-center justify-between">
      <Link href={'/'} className="text-4xl md:text-6xl italic font-playfair-display font-semibold">myBLA</Link>
      <div className="flex items-center gap-6">
        {showCmd && <span className="hidden md:block">
          <kbd className="px-2 py-1 text-sm font-mono text-zinc-700 bg-zinc-50 rounded border border-zinc-300">⌘ Cmd</kbd>
          +
          <kbd className="px-2 py-1 text-sm font-mono text-zinc-700 bg-zinc-50 rounded border border-zinc-300">K</kbd>
        </span>}
        <button className="flex gap-4 flex-nowrap items-center" onClick={handleClick}>
          <PiStarFourFill className="size-14 transition hover:text-amber-500" />
        </button>
      </div>
    </div>
  )
}