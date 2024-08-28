'use client';

import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function StudentInfoLoader({ username, password }:{ username: string, password: string }) {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (secureLocalStorage.getItem('profile')) return;
    fetch('/api/aspen', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then(async (data) => {
      const result = Object.entries(await data.json());
      for (const [key, value] of result) {
        secureLocalStorage.setItem(key, JSON.stringify(value));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    loaded ? 
    <div className="w-screen h-screen fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center">
      <div className="text-4xl italic">Getting things ready for you...</div>
    </div> : null
  )
}