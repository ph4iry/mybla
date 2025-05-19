import { getOpportunitySheet } from "@/utils/googleSheets";

export const revalidate = 3600;

export async function GET() {
  const res = await getOpportunitySheet();
  return Response.json(res);
}