'use client';
import { Disclosure } from "@headlessui/react";
import { HiChevronUp } from 'react-icons/hi2';

export default function Navigator() {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="mr-4">
        <Disclosure.Button className="flex gap-2 flex-nowrap bg-black/25 p-3 rounded-md md:w-fit w-full">
        <div className="flex items-center justify-between md:justify-start w-full">
          <h1 className="text-lg font-semibold whitespace-nowrap mr-1">Resource Guide </h1>
          <HiChevronUp
            className={`${
              open ? 'rotate-180' : ''
            } h-5 w-5 text-white transition`}
          />
        </div>
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="p-4 rounded-md divide-y divide-zinc-600">
            <div className="flex flex-col gap-2 py-3">
              <a className="flex items-center py-1 text-sm" href="/guide/">
                Getting Started
              </a>
            </div>
            <div className="py-3">
              <div className="text-xs font-bold text-zinc-400 my-2">Electives</div>
              <div className="flex flex-col gap-2">
                <a className="flex items-center py-1 text-sm" href="/guide/ap-courses">
                  Taking AP Courses
                </a>
                <a className="flex items-center py-1 text-sm" href="/guide/arts-electives">
                  Arts Electives
                </a>
                <a className="flex items-center py-1 text-sm" href="/guide/student-voice">
                  Student Voice
                </a>
              </div>
            </div>
            <div className="py-3">
              <div className="text-xs font-bold text-zinc-400 my-2">Sharing</div>
              <div className="flex flex-col gap-2">
                <a className="flex items-center py-1 text-sm" href="/guide/shareables">
                  Shareables
                </a>
              </div>
            </div>
          </div>
        </Disclosure.Panel>
        </div>
      )}

    </Disclosure>
  )
}