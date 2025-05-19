'use client';
import { Opportunity } from "@/types/Listings";
import { useState } from "react";
import { FaStar, FaExpand, FaArrowUpRightFromSquare } from "react-icons/fa6";
import CoursePanel from "./CoursePanel";
import { AnimatePresence } from "motion/react";
import OpportunityPanel from "./OpportunityPanel";

export default function Sheet({ headers, data, filter }:{ headers: string[], data: Opportunity[], filter: (c: Opportunity) => boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  return (
    <div className="h-[85%] overflow-auto w-full rounded-xl border">
      <div className="relative rounded-t-xl">
        <table className="md:block hidden border-spacing-8 rounded-t-xl rounded-xl w-full">
          <thead className="text-white sticky top-0 bg-stone-900 rounded-t-xl z-40 w-full">
            {/* <tr className="text-left divide-x uppercase">
              <th className="text-center p-3">Star</th>
              <th className="p-3">Activity Name</th>
            </tr> */}
          </thead>
          <tbody className="bg-white">
            {data.filter(a => filter(a)).map((_activity, i) => (
              <tr className=" hover:bg-stone-100/50 transition group divide-x" key={i}>
                {/* <td className="align-middle text-center p-2">
                  <button className="">
                    <FaStar className="size-7 text-zinc-400" />
                  </button>
                </td> */}
                <td className="align-middle py-2 px-4 h-full">
                  <div className="flex gap-4 mb-2">
                    <div className="font-bold text-lg mb-2">{_activity.name}</div>
                    <button onClick={() => {
                      setOpportunity(_activity);
                      setExpanded(true);
                    }} className="opacity-0 group-hover:opacity-100 transition py-1 px-2 bg-stone-100 rounded uppercase text-sm flex w-fit items-center gap-1">open <FaArrowUpRightFromSquare className="size-3" /></button>
                  </div>
                  <div className="flex text-sm gap-2 flex-wrap mb-2">
                    {_activity.grades.map(((g, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-600 py-1 px-2 rounded-md">
                        {g}
                      </span>
                    )))}
                    {_activity.deadline.split(', ').map((deadline, i) => (
                      <span key={i} className="bg-blue-50 text-blue-600 py-1 px-2 rounded-md">{deadline}</span>
                    ))}
                    {_activity.dates.split(', ').map((program, i) => (
                      <span key={i} className="bg-violet-50 text-violet-600 py-1 px-2 rounded-md">{program}</span>
                    ))}
                  </div>
                  <div className="flex text-sm gap-2 flex-wrap mb-2 items-center">
                    <span>Focus:</span>
                    {_activity.focus.map((goal, i) => (
                      <span key={i} className="bg-rose-50 text-rose-600 py-1 px-2 rounded-md">{goal}</span>
                    ))}
                  </div>
                  <div className="flex text-sm gap-2 flex-wrap mb-2 items-center">
                    <span>Type of programming:</span>
                    {_activity.programming.map((program, i) => (
                      <span key={i} className="bg-orange-50 text-orange-600 py-1 px-2 rounded-md">{program}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="block md:hidden">
          {data.filter(a => filter(a)).map((_activity, i) => (
            <div key={i} className="p-4">
              <div key={i} className="flex gap-4 mb-2">
                <div className="font-bold text-lg mb-2">{_activity.name}</div>
              </div>
              <div className="flex text-sm gap-2 flex-wrap mb-2">
                {_activity.grades.map(((g, i) => (
                  <span key={i} className="bg-emerald-50 text-emerald-600 py-1 px-2 rounded-md">
                    {g}
                  </span>
                )))}
                {_activity.deadline.split(', ').map((deadline, i) => (
                  <span key={i} className="bg-blue-50 text-blue-600 py-1 px-2 rounded-md">{deadline}</span>
                ))}
                {_activity.dates.split(', ').map((program, i) => (
                  <span key={i} className="bg-violet-50 text-violet-600 py-1 px-2 rounded-md">{program}</span>
                ))}
              </div>
              <div className="flex text-sm gap-2 flex-wrap mb-2 items-center">
                <span>Focus:</span>
                {_activity.focus.map((goal, i) => (
                  <span key={i} className="bg-rose-50 text-rose-600 py-1 px-2 rounded-md">{goal}</span>
                ))}
              </div>
              <div className="flex text-sm gap-2 flex-wrap mb-2 items-center">
                <span>Type of programming:</span>
                {_activity.programming.map((program, i) => (
                  <span key={i} className="bg-orange-50 text-orange-600 py-1 px-2 rounded-md truncate">{program}</span>
                ))}
              </div>
              <button onClick={() => {
                setOpportunity(_activity);
                setExpanded(true);
              }} className="transition w-full py-1 px-2 bg-stone-100 rounded uppercase text-sm flex items-center gap-1 justify-center">open <FaArrowUpRightFromSquare className="size-3" /></button>
            </div>
          ))}
        </div>
      </div>
      <OpportunityPanel opportunity={opportunity} setOpportunity={setOpportunity} />
    </div>
  );
}