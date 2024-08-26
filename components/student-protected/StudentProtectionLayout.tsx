'use client';

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export default function StudentProtectedLayout({ children }:{ children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (window.sessionStorage as Storage | undefined) {
      if (!sessionStorage.getItem('session')) {
        secureLocalStorage.clear();
        router.replace('/students/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
    </>
  )
}