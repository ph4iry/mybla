import { Item, Review } from '@/types/Listings';
import { JWT } from 'google-auth-library';
const { base64encode, base64decode } = require('nodejs-base64');
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { cache } from 'react';

const Subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

// COURSE REVIEWS
const getReviews = cache(async () => {
  try {
    const doc = new GoogleSpreadsheet('1QMGOGHlox_PiF0pX5BanF5JIRZfXIds1qAGL7qRQC00', new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: base64decode(process.env.GOOGLE_PRIVATE_KEY!).replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    }));

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];

    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();

    return rows.map<Review>((row) => ({
      name: row.get('name'),
      course: row.get('course').split(" | ")[0],
      ratings: {
        weeklyCommitment: row.get('weekly'),
        homework: row.get('homework'),
        resources: row.get('resources'),
        skills: {
          humanities: [...row.get('humanities').split(', ')],
          personal: [...row.get('personal').split(', ')],
          stem: [...row.get('stem').split(', ')],
        }
      },
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
    const courseReviews: Review[] = await getReviews();
    
    const doc = new GoogleSpreadsheet('1b2bc7mICAUj_3JMU6fjlztVjycPNPviBAa2GtCqgXng', new JWT({
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
        ],
        grades: `${row.get("Grade Level(s)")}`.split(',').map(g => parseInt(g)) as (7 | 8 | 9 | 10 | 11 | 12)[],
      });
    });
    
    return courses.flat();
  } catch (error) {
    console.error('Error fetching data from Google Sheet: ', error);
    throw error;
  }
});

