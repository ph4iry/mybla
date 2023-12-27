import Filters from '@/components/search/Filters';
import { Item } from '@/types/Listings';
export const revalidate = 3600;


export default async function Catalog() {
  console.log('loading...');
  const sheet: Item[] = await (await fetch(process.env.URL + '/api', { method: 'GET' })).json();

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Course Catalog</h1>
      <p className="italic mb-3">View available courses and click on the course title for more details! </p>
      <Filters sheet={sheet}/>
    </div>
  )
}
