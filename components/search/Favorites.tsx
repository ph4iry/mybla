'use client';
import { Item } from "@/types/Listings";
import { useState, useEffect, Fragment } from "react";
import Card from "../home/Card";

const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export default function FavoriteCoursesSummary({ sheet }: { sheet: Item[] }) {
  const [favoritedCourses, setFavoritedCourses] = useState<string[]>([]);
  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }

    setFavoritedCourses((JSON.parse(localStorage.getItem('favorites')!) as string[]));
  }, []);

  const populatedFavorites = sheet.filter(item => favoritedCourses.includes(item.code));
  

  return (
    <div className="grid md:grid-cols-3 gap-4 overflow-x-auto overflow-y-hidden items-stretch">
      {populatedFavorites.map((f, i) => (
        <Fragment key={i}>
          <Course data={f} />
        </Fragment>
      ))}
    </div>
  )
}

function Course({ data } : { data: Item }) {
  return (
    <div className="shrink-0 flex w-full rounded max-w-sm">
      <div className={"w-2 rounded-l-md shrink-0 " + getSubjectColor(data.subject, 0)}></div>
      <div className="p-3 w-full flex flex-col justify-between border-r-2 border-t-2 border-b-2 rounded-r-md dark:border-zinc-700/20 border-zinc-400/20">
        <div className="mb-3">
          <h3 className="text-lg font-semibold inline items-center"><span className={`"font-normal text-sm px-3 py-1 dark:bg-zinc-400/15 rounded-full mr-2 ${getSubjectColor(data.subject, 2)} ${getSubjectColor(data.subject, 3)}`}> {data.code}</span>{data.name} </h3>
          <p className="text-sm text-zinc-400 line-clamp-2">{data.description}
          </p>
          <a href={`/catalog/courses/${data.code}`} className={"items-center w-max text-base rounded hover:shadow transition"}>
              <span className={getSubjectColor(data.subject, 1)}>Read more</span>
            </a>
          <div className="">
            

          </div>
        </div>
        
      </div>
    </div>
  )
}

function getSubjectColor(subject: typeof subjects[number], src: 0 | 1 | 2 | 3) {
  switch (subject) {
    case "English":
      return ['bg-amber-400', 'text-amber-400', 'bg-amber-400/30', 'dark:text-amber-400/80'][src];
    case "Math":
      return ['bg-sky-400', 'text-sky-400', 'bg-sky-400/30', 'dark:text-sky-400/80'][src];
    case "Science":
      return ['bg-emerald-400', 'text-emerald-400', 'bg-emerald-400/30', 'dark:text-emerald-400/80'][src];
    case "History":
      return ['bg-amber-700', 'text-amber-700', 'bg-amber-700/30', 'dark:text-amber-700/80'][src];
    case "Classics/MFL":
      return ['bg-violet-400', 'text-violet-400', 'bg-violet-400/30', 'dark:text-violet-400/80'][src];
    case "Art":
      return ['bg-pink-400', 'text-pink-400', 'bg-pink-400/30', 'dark:text-pink-400/80'][src];
  }
}