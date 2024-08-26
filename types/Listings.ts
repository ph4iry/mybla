import { Dispatch, SetStateAction } from "react";

const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export type Subject = typeof subjects[number];

export interface Review {
  name: string;
  course: string;
  ratings: {
    weeklyCommitment:string,
    homework: string,
    resources: string,
    skills: {
      humanities: string[],
      stem: string[],
      personal: string[],
    }
  };
  tips?: string;
  
}

export interface Item {
  code: string
  name: string
  subject: Subject
  description: string
  rigor: 'AP' | 'Honors' | 'Regular'
  link: string | null
  reviews: Review[];
  grades: (7 | 8 | 9 | 10 | 11 | 12)[];
}

export interface FilterOptions {
  name: string,
  index: number,
  condition: (i: Item, batch: [string, boolean][]) => boolean,
  previous: ((i: Item) => boolean)[]
  setState: Dispatch<SetStateAction<((i: Item) => boolean)[]>>,
  options: string[]
}

export type FilterSet = ((i: Item) => boolean)[];