import { getSheet } from "@/utils/g-sheets/fetch";

// export const revalidate = 10;

export async function GET() {
  try {
    const res = await getSheet();
    console.log(res.find(r => r.name.includes("AP Computer Science")))

    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}