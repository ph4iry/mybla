'use client';
import { CourseListing } from "@/types/Listings";
/* eslint-disable react-hooks/exhaustive-deps */
import { HiStar } from 'react-icons/hi2';
import classNames from "classnames";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import secureLocalStorage from "react-secure-storage";

export default function FavoriteButton({ data, favorites, updateAllFavorites }: { data: CourseListing, favorites: string[], updateAllFavorites: Dispatch<SetStateAction<string[]>> }) {
  const [favorited, setFavorited] = useState(favorites.includes(data.code));

  useEffect(() => {
    setFavorited((secureLocalStorage.getItem('favorites')! as string[])?.includes(data.code))
  }, []);

  const handleClick = () => {
    console.log(favorited);
    if (favorited) {
      const arr = favorites;
      arr.splice(arr.indexOf(data.code), 1);

      secureLocalStorage.setItem(
        'favorites',
        arr,
      )

      setFavorited(false);
      updateAllFavorites(arr);
    } else {
      const arr = favorites;
      arr.push(data.code);

      console.log(arr);

      secureLocalStorage.setItem(
        'favorites',
        arr,
      )
      setFavorited(true);
      updateAllFavorites(arr);
    }
  }

  return (
    <button className="inline group hover:scale-125 transition" onClick={handleClick}>
      <HiStar
        className={classNames({
          "h-8 w-8 inline": true,
          "text-zinc-400 outline-1": !favorited,
          "text-amber-400": favorited
        })}
      />
    </button>
  )
}

export function FavoriteButtonWithNoContext({ course }:{ course: CourseListing }) {
  const [favorited, setFavorited] = useState(false);
  const [allFavorites, setAllFavorites] = useState<string[]>([])
  
  useEffect(() => {
    const favorites = secureLocalStorage.getItem('favorites') as string[];
    setFavorited(favorites.includes(course.code));
    setAllFavorites(favorites);
  }, []);

  const handleClick = () => {
    if (favorited) {
      const arr = allFavorites;
      arr.splice(arr.indexOf(course.code), 1);

      secureLocalStorage.setItem(
        'favorites',
        arr,
      )

      setFavorited(false);
      setAllFavorites(arr);
    } else {
      const arr = allFavorites;
      arr.push(course.code);

      console.log(arr);

      secureLocalStorage.setItem(
        'favorites',
        arr,
      )
      setFavorited(true);
      setAllFavorites(arr);
    }
  }
  return (
    <button className="inline group hover:scale-125 transition" onClick={handleClick}>
      <HiStar
        className={classNames({
          "h-7 w-10 inline": true,
          "text-zinc-400": !favorited,
          "text-rose-400": favorited
        })}
      />
    </button>
  )
}