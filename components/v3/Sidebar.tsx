'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegMap, FaRegNewspaper } from "react-icons/fa6";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

export default function Sidebar() {
  const actions = [
    {
      id: "catalog",
      name: "Course Catalog",
      shortcut: ["c"],
      keywords: "course catalog courses classes",
      perform: () => (window.location.pathname = "catalog"),
    },
    {
      id: "opportunities",
      name: "Opportunity Catalog",
      shortcut: ['o', 'ec', 'ecs'],
      keywords: "opportunity extracurricular clubs jobs internships summer programs",
      perform: () => (window.location.pathname = "opportunities"),
    },
  ]

  return (
    <div className="h-screen border-r flex-col px-3 py-6 gap-4 md:flex hidden">
    <span className="p-2">
      <svg width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="size-10" preserveAspectRatio="xMidYMid meet"><path fill="#3E721D" d="M35.125 13.344c0-1 .771-2.327.771-2.635c0-.656-1.553-.421-1.626-1.046c-.209-1.794 1.887-3.318-1.745-3.312c-1.352.002-.274-1.768-.274-2.725c0-.957-2.596-.145-3.552-.145c-.957 0-.957-2.87-1.913-2.87c-2.87 0-3.827 2.87-4.783 2.87c-.957 0-1.744-3.621-2.87-2.87c-2.87 1.913-3.826 7.653-3.826 7.653s4.783-3.826 10.522-2.87c5.345.891 4.79 10.821 5.641 16.888L24.609 36h3.359c.344-1.5 1.939-.529 2.375-1.688c.381-1.016-.67-1.966-.094-2.969s.978-.755 2.094-1.375c1.184-.657 0-2.199 0-3.156c0-.956 2.312-1.574 2.312-2.531c0-.63-1.068-1.292-.812-2.356c.257-1.064 1.586-1.186 1.749-2.184c.138-.847-.921-1.455-.796-2.393s1.174-1.378 1.174-2.097c.002-.718-.845-1.001-.845-1.907z"></path><path fill="#77B255" d="M34.438 13.458c0-4.038-2.87-9.085-9.566-9.085c-6.695 0-17.265 10.024-20.088 10.096C2.87 12.521 0 14.523 0 16.486c0 3.028 5.373 4.61 5.646 4.899c1.088 1.149 3.92 8.083 8.704 1.945c.803-1.03 1.302-.422 3.483.542C25.069 27.729 16 36 16 36h9.566c4.782-4.783 8.871-13.844 8.871-21.997l-.021.008c.007-.185.022-.369.022-.553z"></path><path fill="#292F33" d="M23.915 12.09a1.913 1.913 0 1 1-3.826 0a1.913 1.913 0 0 1 3.826 0z"></path><path fill="#3E721D" d="M4.783 17.351c0 .793-.643.479-1.435.479s-1.435.315-1.435-.479a1.436 1.436 0 0 1 2.87 0z"></path><path fill="#FFF" d="M18.176 18.782c0 1.058-.643.956-1.436.956c-.792 0-1.434.101-1.434-.956c0-1.056.642-3.826 1.434-3.826c.793 0 1.436 2.771 1.436 3.826zm-3.827.956c0 1.058-.643.957-1.435.957s-1.435.101-1.435-.957c0-1.056.643-3.826 1.435-3.826c.792.001 1.435 2.771 1.435 3.826z"></path><path fill="#3E721D" d="M18.04 18.795c-5.076.726-10.192 2.007-12.394 2.59c.275.29.661.95 1.162 1.674c2.415-.624 6.975-1.724 11.503-2.369a.957.957 0 1 0-.271-1.895zm.549-6.186a.999.999 0 0 1-.708-1.705c.129-.129 3.222-3.163 8.36-3.163a1 1 0 1 1 0 2c-4.281 0-6.923 2.554-6.949 2.58a.997.997 0 0 1-.703.288z"></path></svg>
    </span>
    <hr />
    <Button text="Home" link="/">
      <HiOutlineSquares2X2 className="size-6" />
    </Button>
    <Button text="Course Catalog" link="/catalog">
      <FaRegMap className="size-6" />
    </Button>
    <Button text="Opportunities" link="/opportunities">
      <FaRegNewspaper className="size-6" />
    </Button>
  </div>
  )
}

function Button({ children, text, link }:{ children: React.ReactNode, text: string, link: string }) {
  const pathname = usePathname();

  return (
    <div className={`rounded-xl ${pathname === link ? 'bg-zinc-900 text-white' : 'bg-white border text-black'} size-14 flex items-center justify-center relative group`}>
      {children}
      <Link href={link} className="absolute h-full w-full z-10"></Link>
      <div className={`pointer-events-none z-50 whitespace-nowrap rounded-full px-3 py-1.5 group-hover:opacity-100 opacity-0 transition absolute left-16 text-sm ${pathname === link ? 'bg-zinc-900 text-white' : 'bg-white border text-black'}`}>{text}</div>
    </div>
  )
}