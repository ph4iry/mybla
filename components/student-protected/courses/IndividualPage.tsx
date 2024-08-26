'use client';

import { Item } from "@/types/Listings";
import { StoredCourses } from "@/types/Storage";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Structures } from "bla-aspen";
import { clearModuleContext } from "next/dist/server/lib/render-server";
import { notFound } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { HiLink, HiOutlineArrowTopRightOnSquare, HiOutlinePlusCircle, HiXMark } from "react-icons/hi2";
import secureLocalStorage from "react-secure-storage";

interface DetailedCourse extends Structures.Course {
  teacherEmail: string;
  classSize: number;
  categories: {
    name: string;
    terms: {
      q1: {
        weight: number,
        average: number,
      },
      q2: {
        weight: number,
        average: number,
      },
      q3: {
        weight: number,
        average: number,
      },
      q4: {
        weight: number,
        average: number,
      },
    }
  }[];
  links: {
    name: string;
    url: string;
  }[];
}
type Course = DetailedCourse & { year: string };

export default function IndividualPage({ catalogCourse, section }:{ catalogCourse: Item | null, section: string }) {
  const [course, setCourse] = useState<Course>(null!);

  useEffect(() => {
    const prevAndCurr = Object.entries(secureLocalStorage.getItem('courses') as StoredCourses).map(([key, value]: [string, Structures.Course[]]) => value.map(v => ({
      ...v,
      year: key,
    }))).flat();

    const thisCourse = prevAndCurr.find(course => course.sectionNumber === section);
    
    if (!thisCourse) {
      notFound();
    }



    if (((secureLocalStorage.getItem('courses') as StoredCourses)[thisCourse.year as 'previous' | 'current'].find((c) => c.sectionNumber === section) as Course).hasOwnProperty('teacherEmail')) {
      setCourse(thisCourse as Course);
      return;
    }

    // get details
    fetch('/api/aspen/courses/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
        sectionNumber: section,
        year: thisCourse.year,
      }),
    }).then(res => res.json()).then(data => {
      setCourse(data);
      secureLocalStorage.setItem('courses', {
        ...(secureLocalStorage.getItem('courses') as StoredCourses),
        [thisCourse.year]: (secureLocalStorage.getItem('courses') as StoredCourses)[thisCourse.year as 'previous' | 'current'].map(course => {
          if (course.sectionNumber === section) {
            return {
              ...course,
              ...data,
              links: (course as DetailedCourse)?.links || []
            };
          }
          return {
            ...course,
            
          };
        }),
      });

      fetch('/api/airtable/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
          fields: {
            coursesJSON: JSON.stringify(secureLocalStorage.getItem('courses') as StoredCourses),
          }
        }),
      }).then(async (res) => {
        if (!res.ok) {
          console.error('Failed to update');
        }
      });
    });
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const term1 = course?.categories.map(category => category.terms.q1.average * category.terms.q1.weight).reduce((a, b) => a + b, 0) / 100;
  const term2 = course?.categories.map(category => category.terms.q2.average * category.terms.q2.weight).reduce((a, b) => a + b, 0) / 100;
  const term3 = course?.categories.map(category => category.terms.q3.average * category.terms.q3.weight).reduce((a, b) => a + b, 0) / 100;
  const term4 = course?.categories.map(category => category.terms.q4.average * category.terms.q4.weight).reduce((a, b) => a + b, 0) / 100;
  const final = (term1 + term2 + term3 + term4) / 4;

  return (
    <main>
      <h1 className="text-4xl font-bold">{course?.courseName || catalogCourse?.name}</h1>
      <div className="text-lg font-semibold">{course?.year === 'previous' ? 'Previous Year' : 'Current Year'}</div>
      {course ? (
        <>
          <div className="mt-4 border border-zinc-400 p-4 rounded-md flex flex-wrap md:grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-lg font-semibold">Teacher</div>
              <div>{course?.teacherName}</div>
            </div>
            <div className="col-span-2">
              <div className="text-lg font-semibold">Teacher Email</div>
              <a href={`mailto:${course?.teacherEmail}`} className="decoration-wavy truncate md:trunca transition hover:text-amber-400 hover:underline underline-offset-4">{course?.teacherEmail}</a>
            </div>
            <div>
              <div className="text-lg font-semibold">Subject</div>
              <div>{catalogCourse?.subject}</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Class Size</div>
              <div>{course?.classSize}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-4 border border-zinc-400 p-4 rounded-md grid grid-cols-3 gap-y-4">
          <div className="animate-pulse">
            <div>
              <div className="text-lg font-semibold">Teacher</div>
              <div className="bg-zinc-400/30 rounded-full h-[1ch] w-[14ch]"></div>
              
            </div>
            <div className="col-span-2">
              <div className="text-lg font-semibold">Teacher Email</div>
              <div className="bg-zinc-400/30 rounded-full h-[1ch] w-[30ch]"></div>
            </div>
            <div>
              <div className="text-lg font-semibold">Subject</div>
              <div className="bg-zinc-400/30 rounded-full h-[1ch] w-[6ch]"></div>
            </div>
            <div>
              <div className="text-lg font-semibold">Class Size</div>
              <div className="bg-zinc-400/30 rounded-full h-[1ch] w-[2ch]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold mt-4">Links</h2>
        <AddLink section={section} year={course?.year as 'previous' | 'current' || 'current'} update={setCourse} />
      </div>
      <div className="flex gap-4 mt-4 overflow-x-auto">
        {course?.links?.length > 0 ? course?.links?.map((link, i) => (
          <Fragment key={i}>
            <LinkPreview link={link} />
          </Fragment>
        )) : (
          <div className="text-zinc-400">No links have been added yet. Add one with the &quot;add a link&quot; button!</div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Grading Breakdown</h2>
        <div className="md:block hidden w-full bg-zinc-900/30 rounded-md overflow-hidden mt-3">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="w-full text-left p-3">Category</th>
                <th></th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
              </tr>
            </thead>
            <tbody>
              {course ? (
                <>
                  {course.categories.map((category, i) => (
                    <tr className="even:bg-zinc-700/30 " key={i}>
                      <td className="pl-3 border border-zinc-600/30">{category.name}</td>
                      <td className="py-2 border border-zinc-600/30">
                        <span className="block">Average</span>
                        <span className="block text-white/25">Weight</span>
                      </td>
                      <td className="border border-zinc-600/30 p-2">
                        <span className="block">{category.terms.q1.average?.toFixed(2) || 0}%</span>
                        <span className="block text-white/25">{category.terms.q1.weight?.toFixed(2)}%</span>
                      </td>
                      <td className="border border-zinc-600/30 p-2">
                        <span className="block">{category.terms.q2.average?.toFixed(2) || 0}%</span>
                        <span className="block text-white/25">{category.terms.q2.weight?.toFixed(2)}%</span>
                      </td>
                      <td className="border border-zinc-600/30 p-2">
                        <span className="block">{category.terms.q3.average?.toFixed(2) || 0}%</span>
                        <span className="block text-white/25">{category.terms.q3.weight?.toFixed(2)}%</span>
                      </td>
                      <td className="border border-zinc-600/30 p-2">
                        <span className="block">{category.terms.q4.average?.toFixed(2) || 0}%</span>
                        <span className="block text-white/25">{category.terms.q4.weight?.toFixed(2)}%</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="even:bg-zinc-700/30">
                    <td className="p-3" colSpan={2}>Final</td>
                    <td className="border border-zinc-600/30 p-2">{term1.toFixed(2)}%</td>
                    <td className="border border-zinc-600/30 p-2">{term2.toFixed(2)}%</td>
                    <td className="border border-zinc-600/30 p-2">{term3.toFixed(2)}%</td>
                    <td className="border border-zinc-600/30 p-2">{term4.toFixed(2)}%</td>
                  </tr>
                </>
              ) : (<>loading skeleton</>)}
            </tbody>
          </table>
        </div>
        <TabGroup className="mt-3 block md:hidden">
          <TabList className="flex gap-4">
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q1
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q2
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q3
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q4
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <TabPanel>
              {course ? (
                <div>
                  <div className="grid grid-cols-4 gap-y-4">
                    <div className="grid grid-cols-subgrid col-span-4 text-xs">
                      <div className="font-semibold col-span-2">Category</div>
                      <div className="flex justify-between">
                        <div>Average</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Weight</div>
                      </div>
                    </div>
                    {course.categories.map((category, i) => (
                      <div key={i} className="bg-zinc-700/30 p-4 rounded-md grid grid-cols-subgrid col-span-4">
                        <div className="text-lg font-semibold col-span-2">{category.name}</div>
                        <div className="flex justify-between">
                          <div>{category.terms.q1.average}%</div>
                        </div>
                        <div className="flex justify-between">
                          <div>{category.terms.q1.weight}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>loading skeleton</>
              )}
            </TabPanel>
            <TabPanel>
              {course ? (
                <div>
                  <div className="grid grid-cols-4 gap-y-4">
                    <div className="grid grid-cols-subgrid col-span-4 text-xs">
                      <div className="font-semibold col-span-2">Category</div>
                      <div className="flex justify-between">
                        <div>Average</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Weight</div>
                      </div>
                    </div>
                    {course.categories.map((category, i) => (
                      <div key={i} className="bg-zinc-700/30 p-4 rounded-md grid grid-cols-subgrid col-span-4">
                        <div className="text-lg font-semibold col-span-2">{category.name}</div>
                        <div className="flex justify-between">
                          <div>{category.terms.q2.average}%</div>
                        </div>
                        <div className="flex justify-between">
                          <div>{category.terms.q2.weight}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>loading skeleton</>
              )}
            </TabPanel>
            <TabPanel>
              {course ? (
                <div>
                  <div className="grid grid-cols-4 gap-y-4">
                    <div className="grid grid-cols-subgrid col-span-4 text-xs">
                      <div className="font-semibold col-span-2">Category</div>
                      <div className="flex justify-between">
                        <div>Average</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Weight</div>
                      </div>
                    </div>
                    {course.categories.map((category, i) => (
                      <div key={i} className="bg-zinc-700/30 p-4 rounded-md grid grid-cols-subgrid col-span-4">
                        <div className="text-lg font-semibold col-span-2">{category.name}</div>
                        <div className="flex justify-between">
                          <div>{category.terms.q3.average}%</div>
                        </div>
                        <div className="flex justify-between">
                          <div>{category.terms.q3.weight}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>loading skeleton</>
              )}
            </TabPanel>
            <TabPanel>
              {course ? (
                <div>
                  <div className="grid grid-cols-4 gap-y-4">
                    <div className="grid grid-cols-subgrid col-span-4 text-xs">
                      <div className="font-semibold col-span-2">Category</div>
                      <div className="flex justify-between">
                        <div>Average</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Weight</div>
                      </div>
                    </div>
                    {course.categories.map((category, i) => (
                      <div key={i} className="bg-zinc-700/30 p-4 rounded-md grid grid-cols-subgrid col-span-4">
                        <div className="text-lg font-semibold col-span-2">{category.name}</div>
                        <div className="flex justify-between">
                          <div>{category.terms.q4.average}%</div>
                        </div>
                        <div className="flex justify-between">
                          <div>{category.terms.q4.weight}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>loading skeleton</>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <TabGroup className="mt-3">
          <TabList className="flex gap-4">
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q1
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q2
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q3
            </Tab>
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Q4
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
            <TabPanel>Content 3</TabPanel>
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  )
}

function LinkPreview({ link }:{ link: { name: string, url: string } }) {
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(false);

  return (
    <>
      <button className="block py-2 px-6 rounded-full border border-zinc-400 whitespace-nowrap flex-nowrap transition hover:border-amber-400 hover:text-amber-300" onClick={() => setOpen(true)}>
        <span className="flex gap-2 items-center">{link.name}</span>
      </button>

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
          className="w-full max-w-lg transition duration-300 delay-300 data-[closed]:delay-0 data-[closed]:opacity-0 space-y-4 bg-zinc-900/80 rounded-lg p-12">
            <div className="flex justify-between">
              <DialogTitle className="text-xl font-bold">Link Details</DialogTitle>
              <button className="underline underline-offset-4" onClick={() => setOpen(false)}>
                <HiXMark className="size-8" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="linkname">Link Name</label>
                <input type="text" disabled={!editable} value={link.name} id="linkname" className="w-full !outline-none !ring-0 !border-t-0 !border-x-0  mt-3 bg-transparent border-b-2 border-amber-400 invalid:!border-red-400 focus:border-amber-200 active:border-amber-200 disabled:!border-zinc-400 transition" />
              </div>
              <div>
                <label htmlFor="linkurl">Link URL</label>
                <input type="url" disabled={!editable} value={link.url} id="linkurl" className="w-full !outline-none !ring-0 !border-t-0 !border-x-0  mt-3 bg-transparent border-b-2 border-amber-400 invalid:!border-red-400 focus:border-amber-200 active:border-amber-200 disabled:!border-zinc-400 transition" />
              </div>
              <div className="flex justify-between">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="bg-amber-400/30 px-2 py-1 rounded" onClick={() => setOpen(false)}>Go to link</a>
                <button className="bg-sky-400/30 px-4 py-1 rounded">Edit (not done yet)</button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

function AddLink({ section, year, update }: { section: string, year: 'previous' | 'current', update: Dispatch<SetStateAction<Course>> }) {
  const [open, setOpen] = useState(false);

  const handleAddLink = () => {
    const linkname = (document.getElementById('linkname') as HTMLInputElement).value;
    const linkurl = (document.getElementById('linkurl') as HTMLInputElement).value;

    const courses = (secureLocalStorage.getItem('courses') as StoredCourses);

    if (!(courses[year]?.find((c) => c.sectionNumber === section) as DetailedCourse)?.links) {
      (courses[year]?.find((c) => c.sectionNumber === section) as DetailedCourse).links = [];
    }

    (courses[year]?.find((c) => c.sectionNumber === section) as DetailedCourse).links.push({
      name: linkname,
      url: linkurl,
    });
    secureLocalStorage.setItem('courses', courses);

    // add to airtable
    fetch('/api/airtable/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
        fields: {
          coursesJSON: JSON.stringify(courses),
        }
      })
    }).then(async (data) => {
      if (data.ok) {
        update((secureLocalStorage.getItem('courses') as StoredCourses)[year].find((c) => c.sectionNumber === section) as Course);
        setOpen(false);
      }
    })
  }
  return (
    <>
      <div className="flex gap-4">
        <button className="underline underline-offset-4 text-amber-400" onClick={() => setOpen(true)}>Add a link</button>
      </div>

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
          className="w-full max-w-lg transition duration-300 delay-300 data-[closed]:delay-0 data-[closed]:opacity-0 space-y-4 bg-zinc-900/80 rounded-lg p-12">
            <DialogTitle className="font-bold">Add a link</DialogTitle>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="linkname">Link Name</label>
                <input type="text" id="linkname" className="w-full !outline-none !ring-0 !border-t-0 !border-x-0  mt-3 bg-transparent border-b-2 border-amber-400 focus:border-amber-200 active:border-amber-200 transition" />
              </div>
              <div>
                <label htmlFor="linkurl">Link URL</label>
                <input type="url" name="" id="linkurl" className="w-full !outline-none !ring-0 !border-t-0 !border-x-0  mt-3 bg-transparent border-b-2 border-amber-400 invalid:!border-red-400 focus:border-amber-200 active:border-amber-200 transition" />
              </div>
              <div className="flex justify-between">

                <button className="underline underline-offset-4 decoration-wavy text-amber-400" onClick={handleAddLink}>add to links</button>
                <button className="underline underline-offset-4 decoration-wavy" onClick={() => setOpen(false)}>cancel</button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}