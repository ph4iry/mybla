import { Session } from 'bla-aspen';
import 'puppeteer-extra-plugin-stealth/evasions/chrome.app';

export async function getAspenData(username: string, password: string) {
  const aspen = await new Session(username, password).init();
  const student = await aspen.getStudentInfo();
  const courses = await aspen.getClasses({ term: 'all', year: 'previous' });
  const schedule = await aspen.getSchedule(true);
  aspen.exit();
  return {
    student,
    courses,
    schedule
  };
}

export async function getStudentInfo(username: string, password: string) {
  const aspen = await new Session(username, password).init();
  const student = await aspen.getStudentInfo();
  aspen.exit();
  return student;
}

export async function getCourses(username: string, password: string) {
  try {
    const aspen = await new Session(username, password).init();
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
    const aspen = await new Session(username, password).init();
    const allCourses = await aspen.getClasses({ term: 'all', year });
    const course = await aspen.getClassDetails('sectionNumber', sectionNumber, { term: 'all', year }).catch(() => {});
    await aspen.exit();
    return {
      ...course,
    }
  } catch (e) {
    // console.log(e);
  }
}