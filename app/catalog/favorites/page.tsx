import FavoriteCoursesSummary from "@/components/search/Favorites";
import { Item } from "@/types/Listings";
import { checkEnvironment } from "@/utils/environment";

export const revalidate = 3600;

export const metadata = {
  title: "Catalog Favorites | myBLA"
};

export default async function FavoritesPage() {
  const sheet: Item[] = await (await fetch(checkEnvironment() + '/api', { method: 'GET' })).json();

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Catalog Favorites</h1>
      <FavoriteCoursesSummary sheet={sheet}/>
    </div>
  )
}