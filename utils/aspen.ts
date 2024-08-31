import { Session } from 'bla-aspen';

export async function getAspenData(username: string, password: string) {
  const aspen = await new Session(username, password).init(process.env.PUPPETEER_EXECUTABLE_PATH || undefined);
  const student = await aspen.getStudentInfo();
  const previous = await aspen.getClasses({ term: 'all', year: 'previous' }).catch(() => []);
  const current = await aspen.getClasses({ term: 'all', year: 'current' }).catch(() => []);
  const schedule = await aspen.getSchedule(true);
  aspen.exit();
  return {
    student,
    courses: { previous, current},
    schedule
  };
}

export async function getSchedule(username: string, password: string) {
  try {
    const aspen = await new Session(username, password).init(process.env.PUPPETEER_EXECUTABLE_PATH || undefined);
    const current = await aspen.getClasses({ term: 'all', year: 'current' });
    const schedule = await aspen.getSchedule(true);
    aspen.exit();
    return schedule;
  } catch (e) {
    console.log(e);
  }
}

export async function getStudentInfo(username: string, password: string) {
  try {
    const aspen = await new Session(username, password).init(process.env.PUPPETEER_EXECUTABLE_PATH || undefined);
    const student = await aspen.getStudentInfo();
    aspen.exit();
    return student;
  } catch (e) {
    console.log(e);
  }
}

export async function getCourses(username: string, password: string) {
  try {
    const aspen = await new Session(username, password).init(process.env.PUPPETEER_EXECUTABLE_PATH || undefined);
    const previous = await aspen.getClasses({ term: 'all', year: 'previous' }).catch(() => []);
    const current = await aspen.getClasses({ term: 'all', year: 'current' }).catch(() => []);
    aspen.exit();
    return {
      previous,
      current
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getIndividualCourse(username: string, password: string, sectionNumber: string, year: 'previous' | 'current') {
  try {
    const aspen = await new Session(username, password).init(process.env.PUPPETEER_EXECUTABLE_PATH || undefined);
    const course = await aspen.getClasses({ term: 'all', year }).then(async () => {
      return await aspen.getClassDetails('sectionNumber', sectionNumber, { term: 'all', year, useCache: true });
    });
    await aspen.exit();
    return {
      ...course,
    }
  } catch (e) {
    console.log(e);
  }
}