"use client"

import { useRouter } from "next/navigation"

export default function page(){

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center flex-1 space-y-5 items-center">
      <h1 className="text-center text-3xl">Personal Blog App</h1>
      <button 
        className="text-2xl bg-blue-400 w-[200px] align-center text-center roundeed-sm-2 text-shadow-indigo-100 hover:cursor-pointer"
        onClick={() => {
          router.push("/signup")
        }}
      >Enter</button>
    </div>
  )
}