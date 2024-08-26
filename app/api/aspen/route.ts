import { getAspenData } from "@/utils/aspen";

export async function POST(request: Request) {
  const res = await request.json();
  
  const data = await getAspenData(res.username, res.password);
  return Response.json({ ...data });
}