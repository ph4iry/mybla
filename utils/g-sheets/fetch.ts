import { Item } from '@/types/Listings';
import { JWT } from 'google-auth-library';
const { base64encode, base64decode } = require('nodejs-base64');
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { cache } from 'react';

const Subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export const getSheet = cache(async () => {
  try {
    const doc = new GoogleSpreadsheet('1CIWYxRUcMcXdDdPme3A-oioy33_tATkUxvZq0duWERs', new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: base64decode(process.env.GOOGLE_PRIVATE_KEY!).replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    }));

    await doc.loadInfo();

    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();

    const courses: Item[][] = [];
    let i = -1;

    rows.forEach((row: GoogleSpreadsheetRow) => {
      if (!row.get("Course Number")) {
        i++;
        courses[i] = [];
        return;
      }
      courses[i].push({
        code: row.get("Course Number"),
        name: row.get("Course Title"),
        subject: Subjects[i],
        rigor: (row.get("Course Title") as string).startsWith('AP ') ? 'AP' : ((row.get("Course Title") as string).includes('Honors') ? 'Honors' : 'Regular'),
        description: row.get("Course Description"),
        link: row.get("Course Video Link"),
      });
    });
    
    return courses.flat();
  } catch (error) {
    console.error('Error fetching data from Google Sheet: ', error);
    throw error;
  }
});
