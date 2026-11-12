'use client';

import { Opportunity, Subject, SUBJECTS } from "@/types/Listings";
import { opportunityTag } from "@/utils/colors";
import Sheet from "./OpportunitySheet";
import FilterPopover from "./FilterButton";
import { useMemo, useState } from "react";

export default function OpportunitySheetWrapper({ headers, sheet }:{ headers: string[], sheet: Opportunity[] }) {
  const [selectedGrades, setSelectedGrades] = useState<(`${7 | 8 | 9 | 10 | 11 | 12}`)[]>([])
  const [selectedDates, setSelectedDates] = useState<('Rolling' | 'Summer' | 'Spring' | 'Winter' | 'Fall')[]>([])
  const [selectedDeadlines, setSelectedDeadlines] = useState<('Rolling' | 'Summer' | 'Spring' | 'Winter' | 'Fall')[]>([])
  const [selectedFoci, setSelectedFoci] = useState<(['Academic Enrichment', 'Career Focused', 'College Prep', 'Health & Wellness', 'Higher Education & Postsecondary Opportunities', 'Study Abroad'][number])[]>([])

  const [selectedProgramming, setSelectedProgramming] = useState<string[]>([])

  // built from the sheet; entries that only differ by case (e.g. "MILITARY" / "Military") are merged
  const PROGRAMMING = useMemo(() => {
    const labels = new Map<string, string>();
    sheet.flatMap(o => o.programming).filter(Boolean).forEach((p) => {
      const key = p.toLowerCase();
      // prefer a mixed-case spelling over an all-caps one when both exist
      if (!labels.has(key) || labels.get(key) === labels.get(key)!.toUpperCase()) labels.set(key, p);
    });
    return Array.from(labels, ([value, label]) => ({ label, value })).sort((a, b) => a.label.localeCompare(b.label));
  }, [sheet]);

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
      <div className="flex gap-2 items-center flex-wrap">
        <span className="hidden md:inline text-xs uppercase tracking-wide text-stone-400">Filter</span>
        <FilterPopover name="Grade" options={GRADES} selected={selectedGrades } onChange={(selection: (`${7 | 8 | 9 | 10 | 11 | 12}`)[]) => setSelectedGrades(selection)} colorFor={() => opportunityTag.grade} />
        <FilterPopover name="Season" options={['Rolling', 'Summer', 'Spring', 'Winter', 'Fall'].map(d => ({ label: d, value: d }))} selected={selectedDates} onChange={(selection) => setSelectedDates(selection)} colorFor={() => opportunityTag.season} />
        <FilterPopover name="Deadline" options={['Rolling', 'Summer', 'Spring', 'Winter', 'Fall'].map(d => ({ label: d, value: d }))} selected={selectedDeadlines} onChange={(selection) => setSelectedDeadlines(selection)} colorFor={() => opportunityTag.deadline} />
        <FilterPopover name="Focus" options={['Academic Enrichment', 'Career Focused', 'College Prep', 'Health & Wellness', 'Higher Education & Postsecondary Opportunities', 'Study Abroad'].map(d => ({ label: d, value: d }))} selected={selectedFoci} onChange={(selection) => setSelectedFoci(selection)} colorFor={() => opportunityTag.focus} />
        <FilterPopover name="Programming" options={PROGRAMMING} selected={selectedProgramming} onChange={(selection) => setSelectedProgramming(selection)} colorFor={() => opportunityTag.programming} />
      </div>
      <div className="h-3 shrink-0" />
      <div className="flex-1 min-h-0">
        <Sheet headers={headers} data={sheet} filter={(opportunity: Opportunity) => {
          const grades = selectedGrades.length === 0 || opportunity.grades.map(g => `${g}`).some(item => selectedGrades.includes(item as `${7 | 8 | 9 | 10 | 11 | 12}`));
          const dates = selectedDates.length === 0 || opportunity.dates.split(', ').some(item => selectedDates.includes(item as "Rolling" | "Summer" | "Spring" | "Winter" | "Fall"))
          const deadlines = selectedDeadlines.length === 0 || opportunity.deadline.split(', ').some(item => selectedDeadlines.includes(item as "Rolling" | "Summer" | "Spring" | "Winter" | "Fall"));
          const foci = selectedFoci.length === 0 || opportunity.focus.some(goal => selectedFoci.includes(goal as ['Academic Enrichment', 'Career Focused', 'College Prep', 'Health & Wellness', 'Higher Education & Postsecondary Opportunities', 'Study Abroad'][number]));
          const programming = selectedProgramming.length === 0 || opportunity.programming.some(p => selectedProgramming.includes(p.toLowerCase()));
          return grades && dates && deadlines && foci && programming;
        }} />
      </div>    
    </>
  )
}