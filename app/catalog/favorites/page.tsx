import FavoriteCoursesSummary from "@/components/search/Favorites";
import { Item } from "@/types/Listings";
import { checkEnvironment } from "@/utils/environment";
import { getSheet } from "@/utils/g-sheets/fetch";

export const revalidate = 3600;

export default async function FavoritesPage() {
  const sheet: Item[] = await (await fetch(checkEnvironment() + '/api', { method: 'GET' })).json();

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Favorites</h1>
      <FavoriteCoursesSummary sheet={sheet}/>
      {/* <h2 className="text-3xl font-semibold">By Subject</h2>
      <FavoriteCoursesBySubject sheet={sheet} /> */}
    </div>
  )
}