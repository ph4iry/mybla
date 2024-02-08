import categorize from "@/utils/embeds/categorize"

export default function Embed({ link }: { link: string | null }) {
  const category = categorize(link);
  return (
    category!.getEmbedLink() === 'NONE' ? (
      <div className="bg-slate-300">This course has provided an <a href={category!.link}>external link!</a></div>
    ) : (
      <div>in other news</div>
    )
  )
}