'use client';
import { Subject, Review } from "@/types/Listings";
import { getCurrentPeriod, BellScheduleA, BellScheduleB } from "@/utils/schedules";
import { HiOutlineArrowDown, HiOutlineMapPin, HiHashtag, HiOutlineArrowRight, HiArrowDown, HiEllipsisVertical, HiChevronDown, HiPencil, HiSquare2Stack, HiArchiveBoxXMark, HiTrash, HiOutlineMap, HiMap, HiOutlinePaperAirplane, HiPaperAirplane, HiOutlineLink } from 'react-icons/hi2';
import { Structures } from "bla-aspen";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { getSubjectColorWithoutOpacitySettings } from "@/utils/colors";
import { DetailedCourse, StoredCourses } from "@/types/Storage";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function ScheduleView({ courses }: { courses: {
    color: string;
    code: string;
    name: string;
    subject: Subject;
    description: string;
    rigor: "AP" | "Honors" | "Regular";
    link: string | null;
    reviews: Review[];
    grades: (7 | 8 | 9 | 10 | 11 | 12)[];
  }[]
}) {
  // const test = new Date(2024, 7, 30, 12, 27);
  const timestamp = Date.now(); //test.valueOf();
  const [schedule, setSchedule] = useState<Structures.Schedule>(null!);
  const [studentCourses, setCourses] = useState<StoredCourses>(null!);
  const [scheduleType, setScheduleType] = useState<'A' | 'B'>('A');
  const dayOfSchedule = getDayOfWeek();
  const currentPeriod = getCurrentPeriod(scheduleType, timestamp);
  const courseCatalogAboutCurrentPeriod = courses.find(c => {
    const isNotHomeroomOrPassing = Math.sign(currentPeriod?.block[2] || -1) !== -1 && Number.isInteger(currentPeriod?.block[2]);
    if (isNotHomeroomOrPassing) {
      return schedule && c.code === schedule[dayOfSchedule][currentPeriod?.block[2] || 0].course.courseCode;
    } else return false;
  });

  const nextDay = () => {
    switch (dayOfSchedule) {
      case 'M': return 'T';
      case 'T': return 'W';
      case 'W': return 'R';
      case 'R': return 'F';
      case 'F': return 'M';
    }
  }

  useEffect(() => {
    const storedSchedule = secureLocalStorage.getItem('schedule') as Structures.Schedule;
    if (storedSchedule) {
      setSchedule(storedSchedule);
      return;
    } else if (secureLocalStorage.getItem('refreshToken')) {
      fetch('/api/aspen/schedule', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
        })
      }).then(async (data) => {
        const result: Structures.Schedule = await data.json();
        secureLocalStorage.setItem('schedule', result);
        setSchedule(result);
      }).then(() => {
        fetch('/api/airtable/update', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
            fields: {
              scheduleJSON: JSON.stringify(secureLocalStorage.getItem('schedule')),
            }
          })
        });
      });
    }

    setSchedule(secureLocalStorage.getItem('schedule') as Structures.Schedule);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedCourses = secureLocalStorage.getItem('courses') as StoredCourses;
    if (storedCourses) {
      setCourses(storedCourses);
    } else if (secureLocalStorage.getItem('refreshToken')) {
      fetch('/api/aspen/courses', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
        })
      }).then(async (data) => {
        const result: StoredCourses = await data.json();
        secureLocalStorage.setItem('courses', result);
        setCourses(result);
      }).then(() => {
        fetch('/api/airtable/update', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
            fields: {
              coursesJSON: JSON.stringify(secureLocalStorage.getItem('courses')),
            }
          })
        });
      });
    }
  }, []);

  console.log(schedule);

  /**
 * @param {T} resultA - the result to return if the current period is an actual class
 * @param {T} resultB - the result to return if the current period is a passing period
 * @param {T} resultC - the result to return if the current period is homeroom
 */
  function conditionalReturnOfCurrentPeriod<T>(resultA: T, resultB: T, resultC: T) {
    if (currentPeriod?.block[2] === -1) {
      return resultC;
    }
    if (`${currentPeriod?.block[2]}`.includes('.5')) {
      return resultB;
    }
    return resultA;
  }

  const currentCourseFromData = (() => {
    
    if (schedule) {
      const id = `${schedule[dayOfSchedule][currentPeriod?.block[2] || 0].course.courseCode}-${schedule[dayOfSchedule][currentPeriod?.block[2] || 0].course.sectionNumber}`
      return studentCourses?.current.find(c => c.sectionNumber.split('-').slice(0, 2).join('-') === id);
    }
    return null;
  })();

  // express hours in the day as a decimal, ex 7.5 = 7:30 and 14.75 = 2:45
  const currentHour = new Date().getHours() + new Date().getMinutes() / 60;

  type Course = (DetailedCourse | Structures.Course) & { links: {name: string, url: string}[] };
  return (
    schedule ? <>
      <div className="text-2xl font-bold mb-4 flex gap-2 items-center justify-between">
        <span>Today&apos;s Schedule</span>
        <ScheduleToggle state={scheduleType} setState={setScheduleType} />
      </div>
      {(isWeekend() || !currentPeriod) && <div className="border-2 border-white/15 bg-black/15 p-4 rounded-md">No classes right now.</div>}
      {!isWeekend() && currentPeriod && schedule && (
        <>
        <div className="block uppercase mb-1 italic mt-6 text-zinc-600 dark:text-zinc-400">happening now</div>
        <div className={`relative border p-4 rounded-md gap-4 flex items-center group shadow-md hover:shadow-lg transition bg-opacity-30 dark:text-white dark:border-black/25 ${courseCatalogAboutCurrentPeriod?.color || 'bg-zinc-400 dark:bg-zinc-700'}`}>
          <div className="font-semibold flex flex-col items-center justify-center w-[5ch]">
            <span className="block text-lg">{new Date(currentPeriod.block[0])
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0]}</span>
            <span className="block text-normal">
              <HiArrowDown className="w-6" />
            </span>
            <span className="block text-lg">{new Date(currentPeriod.block[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0]}</span>
          </div>
          <div>
            {currentPeriod.block[2] === -1 ? (
              <>
                <div>
                  <div className="font-bold text-xl">Homeroom</div>
                  <div className="text-base">Have a great day today!</div>
                </div>
              </>
            ) : (
              `${currentPeriod.block[2]}`.includes('.5') ? (
                <>
                  <span className="text-base">It&apos;s passing period</span>
                  <span className="text-sm italic">but here&apos;s whats next:</span>
                </>
              ) : (
                <>
                  <span>
                    <CourseDropdown link={`/students/courses/${schedule[dayOfSchedule][currentPeriod.block[2]].course.courseCode}-${schedule[dayOfSchedule][currentPeriod.block[2]].course.sectionNumber}`} />
                  </span>
                  <span className="font-bold text-xl">{schedule[dayOfSchedule][currentPeriod.block[2]].course.courseName}</span>
                  <span className="block italic text-sm">{schedule[dayOfSchedule][currentPeriod.block[2]].course.teacherName}</span>
                  <div className="flex gap-3 mt-2">
                    <span className="font-normal text-base flex gap-0.5 items-center"><HiOutlineMapPin className="h-5" />{schedule[dayOfSchedule][currentPeriod.block[2]].course.roomNumber}</span>
                    <span className="font-normal text-base flex gap-0.5 items-center"><HiHashtag className="h-5" /> {schedule[dayOfSchedule][currentPeriod.block[2]].course.courseCode}-{schedule[dayOfSchedule][currentPeriod.block[2]].course.sectionNumber}</span>
                  </div>
                </>
              )
            )}
          </div>
        </div>
        {currentPeriod.block[2] !== -1 && Number.isInteger(currentPeriod?.block[2]) && (
          <div className={`mt-4 border p-4 rounded-md gap-4 group shadow-md hover:shadow-lg transition !bg-opacity-30 dark:text-white dark:border-black/25 ${courseCatalogAboutCurrentPeriod?.color || 'bg-zinc-400 dark:bg-zinc-700'}`}>
            {currentCourseFromData && (
              <div className="">
                <span className="block text-xl">Your links</span>
                <div>
                  {(currentCourseFromData as unknown as Course)?.links?.length > 0 ? (currentCourseFromData as unknown as Course)?.links?.map((link, i) => (
                    <a key={i} href={link.url} className="block text-blue-500 underline"><HiOutlineLink className="size-4 inline" /> {link.name}</a>
                  )) : (
                    <span className="text-sm">No links to display. Go to your course page to make some!</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        </>
      )}

      <div className="block uppercase mb-1 italic text-zinc-400 mt-6">later {(isWeekend()) && '(monday)'}</div>
      <div className="grid grid-cols-1 auto-rows-fr gap-4 mt-3">
        {schedule && schedule[currentHour < 13.67 ? dayOfSchedule : nextDay()]
          .slice(!isWeekend() ?
          // start from the period after the current one BUT check for passing periods (+.5)
          (currentPeriod?.block[2] !== -1 ? Math.floor(currentPeriod?.block[2]!) + 1 : 0)
          : 0) // otherwise, start from beginning of the day
          .map((block, i, arr) => {
            const prev = arr[i - 1];
            const curr = arr[i];
            const next = arr[i + 1];
            const background = getSubjectColorWithoutOpacitySettings(courses.find(c => c.code === curr?.course.courseCode)?.subject);

            const firstHalfOfDoubleBlock = `${curr?.course.courseCode}-${curr?.course.sectionNumber}` === `${next?.course.courseCode}-${next?.course.sectionNumber}`;
            const secondHalfOfDoubleBlock = `${curr?.course.courseCode}-${curr?.course.sectionNumber}` === `${prev?.course.courseCode}-${prev?.course.sectionNumber}`
            
            if (secondHalfOfDoubleBlock) {
              return null;
            }


            const scheduleItem = (scheduleType === 'A' ? BellScheduleA : BellScheduleB).slice()
            .filter(b => b.name !== 'Passing Period' && b.name !== 'Homeroom')
            .find(b => b.block[2] === i + (currentPeriod ? conditionalReturnOfCurrentPeriod<number>(currentPeriod?.block[2]! + 1, 0, 0) : 0));

            const nextScheduleItem = (scheduleType === 'A' ? BellScheduleA : BellScheduleB).slice()
            .filter(b => b.name !== 'Passing Period' && b.name !== 'Homeroom')
            .find(b => b.block[2] === i + (currentPeriod ? conditionalReturnOfCurrentPeriod<number>(currentPeriod?.block[2]! + 1, 0, 0) : 0) + 1);
            
            return (
              <a key={i} href={curr?.course.sectionNumber ? `/students/courses/${curr?.course.courseCode}-${curr?.course.sectionNumber}` : '/students/home'} className={`cursor-pointer active:translate-y-1 border-2 p-4 rounded-md flex justify-between items-center group shadow-md hover:shadow-lg transition ${background} bg-opacity-10 border-opacity-30`}>
                <span className="flex gap-4 items-center">
                  <div className="font-semibold flex flex-col items-center justify-center min-w-[5ch]">
                    <span className="block text-lg">{new Date(scheduleItem?.block[0] || 1000)
                    .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0]}</span>
                    <span className="block text-normal">
                      <HiArrowDown className="w-6" />
                    </span>
                    <span className="block text-lg">{(() => {
                      // in any normal case, we want for the block to return a single end time, however double blocks need to be checked for
                      // we want to check that the next block and current block of the source schedule are identical, if they are not, we can assume that the block is a single block

                      if (firstHalfOfDoubleBlock) {
                        return new Date(nextScheduleItem?.block[1] || 0).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0];
                      }
                      
                      return new Date(scheduleItem?.block[1] || 0).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0];
                    })()}</span>
                  </div>
                  <span className="block text-left">
                    <span className="font-bold text-xl">{block.course.courseName}</span>
                    <span className="block italic text-sm">{block.course.teacherName}</span>
                    <div className="flex gap-3 mt-2">
                      <span className="font-normal text-base flex gap-0.5 items-center"><HiOutlineMapPin className="h-5" />{block.course.roomNumber}</span>
                      <span className="font-normal text-base flex gap-0.5 items-center"><HiHashtag className="h-5" /> {block.course.courseCode}-{block.course.sectionNumber}</span>
                    </div>
                  </span>
                </span>
                {/* <div>
                  <HiArrowRight className="w-10 group-hover:-translate-x-3 transition" />
                </div> */}
              </a>
            )
          })}
      </div>
    </>
    : <div className="w-full h-full border-2 border-zinc-600 rounded-md flex flex-col gap-6 items-center justify-center text-2xl">
      <span className="text-5xl">🏫</span>
      <span className="block italic">Loading schedule...</span>
    </div>
  )
}

function ScheduleToggle({ state, setState }:{ state: 'A' | 'B', setState: (state: 'A' | 'B') => void }) {
  return (
    <div className="flex gap-2 items-center">
      <button className={`bg-zinc-300/30 p-2 rounded-full size-10 text-xl flex items-center justify-center ${state === 'A' && '!bg-emerald-400/30'}`} onClick={() => setState('A')} >A</button>
      <button className={`bg-zinc-300/30 p-2 rounded-full size-10 text-xl flex items-center justify-center ${state === 'B' && '!bg-sky-400/30'}`} onClick={() => setState('B')}>B</button>
    </div>
  )
}

function CourseDropdown({ link }:{ link: string }) {
  return (
    <Menu>
      <MenuButton className="absolute top-4 right-4 items-center gap-2 rounded-md text-sm/6 font-semibold text-white !outline-none">
        <HiEllipsisVertical className="size-7" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="w-52 origin-top-right rounded-xl border dark:border-zinc-700 bg-sky-50 dark:!bg-opacity-75 dark:backdrop-blur-sm dark:bg-zinc-800 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="text-xs py-2 px-3">
          Options
        </div>
        <MenuItem>
          <a href={link} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 dark:data-[focus]:bg-white/10 data-[focus]:bg-white/50">
            <HiPaperAirplane className="size-4 fill-black/30 dark:fill-white/30" />
            Jump to course page
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

function getDayOfWeek(date = new Date()): 'M' | 'T' | 'W' | 'R' | 'F' {
  const day = date.getDay();
  switch (day) {
    case 0:
    case 6:
    case 1:
      return 'M';
    case 2:
      return 'T';
    case 3:
      return 'W';
    case 4:
      return 'R';
    case 5:
      return 'F';
    default:
      throw new Error('Invalid day');
  }
}

function isWeekend(date = new Date()): boolean {
  const currentHour = date.getHours() + (date.getMinutes() / 60);
  const d = date.getDay();
  return d === 0 || d === 6 || (d === 5 && currentHour > 13.67);
}