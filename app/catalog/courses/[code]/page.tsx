import { Item, Subject } from "@/types/Listings";
import categorize from "@/utils/embeds/categorize";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon, InformationCircleIcon, HashtagIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { FavoriteButtonWithNoContext } from "@/components/page/FavoriteButton";
import { getSheet } from "@/utils/g-sheets/fetch";
import Reviews from "@/components/page/Reviews";
import NotFoundPage from "@/app/not-found";

export const revalidate = 3600;

export async function generateMetadata({ params }:{params: { code: string }}) {
  const sheet: Item[] = await getSheet();
  const course = sheet.find(item => item.code === params.code);

  return {
    title: `${course!.name} | myBLA`,
  }
}

export default async function CourseView({ params }: {params: { code: string }}) {
  const sheet: Item[] = await getSheet();
  const course = sheet.find(item => item.code === params.code.toUpperCase());

  if (!course) {
    return <NotFoundPage />
  }

  const media = categorize(course!.link);

  return (
    <div>
      <a href="/catalog" className="flex text-md items-center font-medium group w-fit mb-3"><ArrowLeftIcon className="h-6 mr-1 group-hover:mr-2 transition-all stroke-2" /> Course Catalog</a>
      <h1 className="text-4xl font-bold gap-2 items-center"><FavoriteButtonWithNoContext course={course}/> {course.name}</h1>
      <div className="flex gap-2 my-3">
        <span className={`inline-flex uppercase items-center ${colorTextBySubject(course.subject)}`}><HashtagIcon className="h-4 stroke-2" /> {course.subject}</span>
        <span className={`inline-flex uppercase items-center ${colorTextByRigor(course.rigor)}`}><HashtagIcon className="h-4 stroke-2" /> {course.rigor}</span>
      </div>
      {
        course.rigor === 'AP' ? (
          <div className="p-4 mb-3 rounded bg-sky-300/40">
            <span className="flex items-center gap-2 mr-4 text-blue-400">
              <InformationCircleIcon className="h-6 stroke-2" /> <span className="text-lg font-semibold">This is an AP course.</span>
            </span>
            <span className="text-sm">
              By enrolling in an AP class, you are <span className="font-bold">required</span> to take the AP exam at the end of the year. See details on the way AP courses work at BLA <Link className="underline" href="/guide/ap-courses">here</Link>.
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
      <div className={`md:flex gap-4 ${(media?.source === 'gsites' || media?.source === 'other') ? 'flex-col' : ''}`}>
        {
          (media?.source !== 'gsites' && media?.source !== 'other') && media ? (
            <div className="basis-1/2">
              <iframe src={media?.getEmbedLink()} className="w-full h-auto aspect-video"></iframe>
            </div>
          ) : null
        }
        {
          (media?.source === 'gsites' || media?.source === 'other') && media  ? (
            <div className="bg-fuchsia-400/20 p-4 rounded text-base">
              <ArrowTopRightOnSquareIcon className="h-8 text-fuchsia-400 inline mr-2" />
              <span>This course has an </span>
              <Link legacyBehavior href={media.link} className="text-fuchsia-800" passHref>
                <a className="underline" target="_blank" rel="noreferrer noopener">external link</a>
              </Link>!
            </div>
          ) : null
        }
        <div className={`shrink ${(media?.source !== 'gsites' && media?.source !== 'other') && media ? "basis-1/2" : ""}`}>
          <h2 className="text-2xl font-semibold">Course Description</h2>
          {course.description}
        </div>
      </div>
      <div className="block">
        <Reviews reviews={course.reviews}/>
      </div>
    </div>
  )
}

function colorTextBySubject(subject: Subject) {
  switch (subject) {
    case "English": return "text-amber-400";
    case "Math": return "text-sky-400";
    case "Science": return "text-emerald-400";
    case "History": return "text-amber-600";
    case "Classics/MFL": return "text-violet-400";
    case "Art": return "text-pink-400";
  }
}

function colorTextByRigor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return "dark:text-blue-200 text-blue-400";
    case "Honors": return "dark:text-emerald-200 text-green-400";
    case "Regular": return "dark:text-zinc-200 text-zinc-400";
  }
}