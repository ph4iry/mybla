'use client';

import { CourseListing, Subject, SUBJECTS } from "@/types/Listings";
import Sheet from "./CourseSheet";
import FilterPopover from "./FilterButton";
import { useState } from "react";
import { colorTagByGrade, colorTagByRigor, colorTagBySubject } from "@/utils/colors";

export default function CourseSheetWrapper({ headers, sheet }:{ headers: string[], sheet: CourseListing[] }) {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedRigors, setSelectedRigors] = useState<CourseListing['rigor'][]>([]);
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

  // only offer levels that actually appear in the sheet
  const RIGORS = (['AP', 'Honors', 'Regular'] as const)
    .filter(r => sheet.some(c => c.rigor === r))
    .map(r => ({ label: r, value: r }));

  return (
    <>
    <div>
      <div className="flex gap-2 items-center flex-wrap">
        <input type="text" name="course-search" className="h-8 py-0 px-3 w-full md:w-56 rounded-md border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-0 focus:border-stone-500 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 transition text-sm" placeholder="Search by name or code..." onChange={handleSearch} />
        <span className="hidden md:inline text-xs uppercase tracking-wide text-stone-400 ml-2">Filter</span>
        <FilterPopover name="Grade" options={GRADES} selected={selectedGrades as `${(7 | 8 | 9 | 10 | 11 | 12)}`[]} onChange={(selection) => setSelectedGrades(selection)} colorFor={(g) => colorTagByGrade(Number(g) as 7 | 8 | 9 | 10 | 11 | 12)} />
        <FilterPopover name="Subject" options={SUBJECTS.map((subj) => ({
          label: subj,
          value: subj
        }))} selected={selectedSubjects} onChange={(selection) => setSelectedSubjects(selection as Subject[])} colorFor={(s) => colorTagBySubject(s as Subject)} />
        <FilterPopover name="Level" options={RIGORS} selected={selectedRigors} onChange={(selection) => setSelectedRigors(selection)} colorFor={(r) => colorTagByRigor(r as CourseListing['rigor'])} />
      </div>
    </div>
      <div className="h-3 shrink-0" />
      <div className="flex-1 min-h-0">
        <Sheet headers={headers} data={sheet} filter={(course) => {
          const grades = selectedGrades.length === 0 || course.grades.map(g => `${g}`).some(item => selectedGrades.includes(item));
          const subjects = selectedSubjects.length === 0 || selectedSubjects.includes(course.subject);
          const rigors = selectedRigors.length === 0 || selectedRigors.includes(course.rigor);
          const searchMatch = search.length === 0 || course.name.toLowerCase().includes(search.toLowerCase()) || course.code.toLowerCase().includes(search.toLowerCase());
          return grades && subjects && rigors && searchMatch;
        }} />
      </div>    
    </>
  )
}