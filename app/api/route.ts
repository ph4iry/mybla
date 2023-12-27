import { getSheet } from "@/utils/g-sheets/fetch";

export const revalidate = 3600;

export async function GET() {
  const res = await getSheet();

  return Response.json(res);
}