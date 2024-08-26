'use client';
import { Transition, Dialog } from "@headlessui/react"
import { HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import { ReactNode, useState, Fragment, useCallback, MutableRefObject } from "react"
import { Tooltip } from "@material-tailwind/react";

export default function DocumentModal({ children, handleDownload }:{ children: ReactNode, handleDownload: () => void }) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  return (
    <>
      <div className="">
        <Tooltip
          content="Export as PDF"
          className="bg-blue-400 rounded-full"
        >
          <button
            type="button"
            onClick={openModal}
          >
            <HiOutlineDocumentArrowDown className="h-6"/>
          </button>
        </Tooltip>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-200"
                  >
                    Download Selection as PDF
                  </Dialog.Title>
                  <div className="mt-2">
                    {children}
                  </div>

                  <div className="mt-4 flex gap-5">
                    <button className="w-full p-3 bg-sky-400/40 dark:bg-sky-400/20 basis-2/3 grow text-center rounded-md text-sky-600 dark:text-sky-400" onClick={handleDownload}>Download</button>
                    <button
                      type="button"
                      className="p-3 bg-rose-400/40 rounded-md dark:bg-rose-400/20 text-rose-600 dark:text-rose-400"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
