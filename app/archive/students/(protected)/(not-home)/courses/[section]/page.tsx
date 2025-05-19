import IndividualPage from "@/components/student-protected/courses/IndividualPage";
import { StoredCourses } from "@/types/Storage";
import { getCourseSheet } from "@/utils/googleSheets";
import { Structures } from "bla-aspen";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export default async function Page({ params }:{params: { section: string }}) {
  if (!params.section) return notFound();

  const sheet = await getCourseSheet();
  const catalogCourse = sheet.find(item => item.code.toUpperCase() === params.section.split('-')[0].toUpperCase()) || null;

  return (
    <div>
      <IndividualPage catalogCourse={catalogCourse} section={params.section} />
    </div>
  );
}