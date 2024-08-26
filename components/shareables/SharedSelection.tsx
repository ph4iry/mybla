'use client';
import { Item } from '@/types/Listings';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

export default function SharedSelection({ sheet }:{sheet: Item[]}) {
  const params = useSearchParams();
  const courses: Item[] = (JSON.parse(decodeURI(params.get('courses')!)) as string[]).map(c => sheet.find(s => s.code === c)!);

  // const [view, setView] = useState<'sheet' | 'grid'>('sheet');
  return (
    <main className="w-full">
      <h1 className="text-3xl font-bold mb-3">{params.get('name') || 'Course Selection'}</h1>
      {/* <div className="flex gap-3 mb-3">

        <button><TableCellsIcon className="h-6" /></button>
        <button><Squares2X2Icon className="h-6" /></button>
      </div> */}
      <div className="w-full overflow-x-scroll md:overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="mb-2">
            <tr className="text-left dark:text-zinc-400 text-zinc-700">
              <th className="p-3 text-center whitespace-nowrap dark:bg-zinc-500/20 bg-zinc-200/60 rounded-tl-lg font-normal">Course #</th>
              <th className="p-3 dark:bg-zinc-500/20 bg-zinc-200/60 font-normal">Subject</th>
              <th className="p-3 md:w-full w-max dark:bg-zinc-500/20 bg-zinc-200/60 rounded-tr-lg font-normal">Course Title</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-500/30">
            {
              courses.map((course, i) => {
                const color = (() => {
                  switch(course.subject) {
                    case 'English': return "dark:bg-amber-400/10 bg-amber-400/20 dark:text-amber-400 text-amber-500"
                    case 'Math':return "dark:bg-blue-400/10 bg-blue-400/20 dark:text-blue-400 text-blue-500"
                    case 'Science': return "dark:bg-emerald-400/10 bg-emerald-400/20 dark:text-emerald-400 text-emerald-500"
                    case 'History': return "dark:bg-red-400/10 bg-red-400/20 dark:text-red-400 text-red-500"
                    case 'Classics/MFL': return "dark:bg-violet-400/10 bg-violet-400/20 dark:text-violet-400 text-violet-500"
                    case 'Art': return "dark:bg-rose-400/10 bg-rose-400/20 dark:text-rose-400 text-rose-500"
                  }
                })();
                
                return (
                  <tr key={i} className={`dark:hover:bg-zinc-600/30 dark:text-zinc-300 hover:text-black hover:bg-zinc-200/30`}>
                    <td className="p-3 text-center">{course.code}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1.5 rounded-full font-semibold ${color}`}>
                        {course.subject}
                      </span>
                    </td>
                    <td className="p-3 underline underline-offset-4 whitespace-nowrap"><a href={`/catalog/courses/${course.code}`} target="_blank" rel="noopener noreferrer">{course.name}</a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </main>
  )
}