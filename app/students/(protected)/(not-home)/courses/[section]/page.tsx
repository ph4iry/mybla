import IndividualPage from "@/components/student-protected/courses/IndividualPage";
import { StoredCourses } from "@/types/Storage";
import { getSheet } from "@/utils/googleSheets";
import { Structures } from "bla-aspen";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export default async function Page({ params }:{params: { section: string }}) {
  const sheet = await getSheet();
  const catalogCourse = sheet.find(item => item.code.toUpperCase() === params.section.split('-')[0].toUpperCase()) || null;

  return (
    <div>
      <IndividualPage section={params.section} catalogCourse={catalogCourse} />
    </div>
  );
}