"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

export default function Page() {

    const params = useParams<{ id: string }>()
    const id = Number(params.id)

    const router = useRouter()

    const [article, setArticle] = useState({
        id: null as number | null,
        title: "",
        content: ""
    })

    useEffect(() => {

        const fetchArticle = async () => {

            try {

                const res = await axios.get(
                    `http://localhost:4001/api/article/${id}`
                )

                setArticle(res.data.data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchArticle()

    }, [id])

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        setArticle({
            ...article,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        try {

            const token = localStorage.getItem("jwt")

            const res = await axios.put(
                `http://localhost:4001/api/article/${id}`,
                article,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(res.data)

            router.push("/home")

        } catch (error) {

            console.log(error)

        }
    }

    return (

        <div className="flex flex-col flex-1 justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-[400px]"
            >

                <label htmlFor="title">
                    Title
                </label>

                <input
                    type="text"
                    name="title"
                    id="title"
                    value={article.title}
                    onChange={handleChange}
                    className="border h-[50px] px-4"
                />

                <label htmlFor="content">
                    Content
                </label>

                <textarea
                    name="content"
                    id="content"
                    value={article.content}
                    onChange={handleChange}
                    className="border p-4 h-[200px]"
                />

                <button
                    type="submit"
                    className="bg-black text-white p-3 rounded"
                >
                    Submit
                </button>

            </form>

        </div>
    )
}