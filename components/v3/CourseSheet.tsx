'use client';
import { CourseListing } from "@/types/Listings";
import { useState } from "react";
import { FaStar, FaExpand, FaArrowUpRightFromSquare } from "react-icons/fa6";
import CoursePanel from "./CoursePanel";
import { AnimatePresence } from "motion/react";
import { colorTagByGrade, colorTagByRigor, colorTagBySubject } from "@/utils/colors";

export default function Sheet({ headers, data, filter }:{ headers: string[], data: CourseListing[], filter: (c: CourseListing) => boolean }) {
  const [course, setCourse] = useState<CourseListing | null>(null!);
  

  return (
    <div className="h-[80%] overflow-auto w-full rounded-xl border">
      <div className="relative rounded-t-xl w-full">
        <table className="md:block hidden border-spacing-8 rounded-t-xl rounded-xl w-full">
          <thead className="text-white sticky top-0 bg-stone-900 rounded-t-xl z-40 w-full">
            <tr className="text-left divide-x uppercase whitespace-nowrap">
              {/* <th className="text-center p-3">Star</th> */}
              <th className="p-3 text-center w-[10ch]">Course #</th>
              <th className="p-3">Course Title</th>
              <th className="p-3">Tags</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((_course, i) => (
              filter(_course) && <tr className=" hover:bg-stone-100/50 transition group divide-x" key={i}>
                {/* <td className="align-middle text-center p-2">
                  <button className="">
                    <FaStar className="size-7 text-zinc-400" />
                  </button>
                </td> */}
                <td className="align-middle p-2 text-center w-[10ch]">{_course.code}</td>
                <td className="align-middle py-2 px-4 h-full">
                  <div className="flex justify-between">
                    <div className="font-bold">{_course.name}</div>
                    <div className="flex gap-2">
                      <button onClick={() => {
                        setCourse(_course);
                      }} className="opacity-0 group-hover:opacity-100 transition py-1 px-2 bg-stone-100 rounded uppercase text-sm flex w-fit items-center gap-1">open <FaArrowUpRightFromSquare className="size-3" /></button>
                      
                    </div>
                  </div>
                </td>
                <td className="align-middle p-2 text-sm">
                  <div className="flex gap-2 items-center">
                    {_course.grades.map(((g, i) => (
                      !isNaN(g) && <div key={i} className={`size-7 rounded inline-flex items-center justify-center ${colorTagByGrade(g)}`}>
                        {g}
                      </div>
                    )))}
                    <span className={`h-7 inline-flex px-3 items-center justify-center rounded ${colorTagBySubject(_course.subject)}`}>{_course.subject}</span>
                    <span className={`h-7 inline-flex px-3 items-center justify-center rounded ${colorTagByRigor(_course.rigor)}`}>{_course.rigor}</span>
                  </div>
                </td>
              </tr>
            ))}
            {data.filter(filter).length === 0 && (
              <tr className="text-center">
                {/* <td className="align-middle p-2 text-center w-[10ch]">o</td>
                <td className="align-middle p-2 text-center w-[10ch]">a</td>
                <td className="align-middle p-2 text-center w-[10ch]">e</td> */}
                <td colSpan={3} className="p-4 text-stone-500">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="block md:hidden">
          {data.filter(_course => filter(_course)).map((_course, i) => (
            <div key={i} className="space-y-4 items-center p-4 border-b last:border-b-0 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="font-bold">{_course.name}</div>
                <div className="flex gap-2 items-center flex-wrap">
                  {_course.grades.map(((g, i) => (
                    !isNaN(g) && <div key={i} className={`size-7 rounded inline-flex items-center justify-center ${colorTagByGrade(g)}`}>
                      {g}
                    </div>
                  )))}
                  <span className={`h-7 inline-flex px-3 items-center justify-center rounded ${colorTagBySubject(_course.subject)}`}>{_course.subject}</span>
                  <span className={`h-7 inline-flex px-3 items-center justify-center rounded ${colorTagByRigor(_course.rigor)}`}>{_course.rigor}</span>
                </div>
              </div>
              <button onClick={() => {
                setCourse(_course);
              }} className="transition py-1 px-2 bg-amber-300/30 w-full justify-center rounded uppercase text-sm flex items-center gap-1 text-amber-600">View <FaArrowUpRightFromSquare className="size-3" /></button>
            </div>
          ))}
        </div>
      </div>
      <CoursePanel course={course} setCourse={setCourse} />
    </div>
  );
}

