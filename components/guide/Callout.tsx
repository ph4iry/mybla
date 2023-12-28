import { ReactNode } from "react"

const colorVariants = {
  blue: ['bg-sky-400/10', 'bg-sky-400'],
  red: ['bg-rose-400/10', 'bg-rose-400'],
  amber: ['bg-amber-400/10', 'bg-amber-400'],
  green: ['bg-emerald-400/10', 'bg-emerald-400'],
}

export default function Callout({ children, color }: { children: ReactNode, color: keyof typeof colorVariants }) {
  
  return (
    <div className={"flex w-full h-full rounded transition " + colorVariants[color][0]}>
      <div className={"w-2 rounded-l shrink-0 " + colorVariants[color][1]}></div>
      <div className="py-2 px-3 w-full flex flex-col rounded-r">
        {children}
      </div>
    </div>
  )
}