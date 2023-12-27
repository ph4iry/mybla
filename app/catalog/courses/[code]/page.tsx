import { Item } from "@/types/Listings";
import categorize from "@/utils/embeds/categorize";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import FavoriteButton from "@/components/page/FavoriteButton";

export default async function CourseView({ params }: {params: { code: string }}) {
  const sheet: Item[] = await (await fetch(process.env.URL + '/api', { method: 'GET' })).json();
  const course = sheet.find(item => item.code === params.code)!;

  const media = categorize(course!.link);

  return (
    <div>
      <a href="/catalog" className="flex text-md items-center font-medium group w-fit"><ArrowLeftIcon className="h-6 mr-1 group-hover:mr-2 transition-all stroke-2" /> Course Catalog</a>
      <h1 className="text-4xl font-bold"><FavoriteButton courseCode={course.code}/> {course.name}</h1>
      <div className="flex gap-2 my-3">
        <span className="rounded-full px-3 bg-emerald-400 dark:bg-emerald-400/30">{course.subject}</span>
        <span className="rounded-full px-3 bg-sky-400 dark:bg-sky-400/30">{course.rigor}</span>
      </div>
      {
        course.rigor === 'AP' ? (
          <div className="p-4 mb-3 rounded bg-sky-300/40">
            <span className="flex items-center gap-2 mr-4 text-blue-400">
              <InformationCircleIcon className="h-6 stroke-2" /> <span className="text-lg font-semibold">This is an AP course.</span>
            </span>
            <span className="text-sm">
              By enrolling in an AP class, you are <strong>required</strong> to take the AP exam at the end of the year. See details on the way AP courses work at BLA <Link className="underline" href="/guide/ap-courses">here</Link>.
            </span>
          </div>
        ) : (
          course.rigor === 'Honors' ? (
            <div className="p-4 mb-3 rounded bg-sky-300/40">
            <span className="flex items-center gap-2 mr-4 text-blue-400">
              <InformationCircleIcon className="h-6 stroke-2" /> <span className="text-lg font-semibold">This is an Honors course.</span>
            </span>
            <span className="text-sm">
              This class is weighted in your GPA with a 0.5-point boost. See more info on how this works <Link className="underline" href="/guide/ap-courses">here</Link>.
            </span>
          </div>
          ) : null
        )
      }
      <div className={`md:flex gap-4`}>
        {
          media?.source !== 'gsites' && media ? (
            <div className="basis-1/2">
              <iframe src={media?.getEmbedLink()} className="w-full h-auto aspect-video"></iframe>
            </div>
          ) : null
        }
        {
          media?.source === 'gsites' && media  ? (
            <div className="bg-emerald-400/40">
              This course has a <Link href={media?.link}>website</Link>!
            </div>
          ) : null
        }
        <div className={`shrink ${media?.source !== 'gsites' && media ? "basis-1/2" : ""}`}>
          <h2 className="text-2xl font-semibold">Course Description</h2>
          {course.description}
        </div>
      </div>
    </div>
  )
}