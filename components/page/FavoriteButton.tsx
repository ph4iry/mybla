'use client';
import { Item } from "@/types/Listings";
/* eslint-disable react-hooks/exhaustive-deps */
import { HeartIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

export default function FavoriteButton({ data, favorites, updateAllFavorites }: { data: Item, favorites: string[], updateAllFavorites: Dispatch<SetStateAction<string[]>> }) {
  const [favorited, setFavorited] = useState(favorites.includes(data.code));

  useEffect(() => {
    setFavorited(
      (JSON.parse(localStorage.getItem('favorites')!) as string[] || '[]').includes(data.code)
    )
  })

  const handleClick = () => {
    console.log(favorited);
    if (favorited) {
      const arr = favorites;
      arr.splice(arr.indexOf(data.code), 1);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )

      setFavorited(false);
      updateAllFavorites(arr);
    } else {
      const arr = favorites;
      arr.push(data.code);

      console.log(arr);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )
      setFavorited(true);
      updateAllFavorites(arr);
    }
    
    // console.log('after edits: ', localStorage.getItem('favorites'))
  }

  return (
    <button className="inline group hover:scale-125 transition" onClick={handleClick}>
      <HeartIcon
        className={classNames({
          "h-8 w-8 inline": true,
          "text-zinc-400": !favorited,
          "text-rose-400": favorited
        })}
      />
    </button>
  )
}

export function FavoriteButtonWithNoContext({ course }:{ course: Item }) {
  const [favorited, setFavorited] = useState(false);
  const [allFavorites, setAllFavorites] = useState<string[]>([])
  
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || "[]");
    setFavorited(favorites.includes(course.code));
    setAllFavorites(favorites);
  }, []);

  const handleClick = () => {
    if (favorited) {
      const arr = allFavorites;
      arr.splice(arr.indexOf(course.code), 1);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )

      setFavorited(false);
      setAllFavorites(arr);
    } else {
      const arr = allFavorites;
      arr.push(course.code);

      console.log(arr);

      localStorage.setItem(
        'favorites',
        JSON.stringify(arr),
      )
      setFavorited(true);
      setAllFavorites(arr);
    }
  }
  return (
    <button className="inline group hover:scale-125 transition" onClick={handleClick}>
      <HeartIcon
        className={classNames({
          "h-10 w-10 inline": true,
          "text-zinc-400": !favorited,
          "text-rose-400": favorited
        })}
      />
    </button>
  )
}