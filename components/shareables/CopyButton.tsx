'use client';
import { Dialog, Popover, Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import { HiOutlineClipboardDocument, HiOutlineShare } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { checkEnvironment } from '@/utils/environment';
import { Button, Tooltip } from '@material-tailwind/react';

export default function Shareable({ selection }:{ selection: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionName, setSelectionName] = useState('');

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  return (
    <Popover className="relative">
      <Popover.Button>
        <Tooltip
          content="Share a link"
          className="bg-violet-400 rounded-full"
        >
          <HiOutlineShare className="h-6" />
        </Tooltip>
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10 right-0">
          <div className="bg-zinc-50 dark:bg-zinc-700 flex flex-col max-w-md rounded-md shadow-lg p-3 gap-3">
            <div>
              <label htmlFor="selection-name" className="text-zinc-400 dark:text-zinc-400">Name this selection</label>
              <input type="text" name="selection-name" id="selection-name" className="rounded-md outline-none transition border-2 dark:bg-zinc-700 dark:border-zinc-500 border-zinc-200 focus:border-amber-400 focus:ring-0" onChange={(t) => setSelectionName(t.target.value)} />
            </div>
            <CopyLink selection={selection} name={selectionName} />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

function CopyLink({ selection, name }: {selection: string[], name: string}) {
  const [success, setSuccess] = useState(false);

  const params: URLSearchParams = (() => {
    
    const p = new URLSearchParams();
    p.append('courses', encodeURI(JSON.stringify(selection)))
    p.append('name', name);

    return p;
  })();

  const handleClick = () => {
    const paramsString = params.toString();
    const baseURL = checkEnvironment();
    const link = `${baseURL}/course-selection?${paramsString}`;

    navigator.clipboard.writeText(link)
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500)
        console.log(`Link ${link} copied to clipboard`);
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  };

  return (
    <div>
      <Tooltip
        content="Copied to clipboard!" placement="top"
        className="bg-emerald-400 rounded-full"
        open={success}
      >
        <button className="bg-zinc-200/50 dark:bg-zinc-500/50 hover:bg-amber-200/50 dark:hover:bg-amber-300/30 transition text-zinc-400 hover:text-amber-400 w-full p-3 rounded-md flex flex-nowrap gap-3 whitespace-nowrap justify-center" onClick={handleClick}>
          Copy link
        </button>
      </Tooltip>
    </div>

  )
}