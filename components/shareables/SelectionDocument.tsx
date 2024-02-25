'use client';
import { Item } from "@/types/Listings";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import DocumentModal from "./DocumentModal";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export default function SelectionDocument({ selection }:{ selection: Item[] }) {
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [email, setEmail] = useState('');

  const handleDownload = () => {
    if (name.length === 0) {

    }
    const originalDiv = document.getElementById('screenshot') as HTMLDivElement;
    const clone = originalDiv.cloneNode(true) as HTMLDivElement;
    document.body.appendChild(clone);

    clone.style.display = 'block';

    html2canvas(clone).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: "letter"
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(24);

      doc.text("Boston Latin Academy | Selection Sheet", 0.5, 0.5);

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold");
      doc.text(`Student Name: ${name}`, 0.5, 1);
      doc.text(`ID: ${id}`, 0.5, 1.35);
      doc.text(`Email: ${email}@bostonk12.org`, 2, 1.35);

      const ratio = canvas.height / canvas.width

      doc.addImage(
        canvas, 'PNG', 0.5, 2, 10, 10 * ratio
      );

      const customName = name.length > 0 ? `${id.length}_${name.trim().replace(' ', '_')}_` : '';
      doc.save(`Course Selection.pdf`)
    });
  }
  

  return (
    <DocumentModal {...{name, id, email, handleDownload}}>
      <div className="text-black dark:text-white flex flex-col gap-3 py-5">
        <div className="w-full">
          <label htmlFor="student-name" className="block text-sm font-medium mb-2 dark:text-white">Student Name</label>
          <input type="text" name="" id="student-name" className="w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-amber-500 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-200/20 dark:text-zinc-200 placeholder-zinc-300 dark:focus:ring-zinc-600" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex gap-3">
          <div className="basis-1/3 shrink">
            <label htmlFor="student-id" className="block text-sm font-medium mb-2 dark:text-white">Student ID</label>
            <input type="text" name="" id="student-id" className="w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-amber-500 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-200/20 dark:text-zinc-200 placeholder-zinc-300 dark:focus:ring-zinc-600" placeholder="123456" onChange={(e) => setID(e.target.value)} />
          </div>
          <div className="basis-2/3 grow">
            <label htmlFor="hs-inline-add-on" className="block text-sm font-medium mb-2 dark:text-white">Email</label>
            <div className="relative">
              <input type="text" id="hs-inline-add-on" name="hs-inline-add-on" className="w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-amber-500 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-200/20 dark:text-zinc-200 placeholder-zinc-300 dark:focus:ring-zinc-600" placeholder="jdoe" onChange={(e) => setEmail(e.target.value)}/>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pe-4">
                <span className="text-sm text-zinc-500 dark:text-zinc-300">@bostonk12.org</span>
              </div>
            </div>
          </div>

        </div>

        <div className="hidden text-black" id="screenshot">
          <table className="table-auto text-black w-[10in]" id="course-selection-content">
            <thead>
              <tr className="text-left bg-zinc-200">
                <th className="p-3 text-center border-x border-black">Course #</th>
                <th className="p-3 border-x border-black">Subject</th>
                <th className="p-3 border-x border-black">Course Title</th>
              </tr>
            </thead>
            <tbody className="">
              {
                selection.map((course, i) => (
                  <tr key={i} className="border border-black bg-white">
                    <td className="p-3 text-center border-x border-black">{course.code}</td>
                    <td className="p-3 border-x border-black">{course.subject}</td>
                    <td className="p-3 border-x border-black">{course.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </DocumentModal>
  )
}
/*
to do:
screenshot and create pdf from image, name, etc in the div
debug anything else
*/