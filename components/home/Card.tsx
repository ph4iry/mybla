import { ArrowLongRightIcon } from "@heroicons/react/24/outline"

const colorVariants = {
  blue: ['bg-sky-400/20 dark:text-sky-400', 'bg-sky-400'],
  red: ['bg-rose-400/20 dark:text-rose-400', 'bg-rose-400'],
  amber: ['bg-amber-400/20 dark:text-amber-400', 'bg-amber-400'],
  green: ['bg-emerald-400/20 dark:text-emerald-400', 'bg-emerald-400'],
}

export default function Card({ title, description, link, bgColor, callToAction, span }: { title: string, description: string, link: string, bgColor?: keyof typeof colorVariants, callToAction?: string, span?: `col-span-${number}` }) {
  
  return (
    <div className={`flex w-full h-full shadow-xl shadow-zinc-300/30 dark:shadow-zinc-900/30 rounded-md hover:shadow-zinc-300/60 hover:dark:shadow-zinc-900/60 transition hover:-translate-y-1 ${span}`}>
      <div className={"w-2 rounded-l-md shrink-0 " + (bgColor ? colorVariants[bgColor][1] : 'hidden')}></div>
      <div className="p-3 w-full flex flex-col justify-between border-r-2 border-t-2 border-b-2 rounded-r-md dark:border-zinc-700/20 border-zinc-400/20">
        <div className="mb-3">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
        <a href={link} className={"flex items-center w-max px-3 text-base rounded hover:shadow transition py-1 " + (bgColor ? colorVariants[bgColor][0] : 'hidden')}>
          <span>{callToAction || "View"}</span>
          <ArrowLongRightIcon className="ml-2 h-6 inline"/>
        </a>
      </div>
    </div>
  )
}