import { Item } from "./Listings";

export interface CourseCollection {
  name: string;
  description: string;
  courses: Item[];
  background: string;
  span?: string;
  image: string;
  placement?: 'right' |'top' | 'behind'
}