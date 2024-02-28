'use client';
import React, { ChangeEvent, useState } from "react";
import { FilterSet, Item } from "@/types/Listings";
import List from "./List";
import Filter from "./filters/Filter";

const SubjectMap = new Map()
  .set('english', 'English')
  .set('math', 'Math')
  .set('science', 'Science')
  .set('history', 'History')
  .set('classics-mfl', 'Classics/MFL')
  .set('art', 'Art');

export default function Filters({ sheet }: { sheet: Item[] }) {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<FilterSet>([
    (i: Item) => (
      i.name.toLowerCase().includes(searchValue.toLowerCase()) || i.code.toLowerCase().includes(searchValue.toLowerCase())
    )
  ]);

  const handleInputChange = (v: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(v.target.value);
    const x = filters;
    x[0] = (i: Item) => (
      i.name.toLowerCase().includes(searchValue.toLowerCase()) || i.code.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilters(x.slice());
  }

  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-bold whitespace-nowrap">Filter by:</span>
          <Filter
            name="Subject"
            index={1}
            condition={(i: Item, batch: [string, boolean][]) => {
              if (batch.length === 0) return true;
              return batch.map(b => b[0] === i.subject).includes(true);
            }}
            previous={filters}
            setState={setFilters}
            options={Array.from(SubjectMap.values())}
          />
          <Filter
            name="Rigor"
            index={2}
            condition={(i: Item, batch: [string, boolean][]) => {
              if (batch.length === 0) return true;
              return batch.map(b => b[0] === i.rigor).includes(true);
            }}
            previous={filters}
            setState={setFilters}
            options={['AP', 'Honors', 'Regular']}
          />
          <Filter
            name="Grade"
            index={3}
            condition={(i: Item, batch: [string, boolean][]) => {
              if (batch.length === 0) return true;
              return batch.map(b => i.grades?.map(g => `${g}`)?.includes(b[0])).includes(true);
            }}
            previous={filters}
            setState={setFilters}
            options={['7', '8', '9', '10', '11', '12']}
          />
        </div>
        <div className="grow flex rounded-md bg-zinc-200/50  dark:bg-zinc-700 dark:text-white dark:placeholder:text-white/50">
          <input type="text" name="list-search" id="list-search" placeholder="Search by course code/name..." className="grow w-full outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 border-0 bg-transparent dark:placeholder:text-white/80 placeholder:text-zinc-400" onChange={handleInputChange} />

        </div>
      </div>
      <List sheet={sheet} allFilters={filters}/>
    </>
  )
}