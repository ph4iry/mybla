import Sheet from "@/components/v3/CourseSheet";
import CourseSheetWrapper from "@/components/v3/CourseSheetWrapper";
import { CourseListing } from "@/types/Listings";
import { getCourseSheet } from "@/utils/googleSheets";
import { PiStarFourFill } from 'react-icons/pi'

export default async function Catalog() {
  const sheet: CourseListing[] = await getCourseSheet();
  const removeFromSheet = ['link', 'reviews'];
  const headers = (Object.keys(sheet[0])).filter(key => !['link', 'reviews'].includes(key)).map(key => key.charAt(0).toUpperCase() + key.slice(1));
  // console.log(sheet)
  return (
    <div className="h-full overflow-hidden rounded-xl md:p-2">
      <div className="flex gap-3 items-center">
        <PiStarFourFill className="size-7" />
        <h1 className="font-playfair-display font-bold text-2xl md:text-3xl uppercase">Course Catalog</h1>
        {/* <PiStarFourFill className="size-7" /> */}
      </div>
      <hr className="my-3" />
      <CourseSheetWrapper headers={headers} sheet={sheet} />
    </div>
  );
}