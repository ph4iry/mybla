'use client';
import { Opportunity } from "@/types/Listings";
import { opportunityTag } from "@/utils/colors";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowUpRightFromSquare, FaChevronRight, FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import OpportunityPanel from "./OpportunityPanel";
import { seasons } from "@/utils/opportunities";

type SortKey = 'name' | 'grades';

const MAX_TAGS = 4;

const sortValue = (o: Opportunity, key: SortKey) => {
  if (key === 'grades') {
    const grades = o.grades.filter(g => !isNaN(g));
    return grades.length ? Math.min(...grades) : null;
  }
  return o.name.toLowerCase();
}

const tag = "h-5 xl:h-6 inline-flex px-1.5 xl:px-2 items-center rounded text-[11px] xl:text-[13px] leading-none whitespace-nowrap";

function GradeTags({ grades }:{ grades: number[] }) {
  const sorted = Array.from(new Set(grades.filter(g => !isNaN(g)))).sort((a, b) => a - b);
  return <>{sorted.map((g) => <span key={g} className={`${tag} w-5 xl:w-6 px-0 xl:px-0 justify-center ${opportunityTag.grade}`}>{g}</span>)}</>;
}

function Tags({ items, color }:{ items: string[], color: string }) {
  return <>{items.filter(Boolean).map((item, i) => <span key={i} className={`${tag} ${color}`}>{item}</span>)}</>;
}

function TopicTags({ opportunity }:{ opportunity: Opportunity }) {
  const focus = opportunity.focus.filter(Boolean);
  const all = [
    ...focus.map(t => ({ t, color: opportunityTag.focus })),
    // programming often repeats a focus area word for word
    ...opportunity.programming.filter(t => t && !focus.includes(t)).map(t => ({ t, color: opportunityTag.programming })),
  ];
  const hidden = all.length - MAX_TAGS;
  return (
    <div className="flex gap-1 flex-wrap">
      {all.slice(0, MAX_TAGS).map(({ t, color }, i) => (
        <span key={i} title={t} className={`inline-block h-5 xl:h-6 px-1.5 xl:px-2 rounded text-[11px] xl:text-[13px] leading-5 xl:leading-6 max-w-[24ch] truncate ${color}`}>{t}</span>
      ))}
      {hidden > 0 && <span className={`${tag} bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400`}>+{hidden}</span>}
    </div>
  );
}

export default function Sheet({ headers, data, filter }:{ headers: string[], data: Opportunity[], filter: (c: Opportunity) => boolean }) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [sort, setSort] = useState<{ key: SortKey, dir: 1 | -1 } | null>(null);

  const rows = useMemo(() => {
    const filtered = data.filter(filter);
    if (!sort) return filtered;
    return [...filtered].sort((a, b) => {
      const x = sortValue(a, sort.key), y = sortValue(b, sort.key);
      if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1;
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [data, filter, sort]);

  const tableRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpportunity(null), []);
  const index = opportunity ? rows.indexOf(opportunity) : -1;

  // keep the peeked row visible while stepping through with prev/next
  useEffect(() => {
    tableRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [opportunity]);

  const toggleSort = (key: SortKey) => setSort((s) => {
    if (!s || s.key !== key) return { key, dir: 1 };
    if (s.dir === 1) return { key, dir: -1 };
    return null;
  });

  const th = "px-3 py-2.5 font-semibold uppercase tracking-wide text-left border-b border-r border-stone-700";
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

  const cell = "px-3 py-2 border-b border-r border-stone-200 dark:border-stone-800 align-top";

  return (
    <div className="h-full flex flex-col w-full rounded-lg border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900">
      <div ref={tableRef} className="flex-1 min-h-0 overflow-auto fancy-scrollbar">
        <table className="w-full text-sm xl:text-base border-separate border-spacing-0">
          <thead className="sticky top-0 z-30 bg-stone-900 dark:bg-stone-800 text-white text-xs xl:text-sm">
            <tr>
              {header('Opportunity', 'name')}
              {header('Grades', 'grades', 'hidden md:table-cell w-px')}
              <th className={`${th} hidden md:table-cell w-36`}>Season</th>
              <th className={`${th} hidden md:table-cell w-32`}>Deadline</th>
              <th className={`${th} hidden lg:table-cell w-[42%]`}>Focus &amp; Programming</th>
              <th className="w-10 md:w-20 border-b border-stone-700"><span className="sr-only">Open</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_activity, i) => (
              <tr
                key={`${_activity.name}-${i}`}
                tabIndex={0}
                data-peek-row
                data-selected={opportunity === _activity}
                onClick={() => setOpportunity(_activity)}
                onKeyDown={(e) => { if (e.key === 'Enter') setOpportunity(_activity) }}
                className={`group cursor-pointer transition-colors even:bg-stone-50/70 dark:even:bg-white/[0.025] hover:bg-slate-100 dark:hover:bg-slate-400/10 focus:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-400/10 ${opportunity === _activity ? '!bg-slate-200/70 dark:!bg-slate-400/15' : ''}`}
              >
                <td className={cell}>
                  <div className="font-semibold text-stone-900 dark:text-stone-100 leading-snug">{_activity.name}</div>
                  {/* timing columns collapse under the name on small screens */}
                  <div className="md:hidden mt-1.5 flex gap-x-3 gap-y-1 flex-wrap items-center text-[11px] text-stone-400">
                    <span className="inline-flex gap-1 flex-wrap"><GradeTags grades={_activity.grades} /></span>
                    <span className="inline-flex gap-1 flex-wrap items-center">Season <Tags items={seasons(_activity.dates)} color={opportunityTag.season} /></span>
                    <span className="inline-flex gap-1 flex-wrap items-center">Deadline <Tags items={seasons(_activity.deadline)} color={opportunityTag.deadline} /></span>
                  </div>
                  <div className="lg:hidden mt-1.5">
                    <TopicTags opportunity={_activity} />
                  </div>
                </td>
                <td className={`${cell} hidden md:table-cell`}>
                  <div className="flex gap-1"><GradeTags grades={_activity.grades} /></div>
                </td>
                <td className={`${cell} hidden md:table-cell`}>
                  <div className="flex gap-1 flex-wrap"><Tags items={seasons(_activity.dates)} color={opportunityTag.season} /></div>
                </td>
                <td className={`${cell} hidden md:table-cell`}>
                  <div className="flex gap-1 flex-wrap"><Tags items={seasons(_activity.deadline)} color={opportunityTag.deadline} /></div>
                </td>
                <td className={`${cell} hidden lg:table-cell`}>
                  <TopicTags opportunity={_activity} />
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
                <td colSpan={6} className="p-8 text-center text-stone-500 dark:text-stone-400">
                  No opportunities match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-1.5 text-xs xl:text-sm text-stone-500 dark:text-stone-400">
        Showing <span className="font-semibold text-stone-700 dark:text-stone-300">{rows.length}</span> of {data.length} opportunities
      </div>
      <OpportunityPanel
        opportunity={opportunity}
        onClose={close}
        onPrev={index > 0 ? () => setOpportunity(rows[index - 1]) : undefined}
        onNext={index >= 0 && index < rows.length - 1 ? () => setOpportunity(rows[index + 1]) : undefined}
        position={index >= 0 ? `${index + 1} of ${rows.length}` : undefined}
      />
    </div>
  );
}
