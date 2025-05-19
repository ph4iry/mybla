import { CourseListing } from "@/types/Listings";
import { getCourseSheet } from "@/utils/googleSheets";

export async function generateMetadata({ params }:{params: { code: string }}) {
  const sheet: CourseListing[] = await getCourseSheet();
  const course = sheet.find(item => item.code === params.code);

  return {
    title: `${course!.name} | myBLA`,
  }
}


export default function CourseSingleView() {
  
}