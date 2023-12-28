'use client';
import { Popover, Transition } from '@headlessui/react';
import ThemeToggler from './themes/ThemeToggler';
import Link from 'next/link';
import { BookmarkIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-white font-bold text-xl">myBLA</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link className="hover:text-gray-300" href="/">Home</Link>
            <CatalogLink />
            <Link className="hover:text-gray-300" href="/guide">Guide</Link>
            <div className="rounded bg-zinc-500/30 p-2">
              <ThemeToggler size='h-8'/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function CatalogLink() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center">Catalog <ChevronDownIcon className="ml-2 w-4 h-4 text-zinc-50" /></Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-2"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-2"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="p-4 translate-y-2 rounded-md absolute z-10 bg-white dark:bg-zinc-600 shadow-md">
          <div className="flex flex-col gap-3 whitespace-nowrap">
            <Link className="hover:text-gray-300" href="/catalog">
              <div className="flex dark:text-zinc-300 text-zinc-800 items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-300/20 mr-3">
                  <MagnifyingGlassIcon className="w-6 h-6 text-amber-300 stroke-2" />
                </div>
                Catalog
              </div>
            </Link>
            <Link className="" href="/catalog/favorites">
              <div className="flex dark:text-zinc-300 text-zinc-800 items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-300/20 mr-3">
                  <BookmarkIcon className="w-6 h-6 text-amber-300" />
                </div>
                My Favorites
              </div>
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}