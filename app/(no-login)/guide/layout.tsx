import { ReactNode } from "react";
import Navigator from "@/components/guide/Navigator";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function GuideLayout({ children } : { children: ReactNode }) {
  return (
    <div>
      <a href="/" className="flex text-md items-center font-medium group w-fit mb-3"><HiOutlineArrowLeft className="h-6 mr-1 group-hover:mr-2 transition-all stroke-2" /> Home</a>
      <div className="flex flex-col md:flex-row">
        <Navigator />
        <div>
        <article id="content" className="prose dark:prose-invert prose-zinc leading-4 w-full max-w-6xl">
          {children}
        </article>
        </div>
      </div>
    </div>

  )
}