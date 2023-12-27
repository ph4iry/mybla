import { checkEnvironment } from "@/utils/environment";
import { getSheet } from "@/utils/g-sheets/fetch";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await (await fetch(checkEnvironment() + '/api', { method: 'GET' })).json();

    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}