'use client';

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export default function StudentProtectedLayout({ children }:{ children: ReactNode }) {
  const router = useRouter();

  const checkSession = () => {
    if (window.sessionStorage as Storage | undefined) {
      if (!sessionStorage.getItem('session')) {
        secureLocalStorage.clear();
        router.replace('/students/login');
      }
    }
  };
  useEffect(() => {
    const i = setInterval(checkSession, 1000);
    return () => clearInterval(i);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="hidden">
        <div className="bg-sky-400 border-sky-400"></div>
        <div className="bg-emerald-400 border-emerald-400"></div>
        <div className="bg-violet-400 border-violet-400"></div>
        <div className="bg-amber-700 border-amber-700"></div>
        <div className="bg-pink-400 border-pink-400"></div>
        <div className="bg-zinc-400 border-zinc-400"></div>
      </div>
      {children}
    </>
  )
}