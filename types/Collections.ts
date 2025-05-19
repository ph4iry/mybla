import { CourseListing } from "./Listings";

export interface CourseCollection {
  name: string;
  description: string;
  courses: CourseListing[];
  background: string;
  span?: string;
  image: string;
  placement?: 'right' |'top' | 'behind'
}