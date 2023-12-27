import categorize from "@/utils/embeds/categorize"

export default function Embed({ link }: { link: string | null }) {
  const category = categorize(link);
  return (
    category!.getEmbedLink() === 'NONE' ? (
      <div className="bg-slate-300">This course has provided a <a href={category!.link}>link to a website!</a></div>
    ) : (
      <div>in other news</div>
    )
  )
}