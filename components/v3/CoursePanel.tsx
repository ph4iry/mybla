import { CourseListing } from "@/types/Listings";
import categorize from "@/utils/categorizeEmbeds";
import { colorTagByGrade, colorTagByRigor, colorTagBySubject } from "@/utils/colors";
import { LuBookOpen, LuExternalLink, LuGraduationCap, LuHash, LuSignal } from "react-icons/lu";
import SidePeek, { PeekSection, PeekTitle, Properties, Property } from "./SidePeek";

const tag = "h-6 inline-flex px-2 items-center rounded text-xs whitespace-nowrap";

export default function CoursePanel({ course, onClose, onPrev, onNext, position }:{
  course: CourseListing | null,
  onClose: () => void,
  onPrev?: () => void,
  onNext?: () => void,
  position?: string,
}) {
  const media = (() => {
    try { return categorize(course?.link || null) } catch { return null }
  })();
  const embeddable = media && media.source !== 'gsites' && media.source !== 'other';

  return (
    <SidePeek open={!!course} onClose={onClose} onPrev={onPrev} onNext={onNext} position={position} contentKey={course?.code}>
      {course && <>
        <PeekTitle>{course.name}</PeekTitle>
        <Properties>
          <Property icon={<LuHash />} label="Course code">
            <span className="font-mono">{course.code}</span>
          </Property>
          <Property icon={<LuBookOpen />} label="Subject">
            <span className={`${tag} ${colorTagBySubject(course.subject)}`}>{course.subject}</span>
          </Property>
          <Property icon={<LuSignal />} label="Level">
            <span className={`${tag} ${colorTagByRigor(course.rigor)}`}>{course.rigor}</span>
          </Property>
          <Property icon={<LuGraduationCap />} label="Grades">
            {course.grades.filter(g => !isNaN(g)).length > 0
              ? course.grades.map((g, i) => !isNaN(g) && <span key={i} className={`${tag} w-6 px-0 justify-center ${colorTagByGrade(g)}`}>{g}</span>)
              : <span className="text-stone-400">Not listed</span>}
          </Property>
        </Properties>

        <hr className="my-6 border-stone-100 dark:border-stone-800" />

        <PeekSection title="Description">
          <p className="whitespace-pre-line">{course.description}</p>
        </PeekSection>

        {course.link && (
          <PeekSection title="Learn more">
            {embeddable ? (
              <iframe src={media.getEmbedLink()} className="w-full aspect-video rounded-md border border-stone-200 dark:border-stone-800" />
            ) : (
              <a href={course.link} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-fuchsia-800 dark:text-fuchsia-300 underline underline-offset-2 break-all">
                {course.link} <LuExternalLink className="size-3.5 shrink-0" />
              </a>
            )}
          </PeekSection>
        )}
      </>}
    </SidePeek>
  );
}
