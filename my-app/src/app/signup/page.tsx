'use client'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"


export default function SignupPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)

            console.log("Signup success", response.data)

            router.push('/login')
        } catch (error: any) {
            console.log("Sign up failed. Error: " + error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing" : "Signup"}</h1>

            <hr />
            {/* <form className="flex flex-col "> */}
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    id='username'
                    type='text'
                    value={user.username}
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })}
                    placeholder="Username" />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input
                    id='email'
                    type='text'
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })}
                    placeholder="Email" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    id='password'
                    type='password'
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })}
                    placeholder="Password" />
            </div>
            <button
                id='signup'
                type='submit'
                onClick={onSignup}
                className="bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:border-gray-600">{buttonDisabled ? "awaiting" : "Signup"}</button>
            <Link href='/login' className="hover:bg-blue-500">Go to login</Link>
            {/* </form> */}
        </div>
    )
}