import Airtable from 'airtable';
import 'dotenv/config';
import { Structures } from 'bla-aspen';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY!,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export interface StudentRecord {
  studentId: string;
  name: string;
  username: string;
  salt: string;
  hash: string;
  preferredName?: string;
  studentJSON?: string;
  coursesJSON?: string;
}

export async function createUser(student: Partial<StudentRecord>) {
  const record = (await base('Users').select({
    filterByFormula: `studentId = "${student.studentId}"`,
  }).all())[0];

  if (record) {
    return;
  }

  base('Users').create({
    "studentId": student.studentId!,
    "name": student.name,
    "username": student.username,
    "preferredName": 'null',
    "studentJSON": JSON.stringify({
      ...student,
      salt: undefined,
      hash: undefined,
    }),
    "coursesJSON": JSON.stringify({}),
    "salt": student.salt,
    "hash": student.hash,
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

export async function findUserByStudentId(studentId: string) {
  const record = (await base('Users').select({
    filterByFormula: `studentId = "${studentId}"`,
  }).all())[0];

  return record;
}

export async function findUserByUsername(username: string) {
  const record = (await base('Users').select({
    filterByFormula: `username = "${username}"`,
  }).all())[0];

  return record;
}

export async function updateUser(studentId: string, data: Partial<StudentRecord>) {
  const record = await findUserByStudentId(studentId);

  if (!record) {
    return createUser(data);
  }

  base('Users').update([
    {
      id: record.id,
      fields: {
        ...(record as any).fields,
        ...data,
      },
    },
  ], function(err: Error) {
    if (err) {
      console.error(err);
      return;
    }
  });
}