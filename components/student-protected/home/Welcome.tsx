/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Structures } from "bla-aspen";
import secureLocalStorage from "react-secure-storage";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { StudentRecord } from "@/utils/airtable";
import { HiOutlinePencil } from 'react-icons/hi2';

export default function Welcome() {
  const [student, setStudent] = useState<Structures.Student>(null!);

  useEffect(() => {
    const storedStudent = (secureLocalStorage.getItem('profile') as Structures.Student);
    if (storedStudent) {
      setStudent(storedStudent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-20 flex flex-col items-center">
        <div className="size-20 bg-cover rounded-full" style={{
          backgroundImage: `url(${student?.studentPhoto})`,
        }}></div>
        <div className="text-sm mt-2">{student?.studentId}</div>
      </div>
      <div>
        <div className="text-lg uppercase">{getGreeting()}</div>
        <PreferredNameDialog />
      </div>
    </>
  )
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning,';
  if (hour < 18) return 'Good afternoon,';
  return 'Good evening,';
}

function PreferredNameDialog() {
  let [open, setOpen] = useState(false);
  let [preferredName, setPreferredName] = useState(secureLocalStorage.getItem('preferredName') as string);
  let [record, setRecord] = useState<StudentRecord>(null!);

  const handleSave = () => {
    const v = (document.getElementById('prefname') as HTMLInputElement).value;
    if (v && v !== 'null') {
      fetch('/api/airtable/update', {
        method: "POST",
        body: JSON.stringify({
          refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
          fields: {
            preferredName: v,
          }
        })
      }).then(async (data) => {
        if (data.ok) {
          setPreferredName((document.getElementById('prefname') as HTMLInputElement).value as string);
          secureLocalStorage.setItem('preferredName', v);
          setOpen(false);
        }
      })
    }
  };

  useEffect(() => {
    // fetch from airtable
    if (secureLocalStorage.getItem('preferredName')) {
      setPreferredName(secureLocalStorage.getItem('preferredName') as string);
      return;
    }

    console.log(secureLocalStorage.getItem('refreshToken'));

    fetch('/api/airtable', {
      method: "POST",
      body: JSON.stringify({
        refreshToken: Buffer.from(secureLocalStorage.getItem('refreshToken') as string, 'utf-8').toString('base64'),
        method: 'profile',
      }),
    }).then(async (data) => {
      const result = await data.json();
      console.log(result);

      if (result.preferredName) {
        secureLocalStorage.setItem('preferredName', result.preferredName);
      }
      setPreferredName(result.preferredName);
      setRecord(result);
    });
  }, []);

  return (
    <>
      <div className="text-3xl font-bold">
        <span>{(preferredName && preferredName !== 'null') ? preferredName : record?.name} </span>
        <button className="inline text-sm text-amber-400 font-normal decoration-wavy underline underline-offset-4 -translate-y-[4px] ml-2" onClick={() => setOpen(true)}>
          edit
        </button>
      </div>
      <Dialog open={open} className="relative z-10 focus:outline-none" onClose={() => setOpen(false)}>
        <div className="fixed bg-gradient-to-br from-gray-800/40 to-black/40 backdrop-blur-sm inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl dark:bg-zinc-800/85 backdrop-blur-xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h2" className="text-xl mb-2 font-medium text-white">
                Set preferred name
              </DialogTitle>
              <div>Want to be referred by just your first name? Have another name you want to go by? Change it here!</div>
              <input type="text" name="" id="prefname" className="w-full !outline-none !ring-0 !border-t-0 !border-x-0  mt-3 bg-transparent border-b-2 border-amber-400 focus:border-amber-200 active:border-amber-200 transition" />
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}