this is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)!

## contributing and development guide for future dragons

### prerequisites

before contributing to this project, you should have a good understanding of (in order):
- HTML/CSS/Javascript (basic web development)
- Git basics
- Node.js
- TailwindCSS (which is really easy to learn how to use!)
- Typescript (which is basically Javascript with some extra steps)
- React
- Next.js

if you need to learn these technologies, **fun fact: you can learn how to use all of these (minus Tailwind) through free courses on [Codecademy](https://www.codecademy.com/), as long as you log in with your BPS Clever account!)**

- [Next.js 14+ Tutorial](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/learn)
- [Git Guide](https://github.com/git-guides)
- [TailwindCSS Documentation](https://tailwindcss.com)

### where to start with prerequisites

to learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API!
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial!

you can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### setting up google sheets api access

note you may need to create a Google Sheets Service Account to access the course data. this should be done on a **non-school Google account** to avoid access restrictions!

1. follow [Google's official guide to create a service account](https://developers.google.com/workspace/guides/create-credentials#service-account)
2. enable the Google Sheets API for a Google Developer project
3. download the service account JSON credentials file
4. create a `.env.local` file in your project root with the following variables:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```
5. share the Google Sheet of **BLA courses and BLA extracurricular opportunities** with the service account email address (also, give it Viewer permissions)

**important**: use a personal Google account (not your school account) to avoid potential access restrictions or policy limitations!

### adding new pages

1. create a new directory in `app/` with the route name you want (e.g. `app/courses/`)
2. add a `page.tsx` file in that directory
3. for client-side components, create them in `components/` directory
4. import and use utility functions from `utils/` as needed

### adding new components

when creating new components:

1. add components to the `components/v3/` directory (ignore other components directories as they are legacy code being updated)
2. follow the naming convention: PascalCase for component names (e.g. `CoursePanel.tsx`)
3. use TypeScript and include proper type definitions
4. structure your component like this:
   ```tsx
   'use client'; // add if using client-side features
   
   import { ComponentProps } from '@/types/Props';
   
   export default function ComponentName({ prop1, prop2 }: ComponentProps) {
     return (
       // JSX here
     );
   }
   ```

### keeping pages clean

when building pages in `app/`:

1. keep page.tsx files minimal - they should primarily handle:
   - layout structure
   - data fetching
   - high-level routing logic
   
2. move complex UI elements to components in `components/v3/`:
   - break down large sections into smaller components
   - create reusable components for repeated elements
   - keep business logic in components, not pages

3. example of a clean page structure:
   ```tsx
   // app/courses/page.tsx
   import CourseSheet from '@/components/v3/CourseSheet';
   import { fetchCourses } from '@/utils/googlesheets';
   
   export default async function CoursesPage() {
     const courses = await fetchCourses();
     
     return (
       <main>
         <CourseSheet data={courses} />
       </main>
     );
   }
   ```

### contributing recognition

all contributors will be featured on a dedicated page showcasing the students who have helped build and improve MyBLA! this page will be implemented in the coming weeks to recognize the valuable work of student developers!

### understanding utility functions

the project includes several utility functions in the `utils/` directory:

- `colors.ts` - contains functions for generating color classes based on:
  - course grades (`colorTagByGrade`)
  - subject areas (`colorTagBySubject`) 
  - course rigor levels (`colorTagByRigor`)
  these functions return Tailwind CSS classes for consistent styling!

- `categorizeembeds.ts` - provides functions for categorizing and organizing embedded content:
  - processes and validates embed URLs
  - groups embeds by type (video, document, etc.)
  - extracts metadata from embed links

- `googlesheets.ts` - contains utilities for interacting with Google Sheets API:
  - fetches and parses course data from configured spreadsheets
  - handles authentication and API requests
  - transforms raw spreadsheet data into structured course objects
  these functions enable dynamic course data management through Google Sheets!

### making a pull request

1. fork the repository to your GitHub account
2. clone your fork locally:
   ```bash
   git clone https://github.com/ph4iry/mybla.git
   ```
3. create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
5. push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. go to the original repository on GitHub and create a Pull Request
7. describe your changes in detail and submit

please ensure your code follows the existing style conventions and includes appropriate documentation!
