'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function FavoriteButton({ courseCode }: { courseCode: string }) {
  const [listArray, setListArray] = useState<string[]>([]);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }

    setListArray((JSON.parse(localStorage.getItem('favorites')!) as string[]));

    setFavorited((JSON.parse(localStorage.getItem('favorites')!) as string[]).includes(courseCode));
  }, []);

  const handleClick = () => {
    if (favorited) {
      const arr = listArray;
      arr.splice(arr.indexOf(courseCode), 1);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )
    } else {
      const arr = listArray;
      arr.push(courseCode);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )
    }
    setFavorited(!favorited);
  }
  
  return (
    <button className="inline hover:scale-125 transition" onClick={handleClick}>
    {
      favorited ? (
        <>
          <HeartIcon
            className="h-8 w-8 text-rose-400 inline"
          />
          <HeartOutlineIcon
            className="h-8 w-8 text-rose-400 hidden"
          />
        </>
      ) : (
        <>
          <HeartIcon
            className="h-8 w-8 text-rose-400 hidden"
          />
          <HeartOutlineIcon
            className="h-8 w-8 text-rose-400 inline"
          />
        </>
      )
    }
  </button>
  )
}