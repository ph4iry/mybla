import { redirect } from "next/navigation";

export default function Redirect({ params }: {params: { code: string }}) {
  redirect(`/catalog/${params.code}`)
}