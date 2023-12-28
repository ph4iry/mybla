const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export interface Review {
  name: string;
  ratings: {
    rigor: number;
    homework: number;
    support: number;
    overall: number;
  };
  wouldRecommend: string
  comment: string;
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