'use client';
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const savedTheme = () => {
  try { return localStorage.getItem('theme') } catch { return null }
}

const applyTheme = (dark: boolean) => document.documentElement.classList.toggle('dark', dark);

// follows the system setting until the user picks a theme, then remembers it
export default function ThemeToggle({ className = '' }:{ className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (savedTheme()) return;
      applyTheme(e.matches);
      setDark(e.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    applyTheme(next);
    setDark(next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  };

  return (
    <button onClick={toggle} className={className} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {/* render nothing until mounted, since the server can't know the theme */}
      {dark === null ? <span className="size-4" /> : dark ? <LuSun className="size-4" /> : <LuMoon className="size-4" />}
      <span className="sr-only">{dark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );
}
