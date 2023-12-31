import Filters from '@/components/search/Filters';
import { Item } from '@/types/Listings';
import { checkEnvironment } from '@/utils/environment';

// export const revalidate = 3600;


export default async function Catalog() {
  const sheet: Item[] = await (await fetch(checkEnvironment() + '/api', { method: 'GET' })).json();

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Course Catalog</h1>
      <p className="italic mb-3">View available courses and click on the course title for more details! </p>
      <Filters sheet={sheet}/>
    </div>
  )
}
