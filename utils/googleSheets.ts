import { CourseListing, Opportunity, Review } from '../types/Listings';
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
export const getCourseSheet = cache(async () => {
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

    const courses: CourseListing[][] = [];
    let i = -1;

    rows.forEach((row: GoogleSpreadsheetRow) => {
      // console.log(row.get("Course Title"), 'is in the subject', Subjects[i]);
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


const opportunityRowNamesToObjectValues = [
  // Name of Organization,	Mission of Organization,	Website URL,	Main Organization's Email, 	Main Contact Person's Email	,Organization's Focus,	Type of Programming (Check all that apply),Grade(s) served,	Date(s) of Programming,	Eligibility Requirements, 	Typical Deadline for Program Admission
  ['Name of Organization', 'name'],
  ['Mission of Organization', 'mission'],
  ['Website URL', 'website'],
  ['Main Organization\'s Email', 'email'],
  ['Main Contact Person\'s Email', 'contactEmail'],
  ['Organization\'s Focus (corrected)', 'focus'],
  ['Type of Programming (corrected)', 'programming'],
  ['Grade(s) served', 'grades'],
  ['Date(s) of Programming', 'dates'],
  ['Eligibility Requirements', 'requirements'],
  ['Typical Deadline for Program Admission', 'deadline'],
] as const;

// EXTRACURRICULARS
export const getOpportunitySheet = cache(async () => {
  const doc = new GoogleSpreadsheet('1__yXv9oyHB64eWUlql7Wp301JMAu49F01Lou9gYpgog', new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: base64decode(process.env.GOOGLE_PRIVATE_KEY!).replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  }));

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  const opportunities = rows.map((row: GoogleSpreadsheetRow) => {
    const opportunity: Opportunity = {} as Opportunity;

    opportunityRowNamesToObjectValues.forEach(([rowName, objectValue]) => {
      if (objectValue === 'grades') {
        opportunity['grades'] = row.get(rowName).split(',').map((g: string) => parseInt(g))
      } else if (objectValue === 'focus') {
        opportunity[objectValue] = row.get(rowName).split(',').map((f: string) => f.trim()) as Opportunity['focus'];
      } else if (objectValue === 'programming') {
        opportunity['programming'] = row.get(rowName).split(',').map((f: string) => f.trim()) as Opportunity['programming'];
      } else {
        opportunity[objectValue] = row.get(rowName) as typeof opportunity[typeof objectValue];
      }
    })

    // opportunity.grades = row.get('Grade(s) Served').split(',').map((g: string) => parseInt(g)) as (7 | 8 | 9 | 10 | 11 | 12)[];

    return opportunity;
  })

  return opportunities;
})