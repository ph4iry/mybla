import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa6";
import Card from "@/components/v3/Card";

export default function Home() {
  return (
    <main>
      <p className="text-base italic font-light">Made with <FaHeart className="text-red-400 inline-block mx-2" /> by <span className="font-semibold">Phaedra Sanon, Class of &apos;25</span>. This site is open source on <Link href="https://github.com/ph4iry/mybla" className="underline underline-offset-2">Github</Link>.</p>
      <div className="border rounded-md p-6 mt-6">
        <div className="text-sm font-bold uppercase text-amber-500 mb-4">Resources</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Navigate myBLA" description="Got questions? Get them answered!" link="/guide" section="resources" />
          <Card title="Course Catalog" description="View this year&apos;s course selection catalog" link="/catalog" section="resources" />
          <Card title="Opportunities" description="Find extracurricular opportunities and explore your interests" link="/opportunities" section="resources" />
        </div>
      </div>
      {/* <div className="border rounded-md p-6 mt-6">
        <div className="text-sm font-bold uppercase text-blue-500 mb-4">Academic Links</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Navigate myBLA" description="Got questions? Get them answered!" link="/guide" section="academics" />
          <Card title="Course Catalog" description="View this year&apos;s course selection catalog" link="/catalog" section="academics" />
          <Card title="Opportunities" description="Find extracurricular opportunities and explore your interests" link="/opportunities" section="academics" />
        </div>
      </div> */}
    </main>
  )
}