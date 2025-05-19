import Sheet from "@/components/v3/OpportunitySheet";
import OpportunitySheetWrapper from "@/components/v3/OpportunitySheetWrapper";
import { Opportunity } from "@/types/Listings";
import { getOpportunitySheet } from "@/utils/googleSheets";
import { PiStarFourFill } from 'react-icons/pi'

export default async function OpportunityCatalog() {
  const sheet: Opportunity[] = await getOpportunitySheet();
  const removeFromSheet = ['link', 'reviews'];
  const headers = (Object.keys(sheet[0])).filter(key => !removeFromSheet.includes(key)).map(key => key.charAt(0).toUpperCase() + key.slice(1));

  // console.log(sheet)
  return (
    <div className="h-full overflow-hidden rounded-xl p-2">
      <div className="flex gap-3 items-center">
        <PiStarFourFill className="size-7" />
        <h1 className="font-playfair-display font-bold text-2xl md:text-3xl uppercase">Opportunity & Activity Catalog</h1>
        {/* <PiStarFourFill className="size-7" /> */}
      </div>
      <hr className="my-3" />
      <div className="h-full overflow-hidden">
        <OpportunitySheetWrapper headers={headers} sheet={sheet} />
      </div>
    </div>
  );
}