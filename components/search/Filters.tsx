'use client';
import React, { ChangeEvent, Dispatch, Fragment, SetStateAction, useState } from "react";
import { FilterSet, Item } from "@/types/Listings";
import List from "./List";
import { Menu, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi2';

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
        <div className="flex gap-2 items-center w-full overflow-y-visible overflow-x-scroll">
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


type FilterOptions = {
  name: string,
  index: number,
  condition: (i: Item, batch: [string, boolean][]) => boolean,
  previous: ((i: Item) => boolean)[]
  setState: Dispatch<SetStateAction<((i: Item) => boolean)[]>>,
  options: string[]
}
function Filter({ name, index, previous,condition, setState, options } : FilterOptions) {
  const [values, setValues] = useState<[string, boolean][]>(options.map((o) => [o, false]));
  const [toggles, setToggles] = useState([...options].map((o: string) => ({
    text: o,
    enabled: false
  }))); 
  const clickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    let targetedValue = values.findIndex((v) => v[0] === (e.target as HTMLInputElement).name as string)!
    const vals = values;
    vals[targetedValue][1] = !vals[targetedValue][1];

    setValues(vals);
    const valuesToCheck = values.filter(v => v[1]);

    const x = previous;
    x[index]= (i: Item) => condition(i, valuesToCheck);

    setState(x.slice());
  }

  const enabledValues: string[] = (() => {
    const res: string[] = [];
    values.forEach((v: [string, boolean]) => {
      if (v[1]) res.push(v[0]);
    });
    return res;
  })();

  const buttonDisplay = (() => {
    if (enabledValues.length > 0) {
      if (enabledValues.length === 1) {
        return enabledValues[0];
      } else {
        return `${enabledValues[0]} +${enabledValues.length - 1}`
      }
    } else {
      return name;
    }
  })();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className={`
            ${open ? 'dark:text-white' : 'dark:text-white/90 text-zinc-900/90'}
            group inline-flex items-center rounded-md bg-zinc-400/50 dark:bg-zinc-700 px-3 py-2 text-base font-medium hover:text-zinc-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 whitespace-nowrap`}>
            <span>{buttonDisplay}</span>
            <HiChevronDown
              className={`${open ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-600/50 dark:text-zinc-300/50'}
                ml-2 h-5 w-5 transition duration-150 ease-in-out dark:group-hover:text-zinc-300/80 stroke-2`}
              aria-hidden="true"
            />
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-2"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-2"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="p-4 translate-y-2 rounded-md absolute z-10 bg-white dark:bg-zinc-600 shadow-md">
              <div className="flex flex-col gap-3">
                {options.map((o, i) => (
                  <FilterToggle
                    key={i}
                    content={o}
                    allToggles={toggles}
                    updateToggle={setToggles}
                    handler={clickHandler}
                  />
                ))}
              </div>
            </PopoverPanel>
          </Transition>

        </>
      )}
    </Popover>
  )
}

function FilterToggle({ handler, content, allToggles, updateToggle }: {handler: (e: React.MouseEvent<HTMLInputElement>) => void, content: string, allToggles: {
  text: string,
  enabled: boolean
}[], updateToggle: Dispatch<SetStateAction<{
  text: string,
  enabled: boolean
}[]>> }) {
  const [enabled, setEnabled] = useState(false);

  const updateCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    handler(e);
    const thisCheckbox = allToggles.findIndex(t => t.text === content)!;
    updateToggle(
      allToggles.toSpliced(thisCheckbox, 1, {
        text: content,
        enabled: !allToggles[thisCheckbox].enabled,
      })
    );
  }

  const isChecked = allToggles.find(t => t.text === content)!.enabled;
  return (
    <div className="flex flex-nowrap p-1">
       <label className="text-base whitespace-nowrap" >
          <input type="checkbox" name={content} className="w-6 h-6 text-xs py-1 px-2 rounded transition mr-3" checked={isChecked} onClick={(e) => { updateCheckbox(e)}} />
          {content}
        </label>
    </div>

  )
}