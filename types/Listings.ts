const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export interface Item {
  code: string
  name: string
  subject: typeof subjects[number]
  description: string
  rigor: 'AP' | 'Honors' | 'Regular'
  link: string | null
}