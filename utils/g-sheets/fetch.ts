import { Item } from '@/types/Listings';
import { JWT } from 'google-auth-library';
const { base64encode, base64decode } = require('nodejs-base64');
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { cache } from 'react';

const Subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

// COURSE REVIEWS
const getReviews = cache(async () => {
  try {
    const doc = new GoogleSpreadsheet('1tZ74p8YQ3rURKAPlZX2bVLpngKLcPoGKdznuc97O-34', new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: base64decode(process.env.GOOGLE_PRIVATE_KEY!).replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    }));

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();

    return rows.map((row) => ({
      name: row.get('name'),
      course: row.get('course').split(" | ")[0],
      ratings: {
        rigor: parseInt(row.get('rigor')),
        homework: parseInt(row.get('homework')),
        support: parseInt(row.get('extraSupport')),
        overall: parseInt(row.get('overall')),
      },
      wouldRecommend: row.get('wouldRecommend'),
      comment: row.get('comment'),
      tips: row.get('tips'),
    }));
  
  } catch (error) {
    console.error('Error fetching data from Google Sheet: ', error);
    throw error;
  }
});

// COURSE GETTER
export const getSheet = cache(async () => {
  try {
    const courseReviews = await getReviews();
    
    const doc = new GoogleSpreadsheet('1CIWYxRUcMcXdDdPme3A-oioy33_tATkUxvZq0duWERs', new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: base64decode(process.env.GOOGLE_PRIVATE_KEY!).replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    }));

    await doc.loadInfo();

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
        reviews: [
          ...courseReviews.filter(c => c.course === row.get("Course Number"))
        ]
      });
    });
    
    return courses.flat();
  } catch (error) {
    console.error('Error fetching data from Google Sheet: ', error);
    throw error;
  }
});

