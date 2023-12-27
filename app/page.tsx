import Card from "@/components/home/Card";
import { LinkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
export default function Home () {
  return (
    <div className="">
      <h1 className="text-4xl font-bold flex items-center gap-2">Home</h1>
      <p className="italic text-sm">The hub for BLA students to explore courses and prospective careers. Made with <HeartIcon className="h-4 text-rose-400 inline" /> by Phaedra Sanon, &apos;25.</p>
      <h2 className="text-2xl font-semibold my-2"><LinkIcon className="inline h-6 stroke-2"/> Quick Links</h2>
      <div id="stuff" className="flex flex-col md:grid md:grid-cols-4 gap-4">
        <Card title="Navigation Guide" description="Read the guide to navigating this website" link="/guide" bgColor="red"/>
        <Card title="Course Catalog" description="View this year's course selection catalog" link="/catalog" bgColor="amber"/>
        <Card title="College Vigor" description="BLA College Vigor, a one-stop-shop for college resources" link="https://www.collegevigorbla.com/" bgColor="green"/>
        <Card title="Naviance" description="Explore careers and colleges" link="https://student.naviance.com/bla" bgColor="blue"/>
      </div>
    </div>
  )
}