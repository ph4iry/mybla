'use client';
import { Subject, Review } from "@/types/Listings";
import { getCurrentPeriod, BellScheduleA, BellScheduleB } from "@/utils/schedules";
import { HiOutlineArrowDown, HiOutlineMapPin, HiHashtag, HiOutlineArrowRight, HiArrowDown } from 'react-icons/hi2';
import { Structures } from "bla-aspen";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

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
  const [schedule, setSchedule] = useState<Structures.Schedule>(null!);
  const [scheduleType, setScheduleType] = useState<'A' | 'B'>('A');
  const dayOfSchedule = getDayOfWeek();
  const currentPeriod = getCurrentPeriod('A', new Date().setHours(8, 25));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSchedule = secureLocalStorage.getItem('schedule') as Structures.Schedule;
      if (storedSchedule) {
        setSchedule(storedSchedule);
      } else {
        fetch('/api/aspen', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
          })
        }).then(async (data) => {
          const result = Object.entries(await data.json());
          for (const [key, value] of result) {
            secureLocalStorage.setItem(key, JSON.stringify(value));
          }
        });
      }

      setSchedule(secureLocalStorage.getItem('schedule') as Structures.Schedule);

      // console.log(schedule[dayOfSchedule]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="text-2xl font-bold mb-4 flex gap-2 items-center justify-between">
        <span>Today&apos;s Schedule</span>
        <ScheduleToggle state={scheduleType} setState={setScheduleType} />
      </div>
      {(isWeekend() || !currentPeriod) && <div className="bg-zinc-300/30 p-4 rounded-md text-zinc-800">No classes right now.</div>}
      {!isWeekend() && currentPeriod && schedule && (
        <>
        <div className="block uppercase mb-1 italic mt-6 text-zinc-400">happening now</div>
        <div className={`border p-4 rounded-md flex justify-between items-center group shadow-md hover:shadow-lg transition bg-opacity-30 dark:text-white dark:border-black/25`}>
          <div className="font-semibold flex flex-col items-center justify-center w-[5ch]">
            <span className="block text-lg">{new Date(currentPeriod.block[0])
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0]}</span>
            <span className="block text-normal">
              <HiArrowDown className="w-6" />
            </span>
            <span className="block text-lg">{new Date(currentPeriod.block[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0]}</span>
          </div>
          <div>
            <span className="font-bold text-xl">{schedule[dayOfSchedule][currentPeriod.block[2]].course.courseName}</span>
            <span className="block italic text-sm">{schedule[dayOfSchedule][currentPeriod.block[2]].course.teacherName}</span>
            <div className="flex gap-3 mt-2">
              <span className="font-normal text-base flex gap-0.5 items-center"><HiOutlineMapPin className="h-5" />{schedule[dayOfSchedule][currentPeriod.block[2]].course.roomNumber}</span>
              <span className="font-normal text-base flex gap-0.5 items-center"><HiHashtag className="h-5" /> {schedule[dayOfSchedule][currentPeriod.block[2]].course.courseCode}-{schedule[dayOfSchedule][currentPeriod.block[2]].course.sectionNumber}</span>
            </div>
          </div>
        </div>
        </>
      )}

      <div className="block uppercase mb-1 italic text-zinc-400 mt-6">later {isWeekend() && '(monday)'}</div>
      <div className="grid grid-cols-1 auto-rows-fr gap-4 mt-3">
        {schedule && schedule[dayOfSchedule].slice(!isWeekend() ? (currentPeriod?.block[2] || 0) + 1 : 0).map((block, i) => {
          const prev = schedule[dayOfSchedule].slice(!isWeekend() ? (currentPeriod?.block[2] || 0) + 1 : 0)[i - 1];
          const curr = schedule[dayOfSchedule].slice(!isWeekend() ? (currentPeriod?.block[2] || 0) + 1 : 0)[i];
          const next = schedule[dayOfSchedule].slice(!isWeekend() ? (currentPeriod?.block[2] || 0) + 1 : 0)[i + 1];
          const background = courses.find(c => c.code === curr.course.courseCode)?.color|| 'text-zinc-800';

          const firstHalfOfDoubleBlock = `${curr.course.courseCode}-${curr.course.sectionNumber}` === `${next?.course.courseCode}-${next?.course.sectionNumber}`;
          const secondHalfOfDoubleBlock = `${curr.course.courseCode}-${curr.course.sectionNumber}` === `${prev?.course.courseCode}-${prev?.course.sectionNumber}`

          if (secondHalfOfDoubleBlock) {
            return null;
          }
          
          return (
            <a key={i} href={curr.course.sectionNumber ? `/students/courses/${curr.course.courseCode}-${curr.course.sectionNumber}` : '/students/home'} className={`cursor-pointer active:translate-y-1 border-2 p-4 rounded-md flex justify-between items-center group shadow-md hover:shadow-lg transition ${background} bg-opacity-30 dark:text-white dark:border-black/25 border-white/25`}>
              <div className="flex gap-4 items-center">
                <div className="font-semibold flex flex-col items-center justify-center w-[5ch]">
                  <span className="block text-lg">{new Date((scheduleType === 'A' ? BellScheduleA : BellScheduleB).slice().filter(b => b.name !== 'Passing Period' && b.name !== 'Homeroom').find(b => b.block[2] === i + (!isWeekend() ? (currentPeriod?.block[2] || 0) + 1 : 0))!.block[0])
                  .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0]}</span>
                  <span className="block text-normal">
                    <HiArrowDown className="w-6" />
                  </span>
                  <span className="block text-lg">{(() => {
                    // in any normal case, we want for the block to return a single end time, however double blocks need to be checked for
                    // we want to check that the next block and current block of the source schedule are identical, if they are not, we can assume that the block is a single block

                    if (firstHalfOfDoubleBlock) {
                      return new Date((scheduleType === 'A' ? BellScheduleA : BellScheduleB).slice().filter(b => b.name !== 'Passing Period' && b.name !== 'Homeroom').find(b => b.block[2] === i + (currentPeriod?.block[2] || 0) + 2)!.block[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0];
                    }
                    
                    return new Date((scheduleType === 'A' ? BellScheduleA : BellScheduleB).slice().filter(b => b.name !== 'Passing Period' && b.name !== 'Homeroom').find(b => b.block[2] === i + (!isWeekend() ? (currentPeriod?.block[2] || 0) + 1 : 0))!.block[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0];
                  })()}</span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-xl">{block.course.courseName}</span>
                  <span className="block italic text-sm">{block.course.teacherName}</span>
                  <div className="flex gap-3 mt-2">
                    <span className="font-normal text-base flex gap-0.5 items-center"><HiOutlineMapPin className="h-5" />{block.course.roomNumber}</span>
                    <span className="font-normal text-base flex gap-0.5 items-center"><HiHashtag className="h-5" /> {block.course.courseCode}-{block.course.sectionNumber}</span>
                  </div>
                </div>
              </div>
              {/* <div>
                <HiArrowRight className="w-10 group-hover:-translate-x-3 transition" />
              </div> */}
            </a>
          )
        })}
      </div>
    </>
  )
}

function ScheduleToggle({ state, setState }:{ state: 'A' | 'B', setState: (state: 'A' | 'B') => void }) {
  return (
    <div className="flex gap-2 items-center">
      <button className={`bg-zinc-300/30 p-2 rounded-full aspect-square text-md flex items-center justify-center ${state === 'A' && '!bg-emerald-400/30'}`} onClick={() => setState('A')} >A</button>
      <button className={`bg-zinc-300/30 p-2 rounded-full aspect-square text-md flex items-center justify-center ${state === 'B' && '!bg-sky-400/30'}`} onClick={() => setState('B')}>B</button>
    </div>
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
  const d = date.getDay();
  return d === 0 || d === 6;
}