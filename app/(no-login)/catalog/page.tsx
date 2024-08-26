import CatalogSearch from '@/components/search/CatalogSearch';
import { Item } from '@/types/Listings';
import { checkEnvironment } from '@/utils/environment';

export const revalidate = 3600;

export default async function Catalog() {
  const sheet: Item[] = await (await fetch(checkEnvironment() + '/api', { method: 'GET' })).json();

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Course Catalog</h1>
      <p className="italic mb-2">View available courses and click on the course title for more details!</p>
      <span className="block text-sm mb-4 text-black/70 dark:text-zinc-200/80">This page (and course pages linked below) update hourly from <a href="https://docs.google.com/spreadsheets/d/1b2bc7mICAUj_3JMU6fjlztVjycPNPviBAa2GtCqgXng/edit#gid=0" className="underline">this year&apos;s course offerings</a>.</span>
      
      <CatalogSearch sheet={sheet}/>
    </div>
  )
}
