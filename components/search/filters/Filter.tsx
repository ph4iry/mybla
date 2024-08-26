import { FilterOptions, Item } from "@/types/Listings";
import { Popover, Transition } from "@headlessui/react";
import { HiChevronDown } from 'react-icons/hi2';
import { useState, Fragment } from "react";
import FilterToggle from "./FilterToggle";

export default function Filter({ name, index, previous,condition, setState, options } : FilterOptions) {
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
          <Popover.Button className={`
            ${open ? 'dark:text-white' : 'dark:text-white/90 text-zinc-900/90'}
            group inline-flex items-center rounded-md bg-zinc-400/50 dark:bg-zinc-700 px-3 py-2 text-base font-medium hover:text-zinc-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 whitespace-nowrap`}>
            <span>{buttonDisplay}</span>
            <HiChevronDown
              className={`${open ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-600/50 dark:text-zinc-300/50'}
                ml-2 h-5 w-5 transition duration-150 ease-in-out dark:group-hover:text-zinc-300/80 stroke-2`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-2"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-2"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="p-4 translate-y-2 rounded-md absolute z-10 bg-white dark:bg-zinc-600 shadow-md">
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
            </Popover.Panel>
          </Transition>

        </>
      )}
    </Popover>
  )
}