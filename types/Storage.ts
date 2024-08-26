import { Structures } from "bla-aspen";

export interface DetailedCourse extends Structures.Course {
  teacherEmail: string;
  classSize: number;
  categories: {
    name: string;
    terms: {
      q1: {
        weight: number,
        average: number,
      },
      q2: {
        weight: number,
        average: number,
      },
      q3: {
        weight: number,
        average: number,
      },
      q4: {
        weight: number,
        average: number,
      },
    }
  }[];
}

export interface StoredCourses {
  previous: (Structures.Course | DetailedCourse)[];
  current: (Structures.Course | DetailedCourse)[];
}