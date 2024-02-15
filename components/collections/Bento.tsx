'use client';
import { Item } from "@/types/Listings";

interface CourseCollection {
  name: string;
  description: string;
  courses: Item[];
  background: string;
  span?: `col-span-${number}`
}

export default function Bento({ collections }:{ collections: CourseCollection[]} ) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-6 mt-3">
      {collections.map((collection, i) => (
        <div key={i} className={`flex items-end p-3 rounded-lg ${collection.span} ${collection.background} min-h-36 transition hover:scale-105 relative`}>
          <div>
            <h2 className="font-semibold text-white text-lg">{collection.name}</h2>
            <div className="flex flex-wrap gap-2">
              {collection.courses.slice(0, 3).map((course, j) => (
                <span className="bg-zinc-900/10 px-2 py-1 text-sm rounded-full" key={j}>{course.code}</span>
              ))}
              {collection.courses.length > 3 && (
                <span className="bg-zinc-900/10 px-2 py-1 text-sm rounded-full">+{collection.courses.length - 3}</span>
              )}
            </div>
          </div>
          <button onClick={() => { console.log(collection.name) }} className="z-10 absolute inset-0 w-full h-full bg-transparent pointer-events-auto;"></button>
        </div>
      ))}
    </div>
  )
}