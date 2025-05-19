'use client';
import { motion } from "motion/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Card({ title, description, link, section }:{ title: string, description: string, link: string, section: string }) {
  const category = (() => {
    switch (section) {
      case "resources":
        return "hover:border-amber-500";
      case "academics":
        return "hover:border-blue-500";
      default:
        return "hover:border-amber-500";
    }
  })()
  return (
    <div className={`border-2 border-zinc-400 p-6 rounded-md ${category} transition bg-white hover:shadow-md flex flex-col justify-between`}>
      <div>
        <div className="text-xl font-bold">{title}</div>
        <div>{description}</div>
      </div>
      <div className="self-end">
        <Link href={link} className="inline-flex items-center gap-2 group hover:text-amber-500">
          <motion.span className="font-semibold">Explore</motion.span>
          <FaArrowRight className="size-5 group-hover:translate-x-2 transition" />
        </Link>
      </div>
    </div>
  )
}