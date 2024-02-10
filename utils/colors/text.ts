const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;
type Subject = typeof subjects[number];

export function colorTextBySubject(subject: Subject) {
  switch (subject) {
    case "English": return "text-amber-400";
    case "Math": return "text-sky-400";
    case "Science": return "text-emerald-400";
    case "History": return "text-amber-700";
    case "Classics/MFL": return "text-violet-400";
    case "Art": return "text-pink-400";
  }
}

export function colorTextByRigor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return "text-sky-400/80";
    case "Honors": return "text-emerald-400/80";
    case "Regular": return "text-zinc-400/80";
  }
}