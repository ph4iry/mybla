'use client';

import { Opportunity, Subject, SUBJECTS } from "@/types/Listings";
import Sheet from "./OpportunitySheet";
import FilterPopover from "./FilterButton";
import { useState } from "react";

export default function OpportunitySheetWrapper({ headers, sheet }:{ headers: string[], sheet: Opportunity[] }) {
  const [selectedGrades, setSelectedGrades] = useState<(`${7 | 8 | 9 | 10 | 11 | 12}`)[]>([])
  const [selectedDates, setSelectedDates] = useState<('Rolling' | 'Summer' | 'Spring' | 'Winter' | 'Fall')[]>([])
  const [selectedDeadlines, setSelectedDeadlines] = useState<('Rolling' | 'Summer' | 'Spring' | 'Winter' | 'Fall')[]>([])
  const [selectedFoci, setSelectedFoci] = useState<(['Academic Enrichment', 'Career Focused', 'College Prep', 'Health & Wellness', 'Higher Education & Postsecondary Opportunities', 'Study Abroad'][number])[]>([])

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
      <div className="flex gap-3 items-center flex-wrap">
        <span className="hidden md:block">Filter: </span>
        <FilterPopover name="Grade(s)" options={GRADES} selected={selectedGrades } onChange={(selection: (`${7 | 8 | 9 | 10 | 11 | 12}`)[]) => setSelectedGrades(selection)} />
        <FilterPopover name="Season" options={['Rolling', 'Summer', 'Spring', 'Winter', 'Fall'].map(d => ({ label: d, value: d }))} selected={selectedDates} onChange={(selection) => setSelectedDates(selection)} />
        <FilterPopover name="Deadline" options={['Rolling', 'Summer', 'Spring', 'Winter', 'Fall'].map(d => ({ label: d, value: d }))} selected={selectedDeadlines} onChange={(selection) => setSelectedDeadlines(selection)} />
        <FilterPopover name="Focus" options={['Academic Enrichment', 'Career Focused', 'College Prep', 'Health & Wellness', 'Higher Education & Postsecondary Opportunities', 'Study Abroad'].map(d => ({ label: d, value: d }))} selected={selectedFoci} onChange={(selection) => setSelectedFoci(selection)} />
      </div>
      <hr className="my-3" />
      <div className="h-full overflow-hidden">
        <Sheet headers={headers} data={sheet} filter={(opportunity: Opportunity) => {
          const grades = selectedGrades.length === 0 || opportunity.grades.map(g => `${g}`).some(item => selectedGrades.includes(item as `${7 | 8 | 9 | 10 | 11 | 12}`));
          const dates = selectedDates.length === 0 || opportunity.dates.split(', ').some(item => selectedDates.includes(item as "Rolling" | "Summer" | "Spring" | "Winter" | "Fall"))
          const deadlines = selectedDeadlines.length === 0 || opportunity.dates.split(', ').some(item => selectedDeadlines.includes(item as "Rolling" | "Summer" | "Spring" | "Winter" | "Fall"));
          const foci = selectedFoci.length === 0 || opportunity.focus.some(goal => selectedFoci.includes(goal as ['Academic Enrichment', 'Career Focused', 'College Prep', 'Health & Wellness', 'Higher Education & Postsecondary Opportunities', 'Study Abroad'][number]));
          return grades && dates && deadlines && foci;
        }} />
      </div>    
    </>
  )
}