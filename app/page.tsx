import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import { LuBookOpen, LuCompass } from "react-icons/lu";
import Card, { CardTag } from "@/components/v3/Card";
import { CourseListing, Opportunity, SUBJECTS } from "@/types/Listings";
import { getCourseSheet, getOpportunitySheet } from "@/utils/googleSheets";
import { colorTagBySubject, opportunityTag } from "@/utils/colors";

// the cards still render (without counts) if a sheet can't be loaded
async function loadStats() {
  const [courses, opportunities] = await Promise.all([
    getCourseSheet().catch((): CourseListing[] => []),
    getOpportunitySheet().catch((): Opportunity[] => []),
  ]);

  const subjectTags: CardTag[] = SUBJECTS
    .map((subject) => ({ label: subject, count: courses.filter(c => c.subject === subject).length, className: colorTagBySubject(subject) ?? '' }))
    .filter(t => t.count > 0);

  const focusCounts = new Map<string, number>();
  opportunities.flatMap(o => o.focus).filter(Boolean).forEach(f => focusCounts.set(f, (focusCounts.get(f) ?? 0) + 1));
  const focusTags: CardTag[] = Array.from(focusCounts, ([label, count]) => ({ label, count, className: opportunityTag.focus }))
    .sort((a, b) => b.count - a.count);

  const apCount = courses.filter(c => c.rigor === 'AP').length;

  return {
    courseStat: courses.length ? `${courses.length} courses · ${apCount} AP` : undefined,
    opportunityStat: opportunities.length ? `${opportunities.length} opportunities` : undefined,
    subjectTags,
    focusTags,
  };
}

export default async function Home() {
  const { courseStat, opportunityStat, subjectTags, focusTags } = await loadStats();

  return (
    <main className="h-full overflow-y-auto fancy-scrollbar">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 min-h-full">
        <section className="relative overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-6 py-10 md:px-12 md:py-16">
          {/* dotted backdrop and a soft amber glow */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(theme(colors.stone.400)_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(theme(colors.stone.600)_1.25px,transparent_1.25px)] opacity-60 [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)]" />
          <div aria-hidden className="absolute -top-24 -right-16 size-80 rounded-full bg-amber-300/40 dark:bg-amber-400/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 right-1/3 size-72 rounded-full bg-slate-300/40 dark:bg-slate-400/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">Boston Latin Academy</div>
            <h1 className="font-playfair-display text-4xl md:text-6xl font-bold leading-[1.05] text-stone-900 dark:text-stone-50">
              Resources
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="h-10 px-4 inline-flex items-center gap-2 rounded-md bg-stone-900 text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-sm font-semibold transition">
                <LuBookOpen className="size-4" /> Browse courses
              </Link>
              <Link href="/opportunities" className="h-10 px-4 inline-flex items-center gap-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 hover:border-stone-500 dark:hover:border-stone-500 text-sm font-semibold transition">
                <LuCompass className="size-4" /> Find opportunities
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card
            title="Course Catalog"
            description="View this year's course selection catalog"
            link="/catalog"
            icon={<LuBookOpen />}
            stat={courseStat}
            tags={subjectTags}
          />
          <Card
            title="Opportunities"
            description="Find extracurricular opportunities and explore your interests"
            link="/opportunities"
            icon={<LuCompass />}
            stat={opportunityStat}
            tags={focusTags}
          />
        </section>

        <footer className="mt-auto pt-2 pb-1 text-sm text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-x-1.5">
          Made with <FaHeart className="text-red-400 inline-block mx-0.5" /> by <span className="font-semibold text-stone-700 dark:text-stone-300">Phaedra Sanon, Class of &apos;25</span>.
          <span>Open source on <Link href="https://github.com/ph4iry/mybla" className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100">GitHub</Link>.</span>
        </footer>
      </div>
    </main>
  )
}
