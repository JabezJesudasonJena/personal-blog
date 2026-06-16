"use client"

import { useState } from "react"
import axios from "axios"

export default function CreateArticlePage() {

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            setLoading(true)
            setMessage("")

            // get token from localStorage
            const token = localStorage.getItem("jwt")

            const response = await axios.post(
                "http://localhost:4001/api/article",
                {
                    title: formData.title,
                    content: formData.content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(response.data)

            setMessage("Article created successfully!")

            // clear form
            setFormData({
                title: "",
                content: ""
            })

        } catch (error) {

            console.log(error)

            setMessage(
                error.response?.data?.message ||
                "Failed to create article"
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-6">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-4 p-6 rounded-sm shadow-lg"
            >

                <h1 className="text-3xl font-semibold text-center">
                    Create Article
                </h1>

                <label htmlFor="title">Enter Title </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-3 "
                    required
                />

                <label htmlFor="content">Enter Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={8}
                    className="border p-3 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-3 rounded hover:cursor-pointer hover:bg-blue-800"
                >
                    {loading ? "Posting..." : "Post Article"}
                </button>

                {message && (
                    <p className="text-center">
                        {message}
                    </p>
                )}

            </form>

        </div>
    )
}