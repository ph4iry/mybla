import { getSheet } from "@/utils/googleSheets";

export const revalidate = 3600;

export async function GET() {
  const res = await getSheet();
  return Response.json(res);
}