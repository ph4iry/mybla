import Sheet from "@/components/v3/OpportunitySheet";
import OpportunitySheetWrapper from "@/components/v3/OpportunitySheetWrapper";
import { Opportunity } from "@/types/Listings";
import { getOpportunitySheet } from "@/utils/googleSheets";

export default async function OpportunityCatalog() {
  const sheet: Opportunity[] = await getOpportunitySheet();
  const removeFromSheet = ['link', 'reviews'];
  const headers = (Object.keys(sheet[0])).filter(key => !removeFromSheet.includes(key)).map(key => key.charAt(0).toUpperCase() + key.slice(1));

  // console.log(sheet)
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex gap-2 items-center mb-3">
        <h1 className="font-playfair-display font-bold text-lg md:text-xl">Opportunities &amp; Activities</h1>
      </div>
      <OpportunitySheetWrapper headers={headers} sheet={sheet} />
    </div>
  );
}