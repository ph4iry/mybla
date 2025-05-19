import { Opportunity } from "@/types/Listings";
import { AnimatePresence, motion } from "motion/react";
import { FaArrowUpRightFromSquare, FaEnvelope, FaExpand, FaLink, FaXmark } from "react-icons/fa6";

export default function OpportunityPanel({ opportunity, setOpportunity }:{ opportunity: Opportunity | null, setOpportunity: (o: Opportunity | null) => void }) {
  return (
    <AnimatePresence>
      {opportunity && (<>
        <motion.div key="opportunity-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bg-zinc-900/25 w-screen h-screen top-0 left-0 backdrop-blur-sm z-40 flex items-center justify-center p-8">
          <motion.div key="opportunity-panel" initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0}} exit={{ opacity: 0, y: 20 }} transition={{ ease: 'easeInOut' }} className="h-[80vh] max-w-5xl w-full bg-zinc-50 shadow-xl z-50 border overflow-auto relative">
            <div className="border-b h-32 flex items-center justify-between p-8 text-right w-full gap-4 sticky bg-zinc-50 top-0">
              <div>
                <h2 className="text-4xl font-bold font-playfair-display">{opportunity.name}</h2>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <button onClick={() => setOpportunity(null)}>
                  <span className="sr-only">Close</span>
                  <FaXmark className="size-8" />
                </button>
                {/* <button>
                  <span className="sr-only">view in full</span>
                  <FaArrowUpRightFromSquare className="size-6" />
                  </button> */}
              </div>
            </div>
            <div className="p-8 space-y-5">
              <div className="">{opportunity.mission}</div>
              <div className="grid grid-cols-2">
                <div className="flex flex-nowrap gap-2 items-center">
                  <FaEnvelope className="size-4" />
                  <a href={`mailto:${opportunity.email}`} className="underline">{opportunity.email}</a>
                </div>
                <div className="flex flex-nowrap gap-2 items-center">
                  <FaLink className="size-4 inline-block shrink-0" />
                  <a href={`${!opportunity.website.includes('http') ? 'https://' : ''}${opportunity.website}`} className="underline truncate">{opportunity.website}</a>
                </div>
              </div>
              <hr className="" />
              <div className="grid grid-cols-2">
                <div>
                  <div className="text-xl font-bold">Program season</div>
                  <div>{opportunity.dates}</div>
                </div>
                <div>
                  <div className="text-xl font-bold">When to apply</div>
                  <div>{opportunity.deadline}</div>
                </div>
              </div>
              <hr className="" />
              <div className="">
                <div className="text-xl font-bold">Eligibility</div>
                <div className="text-sm flex gap-2 items-center">
                  Grade level:
                  {opportunity.grades.map(((g, i) => (
                    <div key={i} className="flex items-center justify-center size-8 rounded-full border">
                      <span>{g}</span>
                    </div>
                  )))}
                </div>
                <div className="italic"><span className="font-bold">Other requirements:</span> {opportunity.requirements}</div>
              </div>
              <div>
                <div className="font-bold text-xl">Any questions?</div>
                <div className="flex flex-nowrap gap-2 items-center">
                <FaEnvelope className="size-4" />
                <a href={`mailto:${opportunity.contactEmail}`} className="underline">{opportunity.contactEmail}</a>
              </div>
              </div>
              <div className="">
                <div className="font-bold text-xl">Tags</div>
                <div className="flex gap-2 flex-wrap mb-2">
                  <span>Organizational Focus:</span>
                  {opportunity.focus.map((goal, i) => (
                    <span key={i} className="bg-rose-50 text-rose-600 py-1 px-2 rounded-md">{goal}</span>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span>Type of programming:</span>
                  {opportunity.programming.map((program, i) => (
                    <span key={i} className="bg-orange-50 text-orange-600 py-1 px-2 rounded-md">{program}</span>
                  ))}
                </div>
              </div>
              {/* <div className="italic">Sign up for this course during course selection with code: <strong></strong>.</div> */}
              
            </div>
          </motion.div>
        </motion.div>
      </>)}
    </AnimatePresence>
  )
}

/*
all properties of opportunity: 
{
  name: string;
  mission: string;
  website: string;
  email: string;
  contactEmail: string;
  focus: string[];
  programming: string[];
  grades: number[];
  dates: string;
  requirements: string;
  deadline: string;
}
*/