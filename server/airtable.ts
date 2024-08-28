import { StoredCourses } from "../types/Storage";
import { findUserByUsername, StudentRecord, updateUser } from "../utils/airtable";
import { getStudentInfo, getCourses } from "../utils/aspen";
import { getHash } from "../utils/security";
import { Structures } from "bla-aspen";
import { request, RequestHandler } from "express";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// POST: /api/airtable
export const getAirtable: RequestHandler = async (req, res) => {
  interface RequestBody {
    refreshToken: string; // username:base64password
    method: 'profile' | 'courses';
  }

  const { refreshToken, method } = req.body as RequestBody;
  const [username, password] = Buffer.from(`${refreshToken}`, 'base64').toString().split(':');

  switch (method) {
    case 'profile': {
      const record = await findUserByUsername(username);
      const user: StudentRecord = record.fields as unknown as StudentRecord;

      if (record) {
        const h = getHash(password, record.fields.salt as string);
        if (record.fields.hash as string === h.hash) {
          return res.json({
            ...record.fields,
            salt: undefined,
            hash: undefined,
          });  
        } else {
          const data: Structures.Student | null = await (getStudentInfo(username, Buffer.from(`${password}`, 'base64').toString()) as Promise<Structures.Student>).catch(() => null);
          if (data) {
            updateUser(data.studentId, {
              ...h
            });

            return res.json({
              ...record.fields,
              salt: undefined,
              hash: undefined,
            }); 
          } else {
            return res.status(401).send('Invalid refresh token');
          }
        }
      } else {
        return res.status(401).send('Could not find user');
      }
    }
    case 'courses': {
      const record = await findUserByUsername(username);
      const user: StudentRecord = record.fields as unknown as StudentRecord;

      if (record) {
        const h = getHash(password, record.fields.salt as string);
        if (record.fields.hash as string === h.hash) {
          return res.json({
            ...JSON.parse(user.coursesJSON!),
          });  
        } else {
          const data: StoredCourses = (await getCourses(username, Buffer.from(`${password}`, 'base64').toString()))!;
          if (data) {
            updateUser(user.studentId, {
              ...h
            });

            return res.json({
              ...JSON.parse(user.coursesJSON!),
            });  
          } else {
            return res.status(401).send('Invalid refresh token');
          }
        }
      } else {
        return res.status(401).send('Could not find user');
      }
    }
  }
}


// POST: /api/airtable/update
export const updateAirtableRecord: RequestHandler = async (req, res) => {
  interface RequestBody {
    refreshToken: string; // username:base64password
    fields: Partial<StudentRecord>
  }

  const { refreshToken, fields } = req.body as RequestBody;
  const [username, password] = Buffer.from(`${refreshToken}`, 'base64').toString().split(':');

  const record = await findUserByUsername(username);
  const user: StudentRecord = record.fields as unknown as StudentRecord;

  if (record) {
    const h = getHash(password, record.fields.salt as string);
    if (record.fields.hash as string === h.hash) {
      updateUser(user.studentId, {
        ...fields
      });
    } else {
      const data: Structures.Student | null = await (getStudentInfo(username, Buffer.from(`${password}`, 'base64').toString()) as Promise<Structures.Student>).catch(() => null);
      if (data) {
        updateUser(data.studentId, {
          ...h,
          ...fields
        });
      } else {
        return res.status(401).send('Invalid refresh token');
      }
    }
  }

  return res.status(200).send('Updated record successfully');
}