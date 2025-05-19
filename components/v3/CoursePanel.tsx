import { CourseListing } from "@/types/Listings";
import categorize from "@/utils/categorizeEmbeds";
import { colorTagByGrade, colorTagByRigor, colorTagBySubject } from "@/utils/colors";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaExpand, FaXmark } from "react-icons/fa6";
import { HiArrowTopRightOnSquare, HiLink } from "react-icons/hi2";

export default function CoursePanel({ course, setCourse }:{ course: CourseListing | null, setCourse: (c: CourseListing | null) => void }) {
  const media = categorize(course?.link || null);
  
  return (
    <AnimatePresence>
    {course && (<>
      <motion.div key="course-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bg-zinc-900/25 w-screen h-screen top-0 left-0 backdrop-blur-sm z-40 flex items-center justify-center p-8">
        <motion.div key="course-panel" initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0}} exit={{ opacity: 0, y: 20 }} transition={{ ease: 'easeInOut' }} className="max-h-[80vh] max-w-5xl w-full bg-zinc-50 shadow-xl z-50 border overflow-auto relative">
          <div className="border-b flex items-center justify-between p-8 text-left w-full gap-4 sticky bg-zinc-50 top-0">
            <div className="grow">
              <h2 className="text-xl md:text-4xl font-bold font-playfair-display mb-2">{course.name}</h2>
              <div className="w-full flex gap-2 items-center uppercase text-xs flex-wrap">
                {course.grades.map(((g, i) => (
                  !isNaN(g) && <div key={i} className={`inline-flex items-center justify-center size-7 rounded ${colorTagByGrade(g)}`}>
                    {g}
                  </div>
                )))}
                <span className={`h-7 inline-flex px-3 items-center justify-center rounded ${colorTagBySubject(course.subject)}`}>{course.subject}</span>
                <span className={`h-7 inline-flex px-3 items-center justify-center rounded ${colorTagByRigor(course.rigor)}`}>{course.rigor}</span>
                <span className="h-7 inline-flex px-3 items-center justify-center rounded">Course code: {course.code}</span>
              </div>
            </div>
            
            <div className="absolute top-8 right-4 md:static flex flex-col items-center gap-3">
              <button onClick={() => setCourse(null)}>
                <span className="sr-only">Close</span>
                <FaXmark className="size-8" />
              </button>
              {/* <button>
                <span className="sr-only">view in full</span>
                <FaArrowUpRightFromSquare className="size-6" />
                </button> */}
            </div>
          </div>
          <div className="p-8">
          <div>
            <div className={`shrink ${(media?.source !== 'gsites' && media?.source !== 'other') && media ? "basis-1/2" : ""}`}>
              <h2 className="text-2xl font-bold"> Description</h2>
              {course.description}
            </div>
            
            {media && <h2 className="text-2xl font-bold my-4">Learn more</h2>}
            {
              (media?.source === 'gsites' || media?.source === 'other') && media  ? (
                <div className="bg-fuchsia-400/20 p-4 rounded text-base">
                  <HiLink className="h-8 text-fuchsia-900 inline mr-2" />
                  <Link legacyBehavior href={media.link} passHref>
                    <a className="underline text-fuchsia-900" target="_blank" rel="noreferrer noopener">{media.link}</a>
                  </Link>
                </div>
              ) : null
            }

            {
              (media?.source !== 'gsites' && media?.source !== 'other') && media ? (
                <div className="basis-1/2">
                  <iframe src={media?.getEmbedLink()} className="w-full h-auto aspect-video"></iframe>
                </div>
              ) : null
            }
      </div>
          </div>
        </motion.div>
      </motion.div>
    </>)}
  </AnimatePresence>
  )
}

/*

<AnimatePresence>
  {course && (<>
    <motion.div key="course-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bg-zinc-900/25 w-screen h-screen top-0 left-0 backdrop-blur-sm z-40" />
    <motion.div key="course-panel" initial={{ opacity: 0, x: '55vw' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '55vw' }} transition={{ ease: 'easeInOut' }} className="fixed top-0 right-0 h-screen w-[55vw] bg-zinc-50 shadow-xl z-50">
      <div className="border-b h-32 flex items-center justify-end p-8 text-right w-full gap-4">
        <div>
          <h2 className="text-4xl font-bold font-playfair-display italic">{course.name}</h2>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <button onClick={() => setCourse(null)}>
            <span className="sr-only">Close</span>
            <FaXmark className="size-8" />
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="flex gap-2 items-center justify-end uppercase text-sm mb-4">
          {course.grades.map(((g, i) => (
            <div key={i} className="flex items-center justify-center size-10 rounded-full border">
              <span>{g}</span>
            </div>
          )))}
          <span className="h-7 inline-flex px-3 items-center justify-center rounded-full border">{course.subject}</span>
          <span className="h-7 inline-flex px-3 items-center justify-center rounded-full border">{course.rigor}</span>
          <span className="h-7 inline-flex px-3 items-center justify-center rounded-full border">Course code: {course.code}</span>
        </div>
        {course.description}
      </div>
    </motion.div>
  </>)}
</AnimatePresence>

*/