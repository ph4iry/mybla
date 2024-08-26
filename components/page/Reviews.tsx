'use client';
import { Review } from "@/types/Listings";
import { Disclosure, Transition } from "@headlessui/react";
import { HiOutlineBeaker, HiOutlineBookOpen, HiChevronRight, HiOutlineClock, HiOutlineCursorArrowRays, HiOutlineInboxArrowDown, HiOutlineUserGroup } from 'react-icons/hi2';
import { Fragment } from "react";
import { Tooltip } from "@material-tailwind/react";
import SkillTutorial from "./SkillTutorial";

export default function Reviews({ reviews } : { reviews: Review[] }) {
  if (!reviews) reviews = [];
  // SKILLS
  const humanitiesSkillData = reviews.map(review => review.ratings.skills.humanities).flat()
  const sortedHumanities = sortAndCountReviews(humanitiesSkillData);
  const humanities = {
    data: humanitiesSkillData,
    sorted: sortedHumanities,
  };

  const stemStillData = reviews.map(review => review.ratings.skills.stem).flat()
  const sortedStemSkillData = sortAndCountReviews(stemStillData);
  const stem = {
    data: stemStillData,
    sorted: sortedStemSkillData,
  };

  const personalSkillData = reviews.map(review => review.ratings.skills.personal).flat()
  const sortedPersonalSkillData = sortAndCountReviews(personalSkillData);
  const personal = {
    data: personalSkillData,
    sorted: sortedPersonalSkillData,
  };
  
  // COMMITMENT / RIGOR
  const weeklyData = reviews.map(review => review.ratings.weeklyCommitment).flat();
  const mostFrequentWeeklyCommitmentReport = Object.entries(sortAndCountReviews(weeklyData)).sort((a, b) => b[1] - a[1])[0];

  const homeworkData = reviews.map(review => review.ratings.homework).flat();
  const mostFrequentHomeworkReport = Object.entries(sortAndCountReviews(homeworkData)).sort((a, b) => b[1] - a[1])[0];
  
  const resourceData = reviews.map(review => review.ratings.resources).flat();
  const mostFrequentResourceReport = Object.entries(sortAndCountReviews(resourceData)).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="mt-4">
      <h2 className="text-3xl font-semibold">Student Voice</h2>
      <p className="italic mb-2">Learn about how this works <a className="underline" href="/guide/student-voice">here</a>.</p>
      { reviews.length > 0 ? (
        <div className="space-y-4">
          {/* <div className="bg-zinc-100/80 dark:bg-zinc-700 p-4 rounded">
            <h3 className="text-2xl font-semibold mb-2">Course Commitment</h3>
            <p className="italic text-base">How much time are students expected to put into this course?</p>
            <h4 className="text-xl font-semibold my-2">Weekly Commitment (includes homework and projects outside of class time)</h4>
            <div className="flex gap-2">
              {weeklyData.map((comment, i) => (
                <Fragment key={i}>
                  <CommitmentTag text={comment} type="weekly" quantity={sortedWeeklyData[i][1]}/>
                </Fragment>
              ))}
            </div>
            <h4 className="text-xl font-semibold my-2">Homework Load</h4>
            <div className="flex gap-2">
              {homeworkData.map((comment, i) => (
                <Fragment key={i}>
                  <CommitmentTag text={comment} type="homework" quantity={sortedHomeworkData[i][1]}/>
                </Fragment>
              ))}
            </div>
            <h4 className="text-xl font-semibold my-2">Available Online Resources</h4>
            <div className="flex gap-2">
              {resourceData.map((comment, i) => (
                <Fragment key={i}>
                  <CommitmentTag text={comment} type="resources" quantity={sortedResourceData[i][1]}/>
                </Fragment>
              ))}
            </div>
          </div> */}
          <div className="bg-zinc-100/80 dark:bg-zinc-700 rounded-lg">
            <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full p-4 text-left bg-black/20 rounded-lg justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-zinc-500 dark:text-zinc-300 underline">Skills Summary</h3>
                    <p className="text-base italic">What skills will help a student succeed in this course?</p>
                  </div>
                  <HiChevronRight className={`h-8 translate ${open ? 'rotate-90' : ''}`} />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="p-4 rounded-lg">
                  {
                    humanities.data.length > 0 && (
                    <>
                      <h4 className="text-xl font-semibold my-2 text-amber-500">Humanities</h4>
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(humanities.sorted).map((comment, i) => (
                          <Fragment key={i}>
                            <SkillTag type="humanities" text={comment[0]} quantity={comment[1]}/>
                          </Fragment>
                        ))}
                      </div>
                    </>
                    )
                  }

                  {
                    stem.data.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold my-2 text-emerald-500">STEM</h4>
                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(stem.sorted).map((comment, i) => (
                            <Fragment key={i}>
                              <SkillTag type="stem" text={comment[0]} quantity={comment[1]}/>
                            </Fragment>
                          ))}
                        </div>
                      </>
                    )
                  }

                  { 
                    personal.data.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold my-2 text-sky-500">Personal</h4>
                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(personal.sorted).map((comment, i) => (
                            <Fragment key={i}>
                              <SkillTag type="personal" text={comment[0]} quantity={comment[1]}/>
                            </Fragment>
                          ))}
                        </div>
                      </>
                    )
                  }
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
            </Disclosure>
            

          </div>
          {/* <div>
            <h3 className="text-2xl font-semibold mb-1">Submissions ({reviews.length})</h3>
            <SkillTutorial />
          </div>
          <div className="my-2">
            
          </div> */}
          {/* {
            reviews.map((review, i) => {


              return (
                <div className="bg-zinc-100/80 dark:bg-zinc-700 p-4" key={i}>
                  <div className="text-lg font-semibold">{review.name && review.name !== "" ? review.name : "Anonymous Student"}</div>
                  <div className="flex flex-wrap gap-2 my-3">
                    <CommitmentTag text={review.ratings.weeklyCommitment} type="weekly"/>
                    <CommitmentTag text={review.ratings.homework} type="homework"/>
                    <CommitmentTag text={review.ratings.resources} type="resources"/>
                  </div>
                </div>
              )
            })
          } */}
        </div>
      ) : (
        <div>There are no student submissions available for this course.</div>
      )}
    </div>
  )
}


type CommitmentTagType = 'weekly' | 'homework' | 'resources';

function CommitmentTag({ text, type, quantity }:{ text: string, type: CommitmentTagType, quantity?: number }) {
  const color = (() => {
    switch(type) {
      case "weekly": return ['bg-rose-400/30', 'bg-rose-400'];
      case "homework": return ['bg-fuchsia-400/30', 'bg-fuchsia-400'];
      case "resources": return ['bg-blue-400/30','bg-blue-400'];
    }
  })();

  const explanation = (() => {
    switch(type) {
      case "weekly": return "Weekly Commitment"
      case "homework": return "Homework Load"
      case "resources": return "Available Resources\n(ex. Khan Academy, Youtube Videos)"
    }
  })();
  return (
    <span className={`md:inline inline-flex md:gap-0 px-3 py-1.5 md:rounded-full rounded ${color[0]} md:whitespace-nowrap text-sm items-center`}>
      <Tooltip
        content={explanation}
        placement="top"
        className={`${color[1]} rounded-full text-center`}
      >
        <button><CommitmentTagIcon type={type}/></button>
      </Tooltip>
      <span>{text}</span> {quantity && quantity > 0 ? `(${quantity})` : null}
    </span>
  )
}

function CommitmentTagIcon({ type }: { type: CommitmentTagType }) {
  switch (type) {
    case "weekly":
      return (
        <HiOutlineClock className="inline h-6 shrink-0 mx-1 mr-2 text-rose-400"/>
      );
    case "homework":
      return (
        <HiOutlineInboxArrowDown className="inline h-6 shrink-0 mx-1 mr-2 text-fuchsia-400"/>
      );
    case "resources":
      return (
        <HiOutlineCursorArrowRays className="inline h-6 shrink-0 mx-1 mr-2 text-blue-400"/>
      );
  }
}

type SkillTagType = 'humanities' | 'stem' | 'personal'

function SkillTag({ text, type, quantity }:{ text: string, type: SkillTagType, quantity?: number }) {
  const color = (() => {
    switch(type) {
      case "humanities": return 'bg-amber-400/30';
      case "stem": return 'bg-emerald-400/30';
      case "personal": return 'bg-sky-400/30';
    }
  })();

  return (
    <span className={`md:inline inline-flex md:gap-0 px-3 py-1.5 md:rounded-full rounded ${color} md:whitespace-nowrap text-sm items-center`}><SkillTagIcon type={type}/> {text} {quantity && quantity > 0 ? `(${quantity})` : null}</span>
  )
}

function SkillTagIcon({ type }: { type: SkillTagType }) {
  switch (type) {
    case "humanities":
      return (
        <HiOutlineBookOpen className="inline h-6 shrink-0 mx-1 text-amber-400"/>
      );
    case "stem":
      return (
        <HiOutlineBeaker className="inline h-6 shrink-0 mx-1 text-emerald-400"/>
      );
    case "personal":
      return (
        <HiOutlineUserGroup className="inline h-6 shrink-0 mx-1 text-sky-400"/>
      );
  }
}

function sortAndCountReviews(arr: string[]): {
  [index: string]: number,
} {
  const count: {
    [index: string]: number,
  } = {};

  for (const element of arr) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  return count;
}