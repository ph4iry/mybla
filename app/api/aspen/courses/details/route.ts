import { getCourses, getIndividualCourse } from "@/utils/aspen";
import { Structures } from "bla-aspen";

export async function POST(request: Request) {
  interface RequestBody {
    refreshToken: string;
    sectionNumber: string;
    year: 'previous' | 'current';
  }
  const { refreshToken, sectionNumber, year } = await request.json() as RequestBody;
  const [username, password] = Buffer.from(refreshToken, 'base64').toString().split(':');

  // console.log(username, Buffer.from(password, 'base64').toString());
  const data = await getIndividualCourse(username, Buffer.from(password, 'base64').toString(), sectionNumber, year).catch();
  return Response.json({ 
    ...data
  });
}