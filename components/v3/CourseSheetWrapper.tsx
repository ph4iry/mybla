'use client';

import { CourseListing, Subject, SUBJECTS } from "@/types/Listings";
import Sheet from "./CourseSheet";
import FilterPopover from "./FilterButton";
import { useState } from "react";

export default function CourseSheetWrapper({ headers, sheet }:{ headers: string[], sheet: CourseListing[] }) {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const GRADES = [
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
  ]

  return (
    <>
    <div>
      <div className="flex gap-3 items-center relative">
        <input type="text" name="course-search" className="hidden md:block py-2 px-4 rounded-full border-2 border-stone-200 active:outline-none active:ring-0 focus:outline-none focus:ring-0 focus:border-stone-800 transition text-sm" placeholder="Search..." onChange={handleSearch} />
        <span>Filter: </span>
        <FilterPopover name="Grade(s)" options={GRADES} selected={selectedGrades as `${(7 | 8 | 9 | 10 | 11 | 12)}`[]} onChange={(selection) => setSelectedGrades(selection)} />
        <FilterPopover name="Subject" options={SUBJECTS.map((subj) => ({
          label: subj,
          value: subj
        }))} selected={selectedSubjects} onChange={(selection) => setSelectedSubjects(selection as Subject[])} />
      </div>
      <input type="text" name="course-search" className="block md:hidden py-2 px-4 rounded-full border-2 border-stone-200 active:outline-none active:ring-0 focus:outline-none focus:ring-0 focus:border-stone-800 transition text-sm w-full my-3" placeholder="Search..." onChange={handleSearch} />
    </div>
      <hr className="my-3" />
      <div className="h-full overflow-hidden">
        <Sheet headers={headers} data={sheet} filter={(course) => {
          const grades = selectedGrades.length === 0 || course.grades.map(g => `${g}`).some(item => selectedGrades.includes(item));
          const subjects = selectedSubjects.length === 0 || selectedSubjects.includes(course.subject);
          const searchMatch = search.length === 0 || course.name.toLowerCase().includes(search.toLowerCase()) || course.code.toLowerCase().includes(search.toLowerCase());
          return grades && subjects && searchMatch;
        }} />
      </div>    
    </>
  )
}