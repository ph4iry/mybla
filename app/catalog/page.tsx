import Sheet from "@/components/v3/CourseSheet";
import CourseSheetWrapper from "@/components/v3/CourseSheetWrapper";
import { CourseListing } from "@/types/Listings";
import { getCourseSheet } from "@/utils/googleSheets";

export default async function Catalog() {
  const sheet: CourseListing[] = await getCourseSheet();
  const removeFromSheet = ['link', 'reviews'];
  const headers = (Object.keys(sheet[0])).filter(key => !['link', 'reviews'].includes(key)).map(key => key.charAt(0).toUpperCase() + key.slice(1));
  // console.log(sheet)
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex gap-2 items-center mb-3">
        <h1 className="font-playfair-display font-bold text-lg md:text-xl">Course Catalog</h1>
      </div>
      <CourseSheetWrapper headers={headers} sheet={sheet} />
    </div>
  );
}