
"use client";
import { useTheme } from "next-themes";
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';


const ThemeToggler = ({ size }: { size?: string}) => {
  const {systemTheme, theme, setTheme } = useTheme();
  const renderThemeChanger= () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if(currentTheme ==="dark"){
      return (
        <SunIcon className={`w-auto ${size ? size : "h-10"} text-yellow-500 inline`} role="button" onClick={() => 
          setTheme('light')} />
      )
    } else {
      return (
        <MoonIcon className={`w-auto ${size ? size : "h-10"} text-sky-900 inline`} role="button" onClick={() => 
          setTheme('dark')} />
      )
    }
 };

  return (
    <>
      {renderThemeChanger()}
    </>
  );
};

export default ThemeToggler;