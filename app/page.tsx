import Card from "@/components/home/Card";
import { HiLink, HiHeart, HiOutlineSquares2X2, HiOutlineAcademicCap } from 'react-icons/hi2';

export default function Home () {
  return (
    <div className="space-y-3">
      <div id="welcome">
        <h1 className="text-4xl font-bold flex items-center gap-2">Home</h1>
        <p className="italic text-sm">The hub for BLA students to explore courses and prospective careers. Made with <HiHeart className="h-4 text-rose-400 inline" /> by Phaedra Sanon, &apos;25.</p>
      </div>
      <div id="jumbo">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-amber-400/10 shadow-md to-black/10 col-span-2 rounded-md p-6 flex items-start justify-end flex-col min-h-[25vh]">
            <h2 className="text-3xl font-semibold">NEW: myBLA for Students</h2>
            {/* <p>A new school year means a new era for myBLA!</p> */}
            <p className="mt-3 italic text-sm">Tons of more features have been added this summer-- log in with Aspen to check it out!</p>
          </div>
          <div className="bg-black/2 col-span-1">
            action to check out the site
          </div>
        </div>
      </div>
      <div id="quick-links" className="">
        <h2 className="text-2xl font-semibold my-2 inline-flex items-center"><HiLink className="inline h-6 stroke-2 mr-2"/> Quick Links</h2>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <Card title="Navigation Guide" description="Read the guide to navigating this website" link="/guide" bgColor="red" callToAction="Read"/>
          <Card title="Course Catalog" description="View this year's course selection catalog" link="/catalog" bgColor="amber" callToAction="Explore"/>
          <Card title="College Vigor" description="BLA College Vigor, a one-stop-shop for college resources" link="https://www.collegevigorbla.com/" bgColor="green" callToAction="Visit"/>
          <Card title="Naviance" description="Explore careers and colleges" link="https://student.naviance.com/bla" bgColor="blue"/>
        </div>
      </div>
      <div id="quick-links-catalog">
        <h2 className="text-2xl font-semibold my-2 inline-flex items-center"><HiOutlineSquares2X2 className="inline h-6 stroke-2 mr-2"/> Course Catalog</h2>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <Card
            title="Guide: Student Voice on myBLA"
            description="How myBLA amplifies student voice in course selection"
            link="/guide/student-voice"
            bgColor="red"
            span="col-span-2"
            callToAction="Read"
          />
          <Card
            title="Favorites"
            description="View favorited courses and share them"
            link="/catalog/favorites"
            bgColor="amber"
          />
          <Card
            title="Guide: Shareables"
            description="Create a shareable link or PDF of your course selection"
            link="/guide/shareables"
            bgColor="red"
            callToAction="Read"
          />
        </div>
      </div>
      <div id="quick-links-academics">
        <h2 className="text-2xl font-semibold my-2 inline-flex items-center"><HiOutlineAcademicCap className="inline h-6 stroke-2 mr-2"/> Academics</h2>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <Card
            title="Aspen SIS"
            description="Check your grades in your classes and view your schedule"
            link="https://sis.mybps.org"
            bgColor="green"
          />
          <Card
            title="College Board"
            description="Explore the College Board website to find information on the SAT, scholarships, and careers"
            link="https://www.collegeboard.org/"
            bgColor="blue"
          />
          <Card
            title="AP Classroom"
            description="AP courses are registered on AP Classroom to confirm your registration for the AP exam. Additionally, teachers may assign work here."
            link="https://apclassroom.collegeboard.org/"
            bgColor="blue"
            span="col-span-2"
          />
        </div>
      </div>
    </div>
  )
}