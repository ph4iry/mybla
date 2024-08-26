import { HiArrowRight, HiOutlineChevronLeft, HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineClock, HiOutlineHashtag, HiOutlineLockClosed, HiOutlineMapPin, HiOutlineUser } from 'react-icons/hi2';
import InteractiveCard from "@/components/student-protected/home/InteractiveCard";
import StudentInfoLoader from "@/components/student-protected/home/StudentInfoLoader";
import Welcome from "@/components/student-protected/home/Welcome";
import { getCurrentPeriod } from "@/utils/schedules";
import ScheduleView from "@/components/student-protected/home/ScheduleView";
import { getSheet } from "@/utils/googleSheets";
import { colorBgBySubject } from "@/utils/colors";
// import { findUser } from "@/utils/airtable";
import TutorialModal from "@/components/student-protected/home/Tutorial";

export default async function Home() {
  const sheet = await getSheet();
  const coursesBySubject = sheet.map((course) => ({
    ...course,
    color: colorBgBySubject(course.subject),
  }));
  
  return (
    <div className="w-full h-full">
      <div className="w-full flex gap-4 items-center">
        <Welcome />
      </div>
      <div className="flex flex-col md:flex-row w-full mt-4 gap-8 h-full">
        <div className="md:basis-2/5">
          {/* <div><ChevronLeftIcon className="h-8 rotate-90 md:rotate-0 inline" /> Hide section</div> */}
          <div className="md:h-[70vh] overflow-y-auto fancy-scrollbar md:pr-3 relative">
          {((d: number) => d === 5 || d === 6)(new Date().getMonth()) ?
            <ScheduleView courses={coursesBySubject} />
            : (
              <div className="w-full rounded-md bg-sky-400/30 text-sky-600 dark:text-white dark:bg-gradient-to-br from-sky-400/30 to-sky-500/30 p-8 text-center flex flex-col md:block justify-center items-center">
                Have a great summer!
                <div className="text-center text-8xl my-4">☀️</div>
                P.S. This view will reopen in September.
              </div>
            )
          }
          </div>
        </div>
        <div className="md:basis-3/5">
          <div className="w-full rounded-md bg-stone-800/40 flex items-end px-4 py-8 group">
            <div>
              <div className="text-2xl font-bold">myBLA for Students is Here!</div>
              <div className="flex gap-0.5 text-base items-center">Read about it <HiArrowRight className="h-4 group-hover:translate-x-1 transition" /></div>
            </div>
          </div>
          <TutorialModal />
          <div className="text-sm uppercase text-semibold text-zinc-400 mb-2">jump to...</div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4">
          <a className="rounded-md bg-sky-300/30 text-sky-800 dark:text-sky-200 p-4 hover:cursor-pointer transition hover:scale-105" href="/students/courses">
            <div className="text-lg mb-2"><HiOutlineBookOpen className="h-6 shrink-0 mr-2 inline" /> Courses</div>
            <div className="text-xs block">Take advantage of your personalized course catalog!</div>
          </a>
          <a className="rounded-md bg-rose-300/30 text-rose-800 dark:text-rose-200 p-4 hover:cursor-pointer transition hover:scale-105" href="/students/courses">
            <div className="text-lg mb-2"><HiOutlineAcademicCap className="h-6 shrink-0 mr-2 inline" /> Academics</div>
            <div className="text-xs block">View the previous and current year&apos;s classes</div>
          </a>
          <a className="rounded-md bg-emerald-300/30 text-emerald-800 dark:text-emerald-200 p-4 hover:cursor-pointer transition hover:scale-105 md:col-span-2" href="/students/courses">
            <div className="text-lg mb-2"><HiOutlineUser className="h-6 shrink-0 mr-2 inline" /> Student Life</div>
            <div className="text-xs block">Find utilities</div>
          </a>
            {/* <InteractiveCard title="My Courses" description="View past, current, and future course selections" color="sky" link="/students/courses" icon={<HiOutlineBookOpen className="h-10 shrink-0" />} />
            <InteractiveCard title="Academics" description="View your grades and assignments" color="rose" link="/students/courses" icon={<HiOutlineAcademicCap className="h-10 shrink-0" />} />
            <InteractiveCard title="Student Life" description="Take advantage of opportunities at BLA" color="emerald" link="/students/courses" icon={<HashtagIcon className="h-10 shrink-0" />} />
            <InteractiveCard title="Utilities" link="/students/courses" color="violet" description="Collection of quick tools" icon={<HiOutlineClock className="h-10 shrink-0" />} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}