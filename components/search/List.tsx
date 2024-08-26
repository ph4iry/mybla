/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Item } from "@/types/Listings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FavoriteButton from "../page/FavoriteButton";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import secureLocalStorage from "react-secure-storage";

export default function List({ allFilters, sheet }: { allFilters: ((listItem: Item) => boolean)[], sheet: Item[] }) {
  const filter = (listItem: Item) => allFilters.map(fn => fn(listItem)).every(b => b);
  const [favs, setFavs] = useState<string[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  useEffect(() => {
    if (!(secureLocalStorage.getItem('favorites') as string[] | null)) {
      secureLocalStorage.setItem('favorites', []);
    }

    setFavs(secureLocalStorage.getItem('favorites') as string[])
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex gap-2">
        
      </div>
      <div id="course-list" className={classNames({
        "mt-4 shrink-0 grow min-w-full max-h-screen overflow-y-scroll rounded": true,
        "flex flex-col gap-3": layout === 'list',
        "grid md:grid-cols-3 grid-cols-2": layout === 'grid', 
      })}>
        {sheet.filter(i => filter(i)).sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            return 0;
        }).map((item, i) => (
          <ListItem key={i} data={item} favorites={favs} updateAllFavorites={setFavs} layout={layout}/>
        ))}

      {sheet.filter(i => filter(i)).length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          No courses found from search.
        </div>
      )}
      </div>
    </div>
  )
}

function ListItem({ data, favorites, updateAllFavorites, layout }: { data: Item, favorites: string[], updateAllFavorites: Dispatch<SetStateAction<string[]>>, layout: 'grid' | 'list' }) {
  const [groupHover, setGroupHover] = useState(false);

  return (
    layout === 'list' ? (
      <div className="flex p-2 md:px-3 md:py-6 shadow-md bg-zinc-50 dark:bg-zinc-700 rounded-md">
        <div className="flex flex-col justify-center items-center max-w-min pl-2 pr-4 self-center font-bold text-3xl text-center">
          <span className="relative group block min-w-[5ch] w-fit max-w-[7ch] text-2xl md:text-3xl" onMouseEnter={() => setGroupHover(true)} onMouseLeave={() => setGroupHover(false)}>
            <span className="w-full text-center whitespace-nowrap flex justify-center gap-1 items-center">
              <span className="opacity-25 text-xl"># </span>{data.code}
            </span>
            <span className="block w-full text-center absolute top-0 left-0 group-hover:-translate-y-3 opacity-0 translate-y-6 group-hover:opacity-100 transition text-xs uppercase dark:text-white/40 text-black/40 font-normal leading-none whitespace-nowrap">course #</span>
          </span>
          <FavoriteButton data={data} favorites={favorites} updateAllFavorites={updateAllFavorites} />
        </div>
        <div className="block">
          <a href={`/catalog/courses/${data.code}`} className="text-xl md:text-2xl underline font-semibold">{data.name}</a>
          <div className="flex gap-3 text-xs font-medium mt-2 flex-wrap md:flex-nowrap">
            <span className={`uppercase px-3 py-1 rounded-full ${getSubjectColor(data.subject)}`}>{data.subject}</span>
            <span className={`uppercase px-3 py-1 rounded-full ${getRigorColor(data.rigor)}`}>{data.rigor}</span>
              {data.grades?.map((g, i) => (
                <span key={i} className={`uppercase px-3 py-1 rounded-full bg-fuchsia-400/30 ${getGradeColor(`${g}`)}`}>{g}</span>
              ))}
          </div>
          
        </div>
      </div>
    ) : (
      <div className="flex p-2 md:px-3 md:py-6 shadow-md bg-zinc-50 dark:bg-zinc-700 rounded-md">
        <div className="flex flex-col justify-center items-center max-w-min pl-2 pr-4 self-center font-bold text-3xl text-center">
          <span className="relative group block min-w-[5ch] w-fit max-w-[7ch] text-2xl md:text-3xl" onMouseEnter={() => setGroupHover(true)} onMouseLeave={() => setGroupHover(false)}>
            <span className="w-full text-center whitespace-nowrap flex justify-center gap-1 items-center">
              <span className="opacity-25 text-xl"># </span>{data.code}
            </span>
            <span className="block w-full text-center absolute top-0 left-0 group-hover:-translate-y-3 opacity-0 translate-y-6 group-hover:opacity-100 transition text-xs uppercase dark:text-white/40 text-black/40 font-normal leading-none whitespace-nowrap">course #</span>
          </span>
          <FavoriteButton data={data} favorites={favorites} updateAllFavorites={updateAllFavorites} />
        </div>
        <div className="block">
          <a href={`/catalog/courses/${data.code}`} className="text-xl md:text-2xl underline font-semibold">{data.name}</a>
          <div className="flex gap-3 text-xs font-medium mt-2 flex-wrap md:flex-nowrap">
            <span className={`uppercase px-3 py-1 rounded-full ${getSubjectColor(data.subject)}`}>{data.subject}</span>
            <span className={`uppercase px-3 py-1 rounded-full ${getRigorColor(data.rigor)}`}>{data.rigor}</span>
              {data.grades?.map((g, i) => (
                <span key={i} className={`uppercase px-3 py-1 rounded-full bg-fuchsia-400/30 ${getGradeColor(`${g}`)}`}>{g}</span>
              ))}
          </div>
          
        </div>
      </div>
    )
  )
}

function getSubjectColor(subject: "English" | "Math" | "Science" | "History" | "Classics/MFL" | "Art") {
  switch (subject) {
    case "English":
      return 'bg-amber-400/30';
    case "Math":
      return 'bg-blue-500/30';
    case "Science":
      return 'bg-emerald-400/30';
    case "History":
      return 'bg-amber-700/30';
    case "Classics/MFL":
      return 'bg-violet-400/30';
    case "Art":
      return 'bg-pink-400/30';
  }
}

function getRigorColor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return 'bg-sky-400/30';
    case "Honors": return 'bg-emerald-30';
    case "Regular": return 'bg-zinc-400/30';
  }
}

function getGradeColor(grade: `${7 | 8 | 9 | 10 | 11 | 12}`) {
  switch(grade) {
    case '7': return 'bg-amber-400/30';
    case '8': return 'bg-orange-400/30';
    case '9': return 'bg-purple-400/30';
    case '10': return 'bg-green-400/30';
    case '11': return 'bg-blue-400/30';
    case '12': return 'bg-red-400/30';
  }
}