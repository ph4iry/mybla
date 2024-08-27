'use client';
import { Item } from '@/types/Listings';
import { StoredCourses } from '@/types/Storage';
import { getSubjectColorWithoutOpacitySettings } from '@/utils/colors';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { Structures } from 'bla-aspen';
import { useEffect, useState } from 'react';
import { HiHashtag, HiOutlineAcademicCap, HiOutlineBeaker, HiOutlineBolt, HiOutlineBookOpen, HiOutlineChatBubbleOvalLeft, HiOutlineClock, HiOutlineGlobeAmericas, HiOutlineLanguage, HiOutlineMapPin, HiOutlineMegaphone, HiOutlinePaintBrush, HiOutlineUser, HiOutlineVariable } from 'react-icons/hi2';
import secureLocalStorage from 'react-secure-storage';

export default function CourseView() {
  const [previousCourses, setPreviousCourses] = useState<Structures.Course[]>([]);
  const [currentCourses, setCurrentCourses] = useState<Structures.Course[]>([]);
  const [courseCatalog, setCourseCatalog] = useState<Item[]>([]);
  const [courses, setCourses] = useState<StoredCourses>(null!);

  useEffect(() => {
    if (secureLocalStorage.getItem('courses')) {
      setPreviousCourses((secureLocalStorage.getItem('courses') as StoredCourses).previous);
      setCurrentCourses((secureLocalStorage.getItem('courses') as StoredCourses).current);
      return;
    } else {
      if (!secureLocalStorage.getItem('refreshToken')) return;
      // check airtable first THEN aspen
      fetch('/api/airtable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
          method: 'courses',
        })
      }).then(res => res.json()).then(data => {
        setPreviousCourses(data.previous);
        setCurrentCourses(data.current);
        secureLocalStorage.setItem('courses', data);
      });

      if (previousCourses?.length > 0 && currentCourses?.length > 0) return;

      // check aspen and update airtable
      fetch('/api/aspen/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
        })
      }).then(res => res.json()).then(data => {
        setPreviousCourses(data.previous);
        setCurrentCourses(data.current);
        secureLocalStorage.setItem('courses', data);
        return data
      }).then((data) => {
        fetch('/api/airtable/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
            fields: {
              coursesJSON: JSON.stringify({ ...data })
            }
          })
        })
      });
    }
    setCourses(secureLocalStorage.getItem('courses') as StoredCourses);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCourseCatalog(secureLocalStorage.getItem('courseCatalog') as Item[]);
    if (secureLocalStorage.getItem('courseCatalog')) return;
    fetch('/api', { method: 'GET', next: { revalidate: 3600 } }).then(res => res.json()).then((data: Item[]) => {
      setCourseCatalog(data);
      secureLocalStorage.setItem('courseCatalog', data);
    });
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabsToRender = [
    {
      name: 'Previous',
      courses: previousCourses,
    },
    {
      name: 'Current',
      courses: currentCourses,
    }
  ];

  const subjectIcon = (course: Structures.Course) => {
    const cn = "size-5";

    switch(courseCatalog.find(c => c.code === course.courseCode)?.subject) {
      case 'Math': return <HiOutlineVariable className={cn} />
      case 'Science': return <HiOutlineBeaker className={cn} />
      case 'History': return <HiOutlineGlobeAmericas className={cn} />
      case 'English': return <HiOutlineBookOpen className={cn} />
      case 'Classics/MFL': return <HiOutlineLanguage className={cn} />
      case 'Art': return <HiOutlinePaintBrush className={cn} /> 
      default: {
        if (course.courseName.includes('Study Hall')) {
          return <HiOutlineClock className={cn} />
        } else if (course.courseName.includes('Advisory')) {
          return <HiOutlineAcademicCap className={cn} />
        } else if (course.courseName.includes('Wellness')) {
          return <HiOutlineChatBubbleOvalLeft className={cn} />
        } else if (course.roomNumber === 'GYM') {
          return <HiOutlineMegaphone className={cn} />
        } else {
          return <HiOutlineBolt className={cn} />
        }
      }
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">My Courses</h1>
      <div className="text-base">Jump to classes from this or last year!</div>
      <div className="hidden">
        <div className="bg-sky-400 border-sky-400"></div>
        <div className="bg-emerald-400 border-emerald-400"></div>
        <div className="bg-violet-400 border-violet-400"></div>
        <div className="bg-amber-700 border-amber-700"></div>
        <div className="bg-pink-400 border-pink-400"></div>
        <div className="bg-zinc-400 border-zinc-400"></div>
      </div>
      {previousCourses.length === 0 && currentCourses.length === 0 ? <Skeleton /> : (
        <TabGroup defaultIndex={currentCourses.length === 0 ? 0 : 1} className="mt-4">
          <TabList className="flex items-center gap-4">
            Year: 
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black dark:text-white focus:outline-none dark:data-[selected]:bg-white/10 data-[selected]:bg-black/10 dark:data-[hover]:bg-white/5 data-[hover]:bg-black/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 dark:data-[focus]:outline-white data-[focus]:outline-black"
            >
             Previous
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black dark:text-white focus:outline-none dark:data-[selected]:bg-white/10 data-[selected]:bg-black/10 dark:data-[hover]:bg-white/5 data-[hover]:bg-black/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 dark:data-[focus]:outline-white data-[focus]:outline-black"
            >
             Current
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            {tabsToRender.map(({ name, courses }) => (
              <TabPanel key={name} className="rounded-xl bg-sky-50 dark:bg-white/5 p-3">
                <div className="grid md:grid-cols-2 gap-4">
                  {courses?.length > 0 ? courses.map((course: Structures.Course) => (
                    <div key={course.sectionNumber} className={`relative rounded-md p-3 text-sm/6 transition bg-opacity-10 md:bg-opacity-0 md:hover:bg-opacity-20 border-opacity-50 hover:scale-[1.02] ${getSubjectColorWithoutOpacitySettings(courseCatalog.find(c => c.code === course.courseCode)?.subject)}`}>
                      <div className="flex">
                        <a href={`/students/courses/${course.sectionNumber}`} className="font-semibold dark:text-white text-lg">
                          <span className="absolute inset-0" />
                          <span className="inline-flex items-center gap-2">
                            {subjectIcon(course)}
                            {course.courseName}
                            <span className="text-sm bg-sky-300/25 dark:bg-black/25 px-2 rounded-full">{course.semesters}</span>
                          </span>
                        </a>
                        
                      </div>
                      <div className="flex gap-2 text-black/50 dark:text-white/50" aria-hidden="true">
                        <span className="inline-flex gap-1 items-center"><HiHashtag className="size-4" /> {course.courseCode}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="inline-flex gap-1 items-center"><HiOutlineUser className="size-4" /> {course.teacherName}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="inline-flex gap-1 items-center"><HiOutlineMapPin className="size-4" /> {course.roomNumber || 'N/A'}</span>
                      </div>
                      <div className="flex gap-2 text-xs uppercase mt-2">
                        <div className="flex gap-1">
                          <span className="text-zinc-400">Absence</span>
                          <span>{course.attendance?.absences}</span>
                        </div>
                        <div className="flex gap-1">
                          <span className="text-zinc-400">Tardy</span>
                          <span>{course.attendance?.tardy}</span>
                        </div>
                        <div className="flex gap-1">
                          <span className="text-zinc-400">Dismissal</span>
                          <span>{course.attendance?.dismissal}</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <span className="dark:text-white/50 text-black/50 my-12 p-5 text-center w-full col-span-2">No courses found.</span>
                  )}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      )}
    </div>
  )
}

function Skeleton() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        Year: 
        <span
          className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black dark:text-white focus:outline-none dark:data-[selected]:bg-white/10 data-[selected]:bg-black/10 dark:data-[hover]:bg-white/5 data-[hover]:bg-black/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 dark:data-[focus]:outline-white data-[focus]:outline-black"
        >
          Previous
        </span>
        <span
          className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black dark:text-white focus:outline-none dark:data-[selected]:bg-white/10 data-[selected]:bg-black/10 dark:data-[hover]:bg-white/5 data-[hover]:bg-black/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 dark:data-[focus]:outline-white data-[focus]:outline-black"
        >
          Current
        </span>
      </div>
      <div className="mt-3">
      <div className="rounded-xl bg-white/5 p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {Array.from({ length: 10 }).map((_, i) => (
            (
              <span key={i} className="relative rounded-md p-3 text-sm/6 transition bg-opacity-10 md:bg-opacity-0 md:hover:bg-opacity-20 border-opacity-50 border-zinc-400 border">
                <div className="flex gap-2 dark:text-white/50 items-center" aria-hidden="true">
                  <span className="w-[3ch] h-[1ch] rounded-full bg-white/5"></span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="w-[15ch] h-[1ch] rounded-full bg-white/5"></span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="w-[3ch] h-[1ch] rounded-full bg-white/5"></span>
                </div>
                <div className="flex gap-2 text-xs uppercase mt-2">
                  <div className="flex gap-1">
                    <span className="dark:text-zinc-400">Absence</span>
                    <span className=""></span>
                  </div>
                  <div className="flex gap-1">
                    <span className="dark:text-zinc-400">Tardy</span>
                    <span></span>
                  </div>
                  <div className="flex gap-1">
                    <span className="dark:text-zinc-400">Dismissal</span>
                    <span></span>
                  </div>
                </div>
              </span>
            )
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}