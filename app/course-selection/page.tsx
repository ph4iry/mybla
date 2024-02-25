import SharedSelection from "@/components/shareables/SharedSelection"
import { Item } from "@/types/Listings";
import { getSheet } from "@/utils/g-sheets/fetch";

export async function generateMetadata({ searchParams }:{ searchParams: { name: string }}) {
  return {
    title: `${searchParams.name || ''} Course Selection | myBLA`.trim(),
  }
}

export default async function CourseSelectionView() {
  const sheet: Item[] = await getSheet();
  
  return (
    <div><SharedSelection sheet={sheet} /></div>
  )
}