'use client';
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const colors = [
  'bg-sky-300/30 text-sky-800 dark:text-sky-200',
  'bg-emerald-300/30 text-emerald-800 dark:text-emerald-200',
  'bg-rose-300/30 text-rose-800 dark:text-rose-200',
  'bg-violet-300/30 text-violet-800 dark:text-violet-200',
  'bg-red-300/30 text-red-800 dark:text-red-200',
] as const;

const colorKeys = [
  'sky',
  'emerald',
  'rose',
  'violet',
  'red',
] as const;

export default function InteractiveCard({ title, description, icon, link, color }:{ title: string, description: string, icon: ReactNode, link: string, color: typeof colorKeys[number] }) {
  const router = useRouter();

  return (
    <a className={`flex flex-nowrap gap-4 items-center rounded-md ${colors[colorKeys.indexOf(color)]} p-4 hover:cursor-pointer`} href={link}>
      {icon}
      <div className="flex flex-col gap-1">
        <span className="text-lg block font-semibold">{title}</span>
        <span className="text-xs block">{description}</span>
      </div>
    </a>
  )
}