

export default function Navigator() {
  return (
    <div className="mr-4 p-4 rounded-md divide-y divide-zinc-600">
      <div className="flex items-center pb-3">
        <h1 className="text-lg font-semibold">Resource Guide</h1>
      </div>
      <div className="flex flex-col gap-2 py-3">
        <a className="flex items-center py-1 text-sm" href="/guide/">
          Getting Started
        </a>
      </div>
      <div className="flex flex-col gap-2 py-3">
        <a className="flex items-center py-1 text-sm" href="/guide/ap-courses">
          Taking AP Courses
        </a>
        {/* <a className="flex items-center py-1 text-sm" href="/guide/calculate-gpa">
          GPA Weighing
        </a> */}
      </div>
    </div>
  )
}