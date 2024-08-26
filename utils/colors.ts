import { Subject } from "@/types/Listings";

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