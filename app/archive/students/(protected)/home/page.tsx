import { HiArrowRight, HiOutlineChevronLeft, HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineClock, HiOutlineHashtag, HiOutlineLockClosed, HiOutlineMapPin, HiOutlineUser } from 'react-icons/hi2';
import InteractiveCard from "@/components/student-protected/home/InteractiveCard";
import StudentInfoLoader from "@/components/student-protected/home/StudentInfoLoader";
import Welcome from "@/components/student-protected/home/Welcome";
import { getCurrentPeriod } from "@/utils/schedules";
import ScheduleView from "@/components/student-protected/home/ScheduleView";
import { getCourseSheet } from "@/utils/googleSheets";
import { colorBgBySubject } from "@/utils/colors";
// import { findUser } from "@/utils/airtable";
import TutorialModal from "@/components/student-protected/home/Tutorial";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Announcement from '@/components/student-protected/home/Announcement';

export default async function Home() {
  const sheet = await getCourseSheet();
  const coursesBySubject = sheet.map((course) => ({
    ...course,
    color: colorBgBySubject(course.subject),
  }));
  
  return (
    <div className="w-full h-full">
      <div className="w-full flex gap-4 justify-between items-center">
        <Welcome />
      </div>
      <div className="flex flex-col md:flex-row w-full mt-4 gap-8 h-full">
        <div className="md:basis-2/5">
          {/* <div><ChevronLeftIcon className="h-8 rotate-90 md:rotate-0 inline" /> Hide section</div> */}
          <div className="md:h-[70vh] max-h-[500px] overflow-y-auto fancy-scrollbar pr-1 md:pr-3 relative">
          {((d: number) => d === 5 || d === 6)(new Date().getMonth()) || process.env.NODE_ENV === 'development' ?
            <ScheduleView courses={coursesBySubject} />
            : (
              <div className="w-full h-full rounded-md bg-sky-400/30 text-sky-600 dark:text-white dark:bg-gradient-to-br from-sky-400/30 to-sky-500/30 p-8 text-center flex flex-col md:block justify-center items-center">
                Have a great summer!
                <div className="text-center text-8xl my-4">☀️</div>
                P.S. The real-time schedule display will reopen in September.
              </div>
            )
          }
          </div>
        </div>
        <div className="md:basis-3/5">
          <div className="w-full rounded-md bg-amber-300/40 dark:bg-zinc-800/40 flex items-end px-4 py-8 group">
            <Announcement />
          </div>
          {/* <TutorialModal /> */}
          <div className="my-4 p-4 rounded-md bg-white dark:bg-zinc-900 border-2 border-black">
            <div className="text-lg font-bold">myBLA FS is in beta</div>
            <div>Thank you for being a beta tester 💖 You can fill out the feedback form <a target='_blank' rel="noopener noreferrer" href="https://forms.gle/TiqYmwWXRwyhFLJK9" className="underline underline-offset-4 text-amber-500 dark:text-amber-400">here</a>!</div>
          </div>
          <div className="text-sm uppercase text-semibold text-zinc-400 my-2">jump to...</div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4">
          {/* <a className="rounded-md bg-sky-300/30 text-sky-800 dark:text-sky-200 p-4 hover:cursor-pointer transition hover:scale-105" href="/students/courses">
            <div className="text-lg mb-2"><HiOutlineBookOpen className="h-6 shrink-0 mr-2 inline" /> Courses</div>
            <div className="text-xs block">Take advantage of your personalized course catalog!</div>
          </a> */}
          <a className="rounded-md bg-rose-300/30 text-rose-800 dark:text-rose-200 p-4 hover:cursor-pointer transition hover:scale-105 md:col-span-2" href="/students/courses">
            <div className="text-lg mb-2"><HiOutlineAcademicCap className="h-6 shrink-0 mr-2 inline" /> Academics</div>
            <div className="text-xs block">View the previous and current year&apos;s classes</div>
          </a>
          <div className="rounded-md bg-emerald-300/30 text-emerald-800 dark:text-emerald-200 p-4 hover:cursor-pointer transition md:col-span-2 grayscale opacity-75">
            <div className="text-lg mb-2"><HiOutlineLockClosed className="h-6 shrink-0 mr-2 inline" /> More sections coming soon!</div>
            <div className="text-xs block">More resources will be available starting in October!</div>
          </div>
          {/* <a className="rounded-md bg-sky-300/30 text-sky-800 dark:text-sky-200 p-4 hover:cursor-pointer transition hover:scale-105" href="#">
            <div className="text-lg mb-2"><HiOutlineUser className="h-6 shrink-0 mr-2 inline" /> Upgraded Course Catalog</div>
            <div className="text-xs block">will probably have a more career-oriented course catalog but this is a useless link</div>
          </a> */}
          {/* <a className="rounded-md bg-emerald-300/30 text-emerald-800 dark:text-emerald-200 p-4 hover:cursor-pointer transition hover:scale-105 md:col-span-2" href="#">
            <div className="text-lg mb-2"><HiOutlineUser className="h-6 shrink-0 mr-2 inline" /> Student Life</div>
            <div className="text-xs block">interactive map + stuff | but this link goes nowhere lol</div>
          </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}