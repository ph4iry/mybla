import { findUserByUsername, updateUser, handleLogin, createUser } from '../utils/airtable';
import { getCourses, getIndividualCourse, getStudentInfo } from '../utils/aspen';
import { getHash } from '../utils/security';
import { Structures } from 'bla-aspen';
import { RequestHandler } from 'express';

// POST: /api/aspen/auth
export const handleAspenAuth: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const record = await findUserByUsername(username);

    if (record) {
      // if the hash is different from the one in the database BUT the login was successful on aspen's end, update the hash to be with the new password
      const h = getHash(password, record.fields.salt as string);
      if (record.fields.hash as string === h.hash) {
        return res.json({ 
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

          return res.json({ 
            student: JSON.parse(record.fields.studentJSON as string),
            isValidStudent: true,
            initial: false,
          });
        } else {
          return res.status(401).send('Incorrect username or password');
        }
      }
    } else {
      // find the student, add them to airtable, return the student
      const data: Structures.Student = await getStudentInfo(username, Buffer.from(password, 'base64').toString());
      // console.log(data);

      // check for initial login given student data
      const { initial } = data.school.id === '1020' ? (await handleLogin(data) as {
        initial: boolean;
        student: Partial<Structures.Student>;
      }) : { initial: false };

      const creds = getHash(password);
      // console.log(creds);
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
};

// POST: /api/aspen/courses
export const fetchCourses: RequestHandler = async (req, res) => {
  interface RequestBody {
    refreshToken: string;
  }
  
  const { refreshToken } = req.body as RequestBody;
  const [username, password] = Buffer.from(refreshToken, 'base64').toString().split(':');

  // console.log(username, Buffer.from(password, 'base64').toString());
  const data = await getCourses(username, Buffer.from(password, 'base64').toString());
  return res.json({ 
    ...data
  });
}

// POST: /api/aspen/courses/details
export const fetchCourseDetails: RequestHandler = async (req, res) => {
  interface RequestBody {
    refreshToken: string;
    sectionNumber: string;
    year: 'previous' | 'current';
  }
  const { refreshToken, sectionNumber, year } = req.body as RequestBody;

  if (!sectionNumber || !year) {
    return res.status(400).send();
  }

  const [username, password] = Buffer.from(refreshToken, 'base64').toString().split(':');

  // console.log(username, Buffer.from(password, 'base64').toString());
  const data = await getIndividualCourse(username, Buffer.from(password, 'base64').toString(), sectionNumber, year);

  return res.json({ 
    ...data
  });
}