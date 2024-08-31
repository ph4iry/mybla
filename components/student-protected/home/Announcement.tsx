'use client';
import { DialogBackdrop, DialogPanel, Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { HiArrowRight, HiXMark } from "react-icons/hi2";
import { FaGoogle } from 'react-icons/fa6';

export default function Announcement() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <div className="text-2xl font-bold">myBLA for Students is Here!</div>
      <button onClick={() => setOpen(true)} className="flex gap-0.5 text-base items-center">Read about it <HiArrowRight className="h-4 group-hover:translate-x-1 transition"/></button>
      <Dialog
        transition
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 backdrop-blur duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-6">
          <DialogPanel
          transition
          className="w-full max-w-xl max-h-[60vh] md:max-h-[70vh] overflow-y-auto transition duration-300 delay-300 data-[closed]:delay-0 data-[closed]:opacity-0 space-y-4 bg-sky-50 dark:bg-zinc-800 rounded-lg p-8">
            <div className="text-sm text-zinc-400 uppercase">give it a warm welcome...</div>
            <DialogTitle as="h2" className="text-2xl leading-none font-bold">myBLA for Students!</DialogTitle>
            <div className="mt-3">
              BPS, some time last school year, made a switch in Aspen logins:
            </div>
            <div className="mt-3 text-center">
              <div className="flex flex-nowrap gap-2 items-center justify-center">
                <div className=" p-2 rounded-md bg-emerald-400/30 text-center">
                  Student ID <br />+<br /> Password
                </div>
                <HiArrowRight className="size-10" />
                <div className="p-2 text-center flex flex-col items-center gap-2 rounded-md bg-red-400/30">
                  <span className="block">Google SSO</span>
                  <FaGoogle className="size-7" />
                </div>
              </div>
              <div className="text-sm mt-2">Instead of your student ID and password, you now sign in with your BPS Google Account.</div>
            </div>
            <div className="mt-3">
              This changes the way that apps such as <a href="https://gradecorner.com/" target="_blank" rel="noopener noreferrer" className="underline">Grade Corner</a> can access your schedule to present it on the app. It&apos;s a really hard cookie to crack! However, since the switch, <a className="underline" href="https://npmjs.org/bla-aspen">a new way to access information has been developed</a>!
            </div>
            <div className="mt-3">
              This area of the site is BLA-exclusive for students to access all of their student information in one place. See your grades, live schedule updates, and an interactive map of the school all at once! Features will roll out slowly over the course of the 2024-25 year, and by the end of the year there will be a full suite of tools available for dragons to come.
            </div>
            <div className="mt-3 flex justify-center md:justify-end">
              <button className="py-2 px-4 bg-sky-400/30 rounded" onClick={() => setOpen(false)}>
                Awesome!
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}