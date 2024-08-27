import { HiArrowRight } from 'react-icons/hi2';

export default function Page() {
  return (
    <main className="w-full h-full relative flex md:flex-row flex-col justify-between">
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-4xl font-bold">Level up your student experience this year.</h1>
        <p className="mt-4 text-lg">Boston Latin Academy Resources only a click away</p>
        <div className="flex gap-4 mt-6">
          <a href="/students/login" className="p-4 rounded-md dark:bg-amber-300/20 text-sky-400 bg-sky-300/20 dark:text-amber-400 flex gap-2 flex-nowrap">Start your journey now <HiArrowRight className="size-6" /></a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0 md:-rotate-3">
        <div className="md:size-48 bg-zinc-200 rounded-xl text-black p-4 text-center flex justify-center items-center">View your schedule- updating during the day in real time.</div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="md:size-48 bg-zinc-300 rounded-xl text-black p-4 text-center flex justify-center items-center">Submit a course summary, straight from your portal</div>
        <div className="md:size-48 bg-zinc-500 rounded-xl text-black p-4 text-center flex justify-center items-center">Tons of more utilities, such as an interactive locker map!</div>
        <div className="hidden md:block"></div>
        <div></div>
      </div>
    </main>
  )
}