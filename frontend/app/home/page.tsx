"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

interface Post {
    title: string
    content: string
}

export default function Page() {

    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState<string | null>(null)

    useEffect(() => {

        const fetchArticles = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:4001/api/article"
                )

                setPosts(response.data.data)

            } catch (error: any) {

                setErr(
                    error.response?.data?.message ||
                    "Failed to fetch articles"
                )

            } finally {

                setIsLoading(false)

            }
        }

        fetchArticles()

    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold">
                    Site is Loading...
                </h1>
            </div>
        )
    }

    if (err) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-red-500 text-xl">
                    {err}
                </h1>
            </div>
        )
    }

    return ( 
        <div className="flex flex-col gap-4 p-6 items-center">

            {posts.map((item, index) => (

                <Link
                    key={index}
                    href={`/article/${index + 1}`}
                    className="border p-4 rounded-1xl shadow-sm w-full max-w-2xl"
                >

                    <h1 className="text-2xl font-semibold">
                        {item.title}
                    </h1>

                    <p className="text-gray-600 mt-2">
                        {item.content}
                    </p>

                </Link>

            ))}

        </div>
    )
}