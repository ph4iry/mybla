'use client';
import { CourseListing } from "@/types/Listings";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowUpRightFromSquare, FaChevronRight, FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import CoursePanel from "./CoursePanel";
import { colorTagByGrade, colorTagByRigor, colorTagBySubject } from "@/utils/colors";

type SortKey = 'code' | 'name' | 'subject' | 'rigor' | 'grades';

const sortValue = (c: CourseListing, key: SortKey) => {
  if (key === 'grades') {
    const grades = c.grades.filter(g => !isNaN(g));
    return grades.length ? Math.min(...grades) : null;
  }
  return c[key].toLowerCase();
}

export default function Sheet({ headers, data, filter }:{ headers: string[], data: CourseListing[], filter: (c: CourseListing) => boolean }) {
  const [course, setCourse] = useState<CourseListing | null>(null);
  const [sort, setSort] = useState<{ key: SortKey, dir: 1 | -1 } | null>(null);

  const rows = useMemo(() => {
    const filtered = data.filter(filter);
    if (!sort) return filtered;
    return [...filtered].sort((a, b) => {
      const x = sortValue(a, sort.key), y = sortValue(b, sort.key);
      // rows missing a value always sink to the bottom
      if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1;
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [data, filter, sort]);

  // asc -> desc -> original order
  const tableRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setCourse(null), []);
  const index = course ? rows.indexOf(course) : -1;

  // keep the peeked row visible while stepping through with prev/next
  useEffect(() => {
    tableRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [course]);

  const toggleSort = (key: SortKey) => setSort((s) => {
    if (!s || s.key !== key) return { key, dir: 1 };
    if (s.dir === 1) return { key, dir: -1 };
    return null;
  });

  const header = (label: string, sortKey: SortKey, className = '') => {
    const Icon = sort?.key !== sortKey ? FaSort : sort.dir === 1 ? FaSortUp : FaSortDown;
    return (
      <th key={sortKey} className={`p-0 font-semibold border-b border-r border-stone-700 ${className}`} aria-sort={sort?.key === sortKey ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
        <button onClick={() => toggleSort(sortKey)} className="w-full flex items-center gap-1.5 px-3 py-2.5 uppercase tracking-wide text-left hover:bg-stone-800 dark:hover:bg-stone-700 transition">
          {label}
          <Icon className={`size-3 shrink-0 ${sort?.key === sortKey ? 'text-amber-400' : 'text-stone-500 dark:text-stone-400'}`} />
        </button>
      </th>
    );
  };

  const cell = "px-3 py-2 border-b border-r border-stone-200 dark:border-stone-800 align-middle";
  const tag = "h-6 xl:h-7 inline-flex px-2 items-center justify-center rounded text-xs xl:text-sm whitespace-nowrap";

  return (
    <div className="h-full flex flex-col w-full rounded-lg border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900">
      <div ref={tableRef} className="flex-1 min-h-0 overflow-auto fancy-scrollbar">
        <table className="w-full text-sm xl:text-base border-separate border-spacing-0">
          <thead className="sticky top-0 z-30 bg-stone-900 dark:bg-stone-800 text-white text-xs xl:text-sm">
            <tr>
              <th className="hidden lg:table-cell w-12 px-3 py-2.5 font-semibold text-stone-500 dark:text-stone-400 border-b border-r border-stone-700 text-right">#</th>
              {header('Code', 'code', 'w-16 md:w-20')}
              {header('Course Title', 'name')}
              {header('Subject', 'subject', 'hidden md:table-cell w-36')}
              {header('Level', 'rigor', 'hidden md:table-cell w-28')}
              {header('Grades', 'grades', 'hidden md:table-cell w-44')}
              <th className="w-12 md:w-24 border-b border-stone-700"><span className="sr-only">Open</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_course, i) => (
              <tr
                key={`${_course.code}-${i}`}
                tabIndex={0}
                data-peek-row
                data-selected={course === _course}
                onClick={() => setCourse(_course)}
                onKeyDown={(e) => { if (e.key === 'Enter') setCourse(_course) }}
                className={`group cursor-pointer transition-colors even:bg-stone-50/70 dark:even:bg-white/[0.025] hover:bg-slate-100 dark:hover:bg-slate-400/10 focus:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-400/10 ${course === _course ? '!bg-slate-200/70 dark:!bg-slate-400/15' : ''}`}
              >
                <td className={`${cell} hidden lg:table-cell text-right text-xs xl:text-sm text-stone-400 tabular-nums`}>{i + 1}</td>
                <td className={`${cell} font-mono text-xs xl:text-sm text-stone-600 dark:text-stone-400 tabular-nums whitespace-nowrap`}>{_course.code}</td>
                <td className={cell}>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">{_course.name}</div>
                  {/* columns collapse into tags under the title on small screens */}
                  <div className="md:hidden flex gap-1.5 items-center flex-wrap mt-1.5">
                    <span className={`${tag} ${colorTagBySubject(_course.subject)}`}>{_course.subject}</span>
                    <span className={`${tag} ${colorTagByRigor(_course.rigor)}`}>{_course.rigor}</span>
                    {_course.grades.map((g, j) => (
                      !isNaN(g) && <span key={j} className={`${tag} w-6 xl:w-7 px-0 ${colorTagByGrade(g)}`}>{g}</span>
                    ))}
                  </div>
                </td>
                <td className={`${cell} hidden md:table-cell`}>
                  <span className={`${tag} ${colorTagBySubject(_course.subject)}`}>{_course.subject}</span>
                </td>
                <td className={`${cell} hidden md:table-cell`}>
                  <span className={`${tag} ${colorTagByRigor(_course.rigor)}`}>{_course.rigor}</span>
                </td>
                <td className={`${cell} hidden md:table-cell`}>
                  <div className="flex gap-1">
                    {_course.grades.map((g, j) => (
                      !isNaN(g) && <span key={j} className={`${tag} w-6 xl:w-7 px-0 ${colorTagByGrade(g)}`}>{g}</span>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-2 border-b border-stone-200 dark:border-stone-800 align-middle text-center">
                  <span className="hidden md:inline-flex opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition py-1 px-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded uppercase text-xs xl:text-sm items-center gap-1 text-stone-700 dark:text-stone-300">
                    Open <FaArrowUpRightFromSquare className="size-2.5" />
                  </span>
                  <FaChevronRight className="md:hidden size-3 text-stone-400 inline" />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-stone-500 dark:text-stone-400">
                  No courses match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-1.5 text-xs xl:text-sm text-stone-500 dark:text-stone-400">
        <span>Showing <span className="font-semibold text-stone-700 dark:text-stone-300">{rows.length}</span> of {data.length} courses</span>
      </div>
      <CoursePanel
        course={course}
        onClose={close}
        onPrev={index > 0 ? () => setCourse(rows[index - 1]) : undefined}
        onNext={index >= 0 && index < rows.length - 1 ? () => setCourse(rows[index + 1]) : undefined}
        position={index >= 0 ? `${index + 1} of ${rows.length}` : undefined}
      />
    </div>
  );
}
