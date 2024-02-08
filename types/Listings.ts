const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export interface Review {
  name: string;
  course: string;
  ratings: {
    weeklyCommitment:string,
    homework: string,
    resources: string,
    skills: {
      humanities: string[],
      stem: string[],
      personal: string[],
    }
  };
  tips?: string;
}

export interface Item {
  code: string
  name: string
  subject: typeof subjects[number]
  description: string
  rigor: 'AP' | 'Honors' | 'Regular'
  link: string | null
  reviews: Review[]
}