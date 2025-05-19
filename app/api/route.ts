import { getCourseSheet } from "@/utils/googleSheets";

export const revalidate = 3600;

export async function GET() {
  const res = await getCourseSheet();
  return Response.json(res);
}