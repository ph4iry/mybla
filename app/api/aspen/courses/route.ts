import { getCourses } from "@/utils/aspen";
import { Structures } from "bla-aspen";

export async function POST(request: Request) {
  interface RequestBody {
    refreshToken: string;
  }
  const { refreshToken } = await request.json() as RequestBody;
  const [username, password] = Buffer.from(refreshToken, 'base64').toString().split(':');

  // console.log(username, Buffer.from(password, 'base64').toString());
  const data = await getCourses(username, Buffer.from(password, 'base64').toString());
  return Response.json({ 
    ...data
  });
}