'use client';
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PiStarFourFill } from "react-icons/pi";


export default function Navigator() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button>
        <PiStarFourFill className="size-10" />
        <span className="sr-only">Open site directory</span>
      </button>
      <AnimatePresence>
        {open && (<>
          <motion.div key="directory-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bg-zinc-900/25 w-screen h-screen top-0 left-0 backdrop-blur-sm z-40 flex items-center justify-center p-8">
            <motion.div key="directory-panel" initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0}} exit={{ opacity: 0, y: 20 }} transition={{ ease: 'easeInOut' }} className="h-[80vh] max-w-5xl w-full bg-zinc-50 shadow-xl z-50 border overflow-auto relative">
              
            </motion.div>
          </motion.div>
        </>)}
      </AnimatePresence>
    </>
  )
}