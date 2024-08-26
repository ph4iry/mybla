'use client';

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { HiMapPin } from 'react-icons/hi2';
import { Structures } from "bla-aspen";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function ProfileLayout({ children }:{ children: React.ReactNode }) {
  const [student, setStudent] = useState<Structures.Student>(null!);
  const [preferredName, setPreferredName] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const chunks = pathname.substring(10).split('/');
  const handleLogout = () => {
    secureLocalStorage.clear();
    sessionStorage.clear();
    router.push('/students/login');
  };

  useEffect(() => {
    const storedStudent = (secureLocalStorage.getItem('profile') as Structures.Student);
    setStudent(storedStudent);
    setPreferredName(secureLocalStorage.getItem('preferredName') as string);
  }, []);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="inline text-sm">
          <Link href="/students/home" className="py-1 px-2 rounded-full bg-black/15">home</Link> &gt;
          {chunks.map((chunk, i, a) => (
            <span key={i}>
              <Link href={`/students/${chunks.slice(0, i + 1).join('/')}`} className="py-1 px-2 rounded-full bg-black/15 inline-flex items-center">{chunk}{i === a.length - 1 && <HiMapPin className="size-4 inline ml-1"/>}</Link>{i === a.length - 1 ? '' : ' > '}
            </span>
          ))}
        </div>
        <Popover>
          <PopoverButton className="!ring-0 !outline-none">
            <div className="flex items-center gap-3">
              <div suppressHydrationWarning className="md:block hidden">{preferredName || student?.name}</div>
              <div className="size-10 rounded-full" style={{
                backgroundImage: `url(${student?.studentPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></div>
            </div>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom end"
            className="mt-3 divide-y divide-white/5 rounded-xl bg-black/25 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 min-w-sm"
          >
            <div className="p-3">
              <a href="/students/me" className="block rounded-lg py-1 px-3 transition text-white hover:bg-white/5">
                Profile
              </a>
            </div>
            <div className="bg-red-400/30 p-3">
              <button className="block rounded-lg py-1 px-3 transition hover:bg-white/5" onClick={handleLogout}>
                <p className=" text-white">Log out</p>
              </button>
            </div>
            
          </PopoverPanel>
        </Popover>
      </div>
      {children}
    </>
  )
}