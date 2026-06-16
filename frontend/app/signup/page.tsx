"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Home() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    role: ""
  });  

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData)
    await axios.post("http://localhost:4001/api/auth/signup", formData);
    router.push("/signin")
  }
  
  return (
	  <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black space-y-7">
		  <h1 className="text-3xl">Signup</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name</label>
        <input type="text" name="name" id="name" className="border" onChange={handleChange}/>
        <label htmlFor="email">Enter your Email</label>
        <input type="email" name="email" id="email" className="border" onChange={handleChange}/>
        <label htmlFor="pass">Enter your Password</label>
        <input type="text" name="pass" id="pass" className="border" onChange={handleChange}/>
        <label htmlFor="role">Enter your role</label>
        <input type="text" name="role" id="role" className="border" onChange={handleChange}/>
        <button  className="bg-blue-500 rounded-sm w-min-screen h-[40px] hover:cursor-pointer hover:bg-blue-700" type="submit">Submit</button>
      </form>

      <p>Already have an Account ? </p><Link href={"/signin"} className="text-blue-300 underline">Signin</Link>
      
    </div>
  );
}
