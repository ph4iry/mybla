import { findUserByUsername, updateUser, handleLogin, createUser, StudentRecord } from "@/utils/airtable";
import { getStudentInfo } from "@/utils/aspen";
import { getHash } from "@/utils/security";
import { Structures } from "bla-aspen";

export async function POST(request: Request) {
  interface RequestBody {
    refreshToken: string; // username:base64password
    fields: Partial<StudentRecord>
  }

  const { refreshToken, fields } = await request.json() as RequestBody;
  const [username, password] = Buffer.from(refreshToken, 'base64').toString().split(':');

  const record = await findUserByUsername(username);
  const user: StudentRecord = record.fields as unknown as StudentRecord;

  if (record) {
    const h = getHash(password, record.fields.salt as string);
    if (record.fields.hash as string === h.hash) {
      updateUser(user.studentId, {
        ...fields
      });
    } else {
      const data: Structures.Student = await getStudentInfo(username, Buffer.from(password, 'base64').toString());
      if (data) {
        updateUser(data.studentId, {
          ...h,
          ...fields
        });
      } else {
        return new Response(null, { status: 401 });
      }
    }
  }

  return new Response(null, { status: 200 });
}