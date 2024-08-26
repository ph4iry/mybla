import { handleLogin, findUserByUsername, createUser, updateUser } from "@/utils/airtable";
import { getStudentInfo } from "@/utils/aspen";
import { getHash } from "@/utils/security";
import { Structures } from "bla-aspen";

export async function POST(request: Request, response: Response) {
  const { username, password } = await request.json();

  try {
    const record = await findUserByUsername(username);

    if (record) {
      // if the hash is different from the one in the database BUT the login was successful on aspen's end, update the hash to be with the new password
      const h = getHash(password, record.fields.salt as string);
      if (record.fields.hash as string === h.hash) {
        return Response.json({ 
          student: JSON.parse(record.fields.studentJSON as string),
          isValidStudent: true,
          initial: false,
        });  
      } else {
        const data: Structures.Student = await getStudentInfo(username, Buffer.from(password, 'base64').toString());
        if (data) {
          updateUser(data.studentId, {
            ...h
          });

          return Response.json({ 
            student: JSON.parse(record.fields.studentJSON as string),
            isValidStudent: true,
            initial: false,
          });
        } else {
          return new Response(null, { status: 401 });
        }
      }
    } else {
      // find the student, add them to airtable, return the student
      const data: Structures.Student = await getStudentInfo(username, Buffer.from(password, 'base64').toString());
      console.log(data);

      // check for initial login given student data
      const { initial } = data.school.id === '1020' ? (await handleLogin(data) as {
        initial: boolean;
        student: Partial<Structures.Student>;
      }) : { initial: false };

      const creds = getHash(password);
      console.log(creds);
      createUser({
        ...data,
        username: data.email.split('@')[0],
        ...creds
      });

      return Response.json({ 
        student: data,
        isValidStudent: data.school.id === '1020',
        initial,
      });
    }
  } catch (e) {
    console.log(e);
    return new Response(null, { status: 500 });
  }
}