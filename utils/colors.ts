import { Subject } from "../types/Listings";

export function colorBgBySubject(subject: Subject) {
  switch (subject) {
    case "English": return "bg-amber-400 dark:bg-amber-300";
    case "Math": return "bg-sky-400 dark:bg-sky-300";
    case "Science": return "bg-emerald-400 dark:bg-emerald-300";
    case "History": return "bg-amber-700 dark:bg-amber-500";
    case "Classics/MFL": return "bg-violet-400 dark:bg-violet-300";
    case "Art": return "bg-pink-400 dark:bg-pink-300";
  }
}

export function colorBgByRigor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return "text-sky-400/80";
    case "Honors": return "text-emerald-400/80";
    case "Regular": return "text-zinc-400/80";
  }
}

export function colorTextBySubject(subject: Subject) {
  switch (subject) {
    case "English": return "text-amber-400 dark:text-amber-300";
    case "Math": return "text-sky-400 dark:text-sky-300";
    case "Science": return "text-emerald-400 dark:text-emerald-300";
    case "History": return "text-amber-700 dark:text-amber-500";
    case "Classics/MFL": return "text-violet-400 dark:text-violet-300";
    case "Art": return "text-pink-400 dark:text-pink-300";
  }
}

export function colorTextByRigor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return "text-sky-400/80";
    case "Honors": return "text-emerald-400/80";
    case "Regular": return "text-zinc-400/80";
  }
}

export function getSubjectColor(subject?: "English" | "Math" | "Science" | "History" | "Classics/MFL" | "Art") {
  switch (subject) {
    case "English":
      return 'bg-amber-400/30';
    case "Math":
      return 'bg-blue-500/30';
    case "Science":
      return 'bg-emerald-400/30';
    case "History":
      return 'bg-amber-700/30';
    case "Classics/MFL":
      return 'bg-violet-400/30';
    case "Art":
      return 'bg-pink-400/30';
    default:
      return 'bg-zinc-400/30';
  }
}

export function getSubjectColorWithoutOpacitySettings(subject?: "English" | "Math" | "Science" | "History" | "Classics/MFL" | "Art") {
  switch (subject) {
    case "English":
      return 'bg-amber-400 border border-amber-400';
    case "Math":
      return 'bg-sky-400 border border-sky-400';
    case "Science":
      return 'bg-emerald-400 border border-emerald-400';
    case "History":
      return 'bg-amber-700 border border-amber-700';
    case "Classics/MFL":
      return 'bg-violet-400 border border-violet-400';
    case "Art":
      return 'bg-pink-400 border border-pink-400';
    default:
      return 'bg-zinc-400 border border-zinc-400';
  }
}

export function getRigorColor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return 'bg-sky-400/30';
    case "Honors": return 'bg-emerald-30';
    case "Regular": return 'bg-zinc-400/30';
  }
}

export function getGradeColor(grade: `${7 | 8 | 9 | 10 | 11 | 12}`) {
  switch(grade) {
    case '7': return 'bg-amber-400/30';
    case '8': return 'bg-orange-400/30';
    case '9': return 'bg-purple-400/30';
    case '10': return 'bg-green-400/30';
    case '11': return 'bg-blue-400/30';
    case '12': return 'bg-red-400/30';
  }
}

export function colorTagByGrade(grade: 7 | 8 | 9 | 10 | 11 | 12) {
  switch(grade) {
    case 7: return 'text-amber-500 bg-amber-500/10';
    case 8: return 'text-blue-500 bg-blue-500/10';
    case 9: return 'text-green-500 bg-green-500/10';
    case 10: return 'text-red-500 bg-red-500/10';
    case 11: return 'text-purple-500 bg-purple-500/10';
    case 12: return 'text-pink-500 bg-pink-500/10';
  }
}

export function colorTagBySubject(subject: Subject) {
  switch (subject) {
    case "English": return "text-amber-600 bg-amber-600/10";
    case "Math": return "text-sky-400 bg-sky-400/10";
    case "Science": return "text-emerald-400 bg-emerald-400/10";
    case "History": return "text-amber-700 bg-amber-700/10";
    case "Classics/MFL": return "text-violet-400 bg-violet-400/10";
    case "Art": return "text-pink-400 bg-pink-400/10";
  }
}


export function colorTagByRigor(rigor: 'AP' | 'Honors' | 'Regular') {
  switch (rigor) {
    case "AP": return "text-sky-400 bg-sky-400/10";
    case "Honors": return "text-emerald-400 bg-emerald-400/10";
    case "Regular": return "text-zinc-400 bg-zinc-400/10";
  }
}

// type args = ['border', 'text', 'bg']
// export function colorPropertyByData(data: (Subject | (7 | 8 | 9 | 10 | 11 | 12) | ('AP' | 'Honors' | 'Regular')), properties: args[]) {
//   const color = (() => {
//     switch (data) {
//       case "English": return "amber-600";
//       case "Math": return "sky";
//       case "Science": return "emerald";
//       case "History": return "amber";
//       case "Classics/MFL": return "violet";
//       case "Art": return "pink";
//       case 7: return "amber";
//       case 8: return "orange";
//       case 9: return "purple";
//       case 10: return "green";
//       case 11: return "blue";
//       case 12: return "red";
//       case 'AP': return 'sky';
//       case 'Honors': return 'emerald';
//       case 'Regular': return 'zinc';
//     }
//   })()
//   const propertiesMap = properties.map((property) => `${property}-${color}`).join(' ')
//   return propertiesMap;
// }