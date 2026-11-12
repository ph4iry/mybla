import { Opportunity } from "@/types/Listings";
import { opportunityTag } from "@/utils/colors";
import { seasons } from "@/utils/opportunities";
import { LuCalendar, LuCalendarClock, LuGraduationCap, LuLayers, LuLink, LuListChecks, LuMail, LuMessageCircle, LuTarget } from "react-icons/lu";
import SidePeek, { PeekSection, PeekTitle, Properties, Property } from "./SidePeek";

const tag = "min-h-6 inline-flex px-2 py-0.5 items-center rounded text-xs";

const withProtocol = (url: string) => `${!url.includes('http') ? 'https://' : ''}${url}`;

const linkClass = "underline underline-offset-2 decoration-stone-300 dark:decoration-stone-600 hover:decoration-stone-800 dark:hover:decoration-stone-300 break-all";

// contact fields sometimes hold a name and title alongside the address, so only the address becomes a link
function WithEmails({ text }:{ text: string }) {
  return <span>{text.split(/(\S+@\S+\.[^\s,;]+)/).map((part, i) => (
    i % 2 === 1 ? <a key={i} href={`mailto:${part}`} className={linkClass}>{part}</a> : part
  ))}</span>;
}

export default function OpportunityPanel({ opportunity, onClose, onPrev, onNext, position }:{
  opportunity: Opportunity | null,
  onClose: () => void,
  onPrev?: () => void,
  onNext?: () => void,
  position?: string,
}) {
  const o = opportunity;
  const grades = o ? Array.from(new Set(o.grades.filter(g => !isNaN(g)))).sort((a, b) => a - b) : [];
  const programming = o ? o.programming.filter(p => p && !o.focus.includes(p)) : [];

  return (
    <SidePeek open={!!o} onClose={onClose} onPrev={onPrev} onNext={onNext} position={position} contentKey={o?.name}>
      {o && <>
        <PeekTitle>{o.name}</PeekTitle>
        <Properties>
          {grades.length > 0 && (
            <Property icon={<LuGraduationCap />} label="Grades">
              {grades.map(g => <span key={g} className={`${tag} w-6 px-0 justify-center ${opportunityTag.grade}`}>{g}</span>)}
            </Property>
          )}
          {o.dates && (
            <Property icon={<LuCalendar />} label="Season">
              {seasons(o.dates).map(s => <span key={s} className={`${tag} ${opportunityTag.season}`}>{s}</span>)}
            </Property>
          )}
          {o.deadline && (
            <Property icon={<LuCalendarClock />} label="Deadline">
              {seasons(o.deadline).map(s => <span key={s} className={`${tag} ${opportunityTag.deadline}`}>{s}</span>)}
            </Property>
          )}
          {o.focus.filter(Boolean).length > 0 && (
            <Property icon={<LuTarget />} label="Focus">
              {o.focus.filter(Boolean).map(f => <span key={f} className={`${tag} ${opportunityTag.focus}`}>{f}</span>)}
            </Property>
          )}
          {programming.length > 0 && (
            <Property icon={<LuLayers />} label="Programming">
              {programming.map(p => <span key={p} className={`${tag} ${opportunityTag.programming}`}>{p}</span>)}
            </Property>
          )}
          {o.requirements && (
            <Property icon={<LuListChecks />} label="Requirements">
              <span>{o.requirements}</span>
            </Property>
          )}
          {o.website && (
            <Property icon={<LuLink />} label="Website">
              <a href={withProtocol(o.website)} target="_blank" rel="noreferrer noopener" className={`${linkClass} break-all`}>{o.website}</a>
            </Property>
          )}
          {o.email && (
            <Property icon={<LuMail />} label="Email">
              <WithEmails text={o.email} />
            </Property>
          )}
          {o.contactEmail && o.contactEmail !== o.email && (
            <Property icon={<LuMessageCircle />} label="Questions">
              <WithEmails text={o.contactEmail} />
            </Property>
          )}
        </Properties>

        {o.mission && <>
          <hr className="my-6 border-stone-100 dark:border-stone-800" />
          <PeekSection title="Mission">
            <p className="whitespace-pre-line">{o.mission}</p>
          </PeekSection>
        </>}
      </>}
    </SidePeek>
  );
}
