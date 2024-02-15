import { Item } from "@/types/Listings";
import { getSheet } from "@/utils/g-sheets/fetch";
import Bento from "@/components/collections/Bento";

interface CourseCollection {
  name: string;
  description: string;
  courses: Item[];
  background: string;
  span?: `col-span-${number}`
}
export default async function Collections() {
  const sheet: Item[] = await getSheet();

  const createCollection = (
      name: string,
      description: string,
      courses: string[],
      background: string,
      span?: `col-span-${number}`
    ) => {
    const populatedCourses = sheet.filter(c => courses.includes(c.code));
    return { name, description, courses: populatedCourses, background, span }
  }
  
  const collections: CourseCollection[] = [
    createCollection("Computer Science, Technology, and Engineering", "", ["C73", "C71", "472", "473", "474", "471", "57A"], 'bg-gradient-to-br from-sky-400 to-purple-600', 'col-span-2'),
    createCollection("Business, Finance", "", ["C73", "C71", "472", "473", "474", "471", "57A"], 'bg-gradient-to-br from-blue-800 to-indigo-900'),
    createCollection("Political Science, International Relations", "", ["C73", "C71", "472", "473", "474", "471", "57A"], 'bg-gradient-to-br from-rose-400 to-red-500'),
    createCollection("Nursing, Biology, and Medical Careers", "", ["572"], 'bg-gradient-to-r from-emerald-400 to-cyan-400', 'col-span-2'),
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold">Course Collections</h1>
      <p className="italic">Have an idea of the career you want to pursue, but not sure what clases to take? Check out some of these collections and quickly select courses that pique your interest!</p>
      <Bento
        collections={collections}
      />
    </div>
  )
}