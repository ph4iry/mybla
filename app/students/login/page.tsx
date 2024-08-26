import LoginForm from "@/components/student-protected/LoginForm";

export default function LogIn() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full md:w-2/3 h-full flex flex-col justify-center md:p-16">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-bold mb-2">Log in with Aspen to continue</h1>
          <div className="text-sm text-zinc-400">Your academic journey doesn&apos;t stop at the course catalog! Log in with Aspen to get academic insights.</div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}