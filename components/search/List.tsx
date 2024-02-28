/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Item } from "@/types/Listings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FavoriteButton from "../page/FavoriteButton";

export default function List({ allFilters, sheet }: { allFilters: ((listItem: Item) => boolean)[], sheet: Item[] }) {
  const filter = (listItem: Item) => allFilters.map(fn => fn(listItem)).every(b => b);
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }

    setFavs(JSON.parse(localStorage.getItem('favorites')!))
  }, []);
  return (
    <div className="w-full">
      <div id="course-list" className="flex flex-col gap-3 mt-4 shrink-0 grow min-w-full max-h-screen overflow-y-scroll rounded">
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
          <ListItem key={i} data={item} favorites={favs} updateAllFavorites={setFavs}/>
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

function ListItem({ data, favorites, updateAllFavorites }: { data: Item, favorites: string[], updateAllFavorites: Dispatch<SetStateAction<string[]>> }) {

  return (
    <div className="flex p-3 shadow-md bg-zinc-50 dark:bg-zinc-700 rounded-md">
      <div className="block max-w-min pl-2 pr-4 self-center font-bold text-3xl text-center">
        <span className="block">
          {data.code}
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