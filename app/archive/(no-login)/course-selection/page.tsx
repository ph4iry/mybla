import SharedSelection from "@/components/shareables/SharedSelection"
import { CourseListing } from "@/types/Listings";
import { getCourseSheet } from "@/utils/googleSheets";

export async function generateMetadata({ searchParams }:{ searchParams: { name: string }}) {
  return {
    title: `${searchParams.name || ''} Course Selection | myBLA`.trim(),
  }
}

export default async function CourseSelectionView() {
  const sheet: CourseListing[] = await getCourseSheet();
  
  return (
    <div><SharedSelection sheet={sheet} /></div>
  )
}