'use client'
import Link from "next/link"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { axios } from "axios"


export default function SignupPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Sign up</h1>

            <hr />
            <form className="flex flex-col ">
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
                    <label htmlFor="password">Password: </label>
                    <input
                        id='password'
                        type='text'
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })}
                        placeholder="Password" />
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
                <button
                    onClick={onSignup}
                    className="border-gray-400 rounded-lg hover:bg-gray-600 focus:outline-none focus:border-gray-600">Sign up here</button>
                <Link href='/login' className="hover:bg-blue-500">Go to login</Link>
            </form>
        </div>
    )
}