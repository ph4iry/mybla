import { Dispatch, SetStateAction } from "react";

export const SUBJECTS = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export type Subject = typeof SUBJECTS[number];

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

export interface CourseListing {
  code: string
  name: string
  subject: Subject
  description: string
  rigor: 'AP' | 'Honors' | 'Regular'
  link: string | null
  reviews: Review[];
  grades: (7 | 8 | 9 | 10 | 11 | 12)[];
}

export interface Opportunity {
  name: string;
  mission: string;
  website: string;
  email: string;
  contactEmail: string;
  focus: string[];
  programming: string[];
  grades: number[];
  dates: string;
  requirements: string;
  deadline: string;
}

export interface FilterOptions {
  name: string,
  index: number,
  condition: (i: CourseListing, batch: [string, boolean][]) => boolean,
  previous: ((i: CourseListing) => boolean)[]
  setState: Dispatch<SetStateAction<((i: CourseListing) => boolean)[]>>,
  options: string[]
}

export type FilterSet = ((i: CourseListing) => boolean)[];