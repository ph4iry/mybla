'use client';
import { CourseListing, Subject } from "@/types/Listings";
import { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import cn from 'classnames';
import Shareable from "../shareables/CopyButton";
import Document from "../shareables/SelectionDocument";
import classNames from "classnames";
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import secureLocalStorage from "react-secure-storage";

const subjects = ['English', 'Math', 'Science', 'History', 'Classics/MFL', 'Art'] as const;

export default function FavoriteCoursesSummary({ sheet }: { sheet: CourseListing[] }) {
  const [favoritedCourses, setFavoritedCourses] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectMethod, setSelectMethod] = useState<'courseSelection' | 'editFavorites' | 'none'>('none');
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!(secureLocalStorage.getItem('favorites') as string[] | null)) {
      secureLocalStorage.setItem('favorites', []);
    }

    console.log(secureLocalStorage.getItem('favorites'));

    setFavoritedCourses((secureLocalStorage.getItem('favorites') as string[]));
  }, []);

  const updateSelectedValues = () => {
    const cards = Array.from(document.querySelectorAll('input[name^="select"][type="checkbox"]')) as HTMLInputElement[];
    setSelected(
      cards.filter(card => card.checked).map(c => c.value)
    )
  }

  const populatedFavorites = sheet.filter(item => favoritedCourses.includes(item.code));

  const handleCreateCourseSelection = () => {
    try {
      setSelectMethod((isSelecting && selectMethod === 'courseSelection') ? 'none' : 'courseSelection');
      setIsSelecting(!isSelecting);
    } catch (e) {
      console.log('There was an issue: ', e);
    }
}
  return (
    populatedFavorites.length > 0 ? (
      <div>
        {/* <div className="flex justify-between my-3" id="action-bar">
          <button className={cn({
            "inline-flex gap-2 transition": true,
            "dark:text-zinc-400 hover:text-amber-400": !isSelecting && selectMethod === 'none',
            "dark:text-amber-400": isSelecting && selectMethod === 'courseSelection',
            "dark:text-zinc-500/60": isSelecting && selectMethod === 'editFavorites'
          })} onClick={handleCreateCourseSelection}>
            {(isSelecting && (selectMethod === 'courseSelection')) ? "Cancel" : "Create Course Selection"}
          </button>
          {
            selectMethod === 'courseSelection' ? (
              <div className="flex gap-4 text-zinc-400">
                <span>{selected.length} selected</span>
                <Shareable selection={selected} />
                <Document selection={sheet.filter(item => selected.includes(item.code))} />
              </div>
            ) : (
              selectMethod === 'editFavorites' ? (
                <div>
                  <button className={cn({
                    "dark:text-zinc-400 inline-flex gap-2 transition": true,
                    "hover:text-sky-400": !isSelecting,
                  })} onClick={() => { setSelectMethod('none'); setIsSelecting(!isSelecting) }}>Cancel</button>
                </div>
              ) : (
                <button className={cn({
                  "dark:text-zinc-400 inline-flex gap-2 transition": true,
                  "hover:text-sky-400": !isSelecting,
                })} onClick={() => { setSelectMethod('editFavorites'); setIsSelecting(!isSelecting) }}>Edit</button>
              )
            )
          }
        </div> */}
        {/* <div className="flex justify-between my-3 text-zinc-300 items-center dark:text-zinc-500">
          <span className="text-sm inline-flex items-center">
            <ExclamationTriangleIcon className="h-5 inline mr-2" />
            The course selection creation feature is currently under construction.
          </span>
        </div> */}
        <div className="grid md:grid-cols-3 gap-4 overflow-x-auto overflow-y-hidden items-stretch">
          {populatedFavorites.map((f, i) => (
            <Fragment key={i}>
              <Course data={f} update={updateSelectedValues} selecting={isSelecting} selected={selected}/>
            </Fragment>
          ))}
        </div>
      </div>
    ) : (
      <div className="w-full h-[60vh] flex items-center justify-center flex-col">
        {/* <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="647.63626" height="632.17383" className="h-[50vh] w-auto" viewBox="0 0 647.63626 632.17383" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#f2f2f2"/><path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"/><path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#f9a826"/><circle cx="190.15351" cy="24.95465" r="20" fill="#f9a826"/><circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff"/><path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#e6e6e6"/><path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"/><path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#f9a826"/><circle cx="433.63626" cy="105.17383" r="20" fill="#f9a826"/><circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff"/></svg> */}
      </div>
    )
  )
}

function Course({ data, update, selecting, selected } : { data: CourseListing, update: () => void, selecting: boolean, selected: string[] }) {

  return (
    <div className="shrink-0 flex w-full rounded max-w-sm">
      <div className={"w-2 rounded-l-md shrink-0 " + getSubjectColor(data.subject, 0)}></div>
      <div className={classNames({
        "p-3 w-full flex flex-col justify-between rounded-r-md border-r-2 border-y-2": true,
        "dark:border-zinc-600/20 border-zinc-400/20": !selected.includes(data.code),
        "dark:border-blue-600 border-blue-700": selected.includes(data.code),
      })}>
        <div className="mb-3">
          <div className="flex gap-2">
            
            <h3 className="text-lg font-semibold inline items-center">
              <Transition
                as="span"
                show={selecting}
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                onTransitionEnd={update}
              >
                <input
                  type="checkbox"
                  name={`select-${data.code}`}
                  value={data.code}
                  className="rounded-full h-5 w-5 bg-zinc-700 text-zinc-600 border-0 outline-none focus:ring-0 checked:ring-2 checked:ring-zinc-500 mr-2"
                  onChange={update}
                />
              </Transition>
              <span className={`text-sm px-3 py-1 dark:bg-zinc-400/15 rounded-full mr-2 ${getSubjectColor(data.subject, 2)} ${getSubjectColor(data.subject, 3)}`}> {data.code}</span>{data.name}
              </h3>
          </div>
          <p className="text-sm text-zinc-400 line-clamp-2">{data.description}
          </p>
          <a href={`/catalog/courses/${data.code}`} className={"items-center w-max text-base rounded hover:shadow transition"}>
              <span className={getSubjectColor(data.subject, 1)}>Read more</span>
            </a>
          <div className="">
            

          </div>
        </div>
        
      </div>
    </div>
  )
}

function getSubjectColor(subject: Subject, src: 0 | 1 | 2 | 3) {
  switch (subject) {
    case "English":
      return ['bg-amber-400', 'text-amber-400', 'bg-amber-400/30', 'dark:text-amber-400/80'][src];
    case "Math":
      return ['bg-sky-400', 'text-sky-400', 'bg-sky-400/30', 'dark:text-sky-400/80'][src];
    case "Science":
      return ['bg-emerald-400', 'text-emerald-400', 'bg-emerald-400/30', 'dark:text-emerald-400/80'][src];
    case "History":
      return ['bg-amber-700', 'text-amber-700', 'bg-amber-700/30', 'dark:text-amber-700/80'][src];
    case "Classics/MFL":
      return ['bg-violet-400', 'text-violet-400', 'bg-violet-400/30', 'dark:text-violet-400/80'][src];
    case "Art":
      return ['bg-pink-400', 'text-pink-400', 'bg-pink-400/30', 'dark:text-pink-400/80'][src];
  }
}