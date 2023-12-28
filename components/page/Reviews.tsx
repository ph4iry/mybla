'use client';
import { Review } from "@/types/Listings";
import { Fragment } from "react";
import { StarRating } from 'star-rating-react-ts'

export default function Reviews({ reviews } : { reviews: Review[] }) {
  if (reviews) {
    const overallAverage = reviews.length > 0 ? reviews.map(r => r.ratings.overall).reduce((a, b) => a + b) / reviews.length : 0
    const rigorAverage = reviews.length > 0 ? reviews.map(r => r.ratings.rigor).reduce((a, b) => a + b) / reviews.length : 0
    const supportAverage = reviews.length > 0 ? reviews.map(r => r.ratings.support).reduce((a: number, b: number) => a + b) / reviews.length : 0
    const homeworkAverage = reviews.length > 0 ? reviews.map(r => r.ratings.homework).reduce((a, b) => a + b) / reviews.length : 0
    return (
      <div className="mt-4">
        <h2 className="text-3xl font-semibold mb-2">Student Ratings</h2>
        {/* <p className="italic">Note: These are student-submitted comments on the courses they&apos;ve taken. While these reviews may not depict what your experience taking the course will be like, the comments submitted are subject to moderation and deletion.</p> */}
        {reviews.length !== 0 ? (
          <>
            <div className="flex gap-3 items-center justify-center flex-wrap flex-col md:flex-row dark:bg-zinc-700/50 bg-zinc-100/75 p-4 rounded">
              <div className="shrink-0 basis-1/3 flex flex-col items-center justify-center flex-nowrap whitespace-nowrap">
                <span className="font-bold text-2xl">{overallAverage.toFixed(1)} ({reviews.length})</span>
                <StarRating
                  readOnly initialRating={overallAverage}
                  theme={{
                    colors: {
                      backgroundColorActive: '#facc15',
                      backgroundDefault: '#404040'
                    },
                    size: 36
                  }}
                />
              </div>
              <div className="grow">
                <table className="table-fixed border-collapse">
                  <tbody className="divide-y divide-zinc-500/30">
                    <tr className="py-2">
                      <td className="min-w-36">
                        <span className="font-semibold text-lg">Rigor</span>
                      </td>
                      <td className="px-3">
                        {rigorAverage.toFixed(1)}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <progress
                            className="w-24 md:w-56 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400"
                            value={rigorAverage}
                            max={5}
                          ></progress>
                        </div>
                      </td>
                    </tr>
                    <tr className="py-2">
                      <td>
                        <span className="font-semibold text-lg">Homework </span>
                      </td>
                      <td className="px-3">
                        {homeworkAverage.toFixed(1)}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          
                          <progress
                            className="w-24 md:w-56 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400"
                            value={homeworkAverage}
                            max={5}
                          ></progress>
                        </div>
                      </td>
                    </tr>
                    <tr className="py-2">
                      <td>
                        <span className="font-semibold text-lg">Extra Support</span>
                      </td>
                      <td className="px-3">
                        {supportAverage.toFixed(1)}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <progress
                            className="w-24 md:w-56 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400"
                            value={supportAverage}
                            max={5}
                          ></progress>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mt-4 mb-2">{reviews.length} Review{pluralize(reviews.length)}</h3>
            {
              reviews.map((review, i) => (
                <Fragment key={i}>
                  <Review data={review}/>
                </Fragment>
              ))
            }
          </>
          ) : (
            <div className="">
              There aren&apos;t any ratings available for this course to display.
            </div>
          )
        }
      </div>
    )
  } else {
    return <div></div>
  }
}

function pluralize(num: number) {
  if (num === 1) return ''
  else return 's';
}

function Review({ data }: { data: Review }) {
  const homeworkScaleTranslation = (num: 1 | 2 | 3 | 4 | 5) => {
    switch (num) {
      case 1: return 'Very Light'
      case 2: return 'Light'
      case 3: return 'Moderate'
      case 4: return 'Heavy'
      case 5: return 'Very Heavy'
    }
  }

  const rigorScaleTranslation = (num: 1 | 2 | 3 | 4 | 5) => {
    switch (num) {
      case 1: return 'Easy'
      case 2: return 'Kinda Easy'
      case 3: return 'So-So'
      case 4: return 'Kinda Hard'
      case 5: return 'Hard'
    }
  }

  const supportScaleTranslation = (num: 1 | 2 | 3 | 4 | 5) => {
    switch (num) {
      case 1: return 'Little to no support'
      case 2: return 'Some support'
      case 3: return 'Adequate support'
      case 4: return 'Pretty good support'
      case 5: return 'Plenty of support'
    }
  }
  return (
    <div className="block dark:bg-zinc-700/50 bg-zinc-100/75 p-4">
      <div className="font-medium text-lg">
        <span className="mr-3 font-bold">{data.name === '' ? 'Anonymous' : data.name}</span>
        <div className="inline-flex items-center rounded-full flex-nowrap bg-sky-300/20 px-3 py-1">
          <span className="mr-3 font-bold">{data.ratings.overall} star{pluralize(data.ratings.overall)}</span>
          <StarRating
            readOnly initialRating={data.ratings.overall}
            theme={{
              colors: {
                backgroundColorActive: '#facc15',
                backgroundDefault: '#404040'
              },
              size: 20
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap leading-6 my-3">
        <div className="inline-flex">
          Rigor: <span className="font-bold ml-2">{data.ratings.rigor}/5 - {rigorScaleTranslation(data.ratings.rigor as 1 | 2 | 3 | 4 | 5)}</span>
        </div>
        <div className="inline-flex">
          Homework:<span className="font-bold ml-2">{data.ratings.homework}/5 - {homeworkScaleTranslation(data.ratings.homework as 1 | 2 | 3 | 4 | 5)}</span>
        </div>
        <div className="inline-flex">
          Extra Support/Resources:<span className="font-bold ml-2">{data.ratings.support}/5 - {supportScaleTranslation(data.ratings.support as 1 | 2 | 3 | 4 | 5)}</span>
        </div>
        <div className="inline-flex">
          Would recommend to a friend?<span className="font-bold ml-2">{data.wouldRecommend}</span>
        </div>
      </div>
      <div className="content my-2">
        {data.comment}
      </div>
      {
        data.tips && (
          <div>
            <span className="font-bold">Tips and Tricks: </span> {data.tips}
          </div>
        )
      }
    </div>
  )
}