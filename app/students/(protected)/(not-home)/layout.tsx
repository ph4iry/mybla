'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { HiArrowRight, HiMapPin } from 'react-icons/hi2';
import { Structures } from "bla-aspen";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
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
    const name = secureLocalStorage.getItem('preferredName') as string;
    setPreferredName(`${name}` !== 'null' ? name : storedStudent?.name);
  }, []);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-nowrap items-center gap-1 text-sm">
          <Link href="/students/home" className="py-1 px-2 rounded-full bg-sky-50 dark:bg-black/15">home</Link>
          <HiArrowRight className="size-4 inline" />
          {chunks.map((chunk, i, a) => (
            <Fragment key={i}>
              <Link href={`/students/${chunks.slice(0, i + 1).join('/')}`} className="py-1 px-2 rounded-full dark:bg-black/15 bg-sky-50 inline-flex items-center">{chunk}{i === a.length - 1 && <HiMapPin className="size-4 inline ml-1"/>}</Link>{i === a.length - 1 ? '' : <>
                <HiArrowRight className="size-4 inline" />
              </>}
            </Fragment>
          ))}
        </div>
        <Menu>
          <MenuButton className="!ring-0 !outline-none">
            <div className="flex items-center gap-3">
              <div suppressHydrationWarning className="md:block hidden">{preferredName || student?.name}</div>
              <div className="size-10 rounded-full" style={{
                backgroundImage: `url(${student?.studentPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></div>
            </div>
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="mt-3 divide-y divide-white/5 rounded-xl bg-white text-black dark:text-white dark:bg-black/25 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 min-w-sm"
          >
            <MenuItem>            
              <div className="p-3">
                <a href="/students/home" className="block rounded-lg py-1 px-3">
                  Home
                </a>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="bg-red-400/30 p-3">
                <button className="block rounded-lg py-1 px-3" onClick={handleLogout}>
                  <p className="">Log out</p>
                </button>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      {children}
    </>
  )
}