import Link from "next/link";
import { ReactNode } from "react";
import { LuArrowRight } from "react-icons/lu";

export type CardTag = { label: string, count: number, className: string };

export default function Card({ title, description, link, icon, stat, tags }:{
  title: string,
  description: string,
  link: string,
  icon: ReactNode,
  stat?: string,
  tags?: CardTag[],
}) {
  return (
    <Link href={link} className="group relative flex flex-col gap-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 transition hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-lg dark:hover:shadow-black/40">
      <div className="flex items-start gap-4">
        <div className="size-11 shrink-0 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center [&>svg]:size-5">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="font-playfair-display text-2xl font-bold leading-tight">{title}</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{description}</p>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t.label} className={`h-6 inline-flex items-center gap-1.5 px-2 rounded text-xs whitespace-nowrap ${t.className}`}>
              {t.label}
              <span className="opacity-60 tabular-nums">{t.count}</span>
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800 text-sm">
        <span className="text-stone-500 dark:text-stone-400 tabular-nums">{stat}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
          Explore
          <LuArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
