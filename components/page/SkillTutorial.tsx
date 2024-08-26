import { Dialog, Transition } from '@headlessui/react'
import { HiOutlineClock, HiOutlineCursorArrowRays, HiOutlineInboxArrowDown } from 'react-icons/hi2';
import { Fragment, useState } from 'react'

export default function SkillTutorial() {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm text-white/70 underline"
      >
        How do student submissions work?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-700 p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6"
                  >
                    Student Submissions on myBLA
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm mb-2">Students have submitted responses summarizing their experiences in their classes. Here&apos;s a key to how the responses are shown:</p>
                    <table className="table-auto text-left">
                      <thead className="text-white/50 font-normal">
                        <tr>
                          <th className="pr-3  font-normal">Symbol</th>
                          <th className="font-normal">Name and Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><HiOutlineClock className="inline h-10 shrink-0 mx-1 mr-2 text-rose-400"/></td>
                          <td>
                            <div className="w-full text-left">
                              <span className="block text-lg text-rose-400 font-semibold">Weekly Time Commitment</span>
                              <p className="text-sm text-rose-200">This describes the <span className="italic">weekly time commitment</span> of a student taking this class (including projects, nightly homework, and other commitments like monthly labs)</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><HiOutlineInboxArrowDown className="inline h-10 shrink-0 mx-1 mr-2 text-fuchsia-400"/></td>
                          <td>
                            <div className="w-full text-left">
                              <span className="block text-lg text-fuchsia-400 font-semibold">Nightly Homework</span>
                              <p className="text-sm text-fuchsia-200">This describes the <span className="italic">weekly time commitment</span> of a student taking this class (including projects, nightly homework, and other commitments like monthly labs)</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><HiOutlineCursorArrowRays className="inline h-10 shrink-0 mx-1 mr-2 text-blue-400"/></td>
                          <td>
                            <div className="w-full text-left">
                              <span className="block text-lg text-blue-400 font-semibold">Available External Resources</span>
                              <p className="text-sm text-blue-200">This describes the <span className="italic">weekly time commitment</span> of a student taking this class (including projects, nightly homework, and other commitments like monthly labs)</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

/*
    case "weekly":
      return (
        <HiOutlineClock className="inline h-6 shrink-0 mx-1 mr-2 text-rose-400"/>
      );
    case "homework":
      return (
        <HiOutlineInboxArrowDown className="inline h-6 shrink-0 mx-1 mr-2 text-fuchsia-400"/>
      );
    case "resources":
      return (
        <HiOutlineCursorArrowRays className="inline h-6 shrink-0 mx-1 mr-2 text-blue-400"/>
      );
*/