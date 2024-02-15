/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Item } from "@/types/Listings";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classNames from "classnames";

export default function List({ allFilters, sheet }: { allFilters: ((listItem: Item) => boolean)[], sheet: Item[] }) {
  const filter = (listItem: Item) => allFilters.map(f => f(listItem)).every(b => b);
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
      </div>
    </div>
  )
}

function ListItem({ data, favorites, updateAllFavorites }: { data: Item, favorites: string[], updateAllFavorites: Dispatch<SetStateAction<string[]>> }) {
  const [favorited, setFavorited] = useState(favorites.includes(data.code));

  useEffect(() => {
    setFavorited(
      (JSON.parse(localStorage.getItem('favorites')!) as string[]).includes(data.code)
    )
  })

  const handleClick = () => {
    console.log('before edits: ', localStorage.getItem('favorites'))
    if (favorited) {
      const arr = favorites;
      arr.splice(arr.indexOf(data.code), 1);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )
      updateAllFavorites(arr);
    } else {
      const arr = favorites;
      arr.push(data.code);

      console.log(arr);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )
      updateAllFavorites(arr);
    }
    setFavorited(!favorited);
    console.log('after edits: ', localStorage.getItem('favorites'))
  }

  return (
    <div className="flex p-3 shadow-md bg-zinc-50 dark:bg-zinc-700 rounded-md">
      <div className="block max-w-min pl-2 pr-4 self-center font-bold text-3xl text-center">
        <span className="block">
          {data.code}
        </span>
        <button className="inline group hover:scale-125 transition" onClick={handleClick}>
          <HeartIcon
            className={classNames({
              "h-8 w-8 inline": true,
              "text-zinc-400": !favorited,
              "text-rose-400": favorited
            })}
          />
        </button>
      </div>
      <div className="block">
        <a href={`/catalog/courses/${data.code}`} className="text-2xl underline font-semibold">{data.name}</a>
        <div className="flex gap-3 text-xs font-medium mt-2">
          <span className={`uppercase px-3 py-1 rounded-full ${getSubjectColor(data.subject)}`}>{data.subject}</span>
          <span className={`uppercase px-3 py-1 rounded-full ${getRigorColor(data.rigor)}`}>{data.rigor}</span>
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