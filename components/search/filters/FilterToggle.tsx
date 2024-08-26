import { Dispatch, SetStateAction, useState } from "react";

export default function FilterToggle({ handler, content, allToggles, updateToggle }: {handler: (e: React.MouseEvent<HTMLInputElement>) => void, content: string, allToggles: {
  text: string,
  enabled: boolean
}[], updateToggle: Dispatch<SetStateAction<{
  text: string,
  enabled: boolean
}[]>> }) {
  const [enabled, setEnabled] = useState(false);

  const updateCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    handler(e);
    const thisCheckbox = allToggles.findIndex(t => t.text === content)!;
    updateToggle(
      allToggles.toSpliced(thisCheckbox, 1, {
        text: content,
        enabled: !allToggles[thisCheckbox].enabled,
      })
    );
  }

  const isChecked = allToggles.find(t => t.text === content)!.enabled;
  return (
    <div className="flex flex-nowrap p-1">
       <label className="text-base whitespace-nowrap" >
          <input type="checkbox" name={content} className="w-6 h-6 text-xs py-1 px-2 rounded transition mr-3" checked={isChecked} onChange={() => {}} onClick={(e) => { updateCheckbox(e)}} />
          {content}
        </label>
    </div>

  )
}