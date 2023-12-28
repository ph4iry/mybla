import { getSheet } from "@/utils/g-sheets/fetch";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await getSheet();
    console.log(res.find(r => r.reviews.length > 0)?.reviews.map(r => r.ratings))

    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}