import { Item, Subject } from "@/types/Listings";
import categorize from "@/utils/categorizeEmbeds";
import { HiArrowLeft, HiArrowTopRightOnSquare, HiInformationCircle, HiHashtag, HiPencil, HiSparkles } from 'react-icons/hi2';
import Link from "next/link";
import { FavoriteButtonWithNoContext } from "@/components/page/FavoriteButton";
import { getSheet } from "@/utils/googleSheets";
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

  function getGradeColor(grade: 7 | 8 | 9 | 10 | 11 | 12) {
    switch(grade) {
      case 7: return 'bg-amber-400/30';
      case 8: return 'bg-orange-400/30';
      case 9: return 'bg-purple-400/30';
      case 10: return 'bg-green-400/30';
      case 11: return 'bg-blue-400/30';
      case 12: return 'bg-red-400/30';
    }
  }

  return (
    <div className="">
      <a href="/catalog" className="flex text-md items-center font-medium group w-fit mb-3"><HiArrowLeft className="h-6 mr-1 group-hover:mr-2 transition-all stroke-2" /> Course Catalog</a>
      <h1 className="text-4xl font-bold gap-2 items-center"><FavoriteButtonWithNoContext course={course}/> {course.name}</h1>
      <div className="flex gap-2 my-3">
        <span className={`inline-flex flex-nowrap items-center gap-2 px-3 py-1 rounded-full ${getSubjectColor(course.subject)}`}><HiPencil className="h-5" /> {course.subject}</span>
        <span className={`inline-flex flex-nowrap items-center gap-2 px-3 py-1 rounded-full ${getRigorColor(course.rigor)}`}><HiSparkles className="h-5" /> {course.rigor}</span>
          {course.grades?.map((g, i) => (
            <span key={i} className={`px-3 py-1 rounded-full bg-fuchsia-400/30 ${getGradeColor(g)}`}>{g}</span>
          ))}
      </div>
      {
        course.rigor === 'AP' ? (
          <div className="p-4 mb-3 rounded bg-sky-300/40">
            <span className="flex items-center gap-2 mr-4 text-blue-400">
              <HiInformationCircle className="h-6 stroke-2" /> <span className="text-lg font-semibold">This is an AP course.</span>
            </span>
            <span className="text-sm">
              By enrolling in an AP class, you are <span className="font-bold">required</span> to take the AP exam at the end of the year. See details on the way AP courses work at BLA <Link className="underline" href="/guide/ap-courses">here</Link>.
            </span>
          </div>
        ) : (
          course.rigor === 'Honors' ? (
            <div className="p-4 mb-3 rounded bg-sky-300/40">
            <span className="flex items-center gap-2 mr-4 text-blue-400">
              <HiInformationCircle className="h-6 stroke-2" /> <span className="text-lg font-semibold">This is an Honors course.</span>
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
              <HiArrowTopRightOnSquare className="h-8 text-fuchsia-400 inline mr-2" />
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

function getSubjectColor(subject: "English" | "Math" | "Science" | "History" | "Classics/MFL" | "Art") {
  switch (subject) {
    case "English":
      return 'bg-amber-400/30';
    case "Math":
      return 'bg-blue-500/30';
    case "Science":
      return 'bg-emerald-400/30';
    case "History":
      return 'bg-amber-700/30';
    case "Classics/MFL":
      return 'bg-violet-400/30';
    case "Art":
      return 'bg-pink-400/30';
  }
}

function getRigorColor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return 'bg-sky-400/30';
    case "Honors": return 'bg-emerald-30';
    case "Regular": return 'bg-zinc-400/30';
  }
}

function getGradeColor(grade: `${7 | 8 | 9 | 10 | 11 | 12}`) {
  switch(grade) {
    case '7': return 'bg-amber-400/30';
    case '8': return 'bg-orange-400/30';
    case '9': return 'bg-purple-400/30';
    case '10': return 'bg-green-400/30';
    case '11': return 'bg-blue-400/30';
    case '12': return 'bg-red-400/30';
  }
}