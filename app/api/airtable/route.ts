import { StoredCourses } from "@/types/Storage";
import { findUserByUsername, updateUser, handleLogin, createUser, StudentRecord } from "@/utils/airtable";
import { getCourses, getStudentInfo } from "@/utils/aspen";
import { getHash } from "@/utils/security";
import { Structures } from "bla-aspen";

export async function POST(request: Request) {
  interface RequestBody {
    refreshToken: string; // username:base64password
    method: 'profile' | 'courses';
  }

  const { refreshToken, method } = await request.json() as RequestBody;
  const [username, password] = Buffer.from(refreshToken, 'base64').toString().split(':');

  switch (method) {
    case 'profile': {
      const record = await findUserByUsername(username);
      const user: StudentRecord = record.fields as unknown as StudentRecord;

      if (record) {
        const h = getHash(password, record.fields.salt as string);
        if (record.fields.hash as string === h.hash) {
          return Response.json({
            ...record.fields,
            salt: undefined,
            hash: undefined,
          });  
        } else {
          const data: Structures.Student = await getStudentInfo(username, Buffer.from(password, 'base64').toString());
          if (data) {
            updateUser(data.studentId, {
              ...h
            });

            return Response.json({
              ...record.fields,
              salt: undefined,
              hash: undefined,
            }); 
          } else {
            return new Response(null, { status: 401 });
          }
        }
      }
    }
    case 'courses': {
      const record = await findUserByUsername(username);
      const user: StudentRecord = record.fields as unknown as StudentRecord;

      if (record) {
        const h = getHash(password, record.fields.salt as string);
        if (record.fields.hash as string === h.hash) {
          return Response.json({
            ...JSON.parse(user.coursesJSON!),
          });  
        } else {
          const data: StoredCourses = (await getCourses(username, Buffer.from(password, 'base64').toString()))!;
          if (data) {
            updateUser(user.studentId, {
              ...h
            });

            return Response.json({
              ...JSON.parse(user.coursesJSON!),
            });  
          } else {
            return new Response(null, { status: 401 });
          }
        }
      }
    }
  }

  return new Response(null, { status: 404 });
}