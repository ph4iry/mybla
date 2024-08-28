'use client';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [failReasoning, setFailReasoning] = useState("");

  useEffect(() => {
    if (window.sessionStorage as Storage | undefined && sessionStorage.getItem('session')) {
      router.push('/students/home');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (secureLocalStorage && !sessionStorage.getItem('session')) {
      (async function() {
        if (!username || !password) {
          setFailReasoning('Please fill out both fields');
          return;
        }

        await fetch('/api/aspen/auth', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password: Buffer.from(password, 'utf-8').toString('base64'),
          }),
        }).then(async (data) => {
          const result = await data.json();
          if (!result.isValidStudent) {
            setFailReasoning('Not a BLA student');
            return;
          }

          console.log('logged in');
          
          sessionStorage.setItem('session', JSON.stringify(true));
          secureLocalStorage.setItem('refreshToken', `${username}:${Buffer.from(password, 'utf-8').toString('base64')}`);
          secureLocalStorage.setItem('profile', result.student);

          if (result.initial) {
            sessionStorage.setItem('initial', JSON.stringify(true));
          }

          router.push('/students/home');
        }).catch((err) => {
          setFailReasoning('An error occurred. Please try again');
        });
      })();
    }
  };

  return (
    <div className="px-4 py-6 rounded-md bg-sky-50 dark:bg-gray-900 mt-3">
      <form onSubmit={handleSubmit} className="space-y-4">
        {failReasoning && <div className="text-red-500">{failReasoning}</div>}
        <div className="flex flex-col gap-4">
          <div>
            <div className="relative">
              <input type="text" id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none bg-sky-50  dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer" placeholder=" " onChange={handleUsernameChange} />
              <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-sky-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
            </div>
            <div className="mt-1 text-xs text-zinc-400">Your username is the first section of your BPS email, ex. jdoe3 from jdoe3@bostonk12.org.</div>
          </div>
          <div>
            <div className="relative">
              <input type="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none bg-sky-50  dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer" placeholder=" " onChange={handlePasswordChange} />
              <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-sky-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
            </div>
          </div>
          <button type="submit" className="w-full transition hover:scale-105 bg-zinc-700 text-white py-2 px-4 rounded-lg">Log In</button>
        </div>
      </form>
    </div>
  );
};