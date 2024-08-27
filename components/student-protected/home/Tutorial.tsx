'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { HiXMark } from 'react-icons/hi2';
import { useEffect, useState } from "react";
import secureLocalStorage from 'react-secure-storage';

export default function TutorialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  function open() {
    setIsOpen(true)
  }

  function close() {
    // sessionStorage.setItem('tutorial', 'false');
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-lg w-full bg-zinc-800 text-sm font-medium text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white my-4 flex justify-between text-left"
      >
        <div className="py-8 p-4">
          <div className="text-xl font-bold mb-2">Open tutorial</div>
          <div className="italic">New to the site? Click here!</div>
        </div>
        <div className="shrink-0 size-32 relative bg-emerald-400/20 rounded-r-lg">
          <img src="/dragon-head.png" alt="" className="w-4/5 h-auto absolute bottom-0 right-4" />
        </div>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 bg-black/25 backdrop-blur-sm w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-sky-50 dark:bg-zinc-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle className="text-2xl font-medium">
                Tutorial
              </DialogTitle>
              <div className="my-3 relative h-[45vh]">
                <Slide slide={0} state={slide}>
                  <div className="text-xl font-semibold">Welcome to myBLA!</div>
                  <p className="dark:text-zinc-400 block">
                    myBLA is a BLA-exclusive student portal that allows you to access your schedule, submit course summaries, and more.
                  </p>
                  <p className="mt-2 dark:text-zinc-400">
                    Some features are disabled over the summer, but you can still access some features with last year&apos; data and submit course summaries.
                  </p>
                  <div className="mt-2 bg-rose-600/30 h-2/5 rounded-md">
                    this will be an image
                  </div>
                </Slide>
                <Slide slide={1} state={slide}>
                  <p className="dark:text-zinc-400">
                    you can access your courses on the courses page! scroll down to the bottom of your home to see the link.
                  </p>
                </Slide>
                <Slide slide={2} state={slide}>
                  <p className="dark:text-zinc-400">
                    in the future there will be more features that will be added, this will have a lot more flowery language but tbh... im lazy asf rn will get done by friday tho lolz
                  </p>
                </Slide>
              </div>
              <div className="flex w-full gap-4">
                <div className="grow grid grid-cols-2 gap-4">
                  <button className="py-2 bg-zinc-300 dark:bg-zinc-500 disabled:opacity-25 transition rounded-md" onClick={() => setSlide(slide - 1)} disabled={slide === 0}>back</button>
                  <button className="py-2 bg-zinc-300 dark:bg-zinc-500 rounded-md disabled:opacity-25" onClick={() => setSlide(slide + 1)} disabled={slide === 2}>next</button>
                </div>
                <button
                  className=""
                  onClick={close}
                >
                  <HiXMark className="size-10" />
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

function Slide({ slide, state, children }:{ slide: number, state: number, children: React.ReactNode }) {
  return (
    <div className={`h-full absolute top-0 ${state === slide ? 'opacity-100' : 'opacity-0'} transition`}>
      {children}
    </div>
  )
}