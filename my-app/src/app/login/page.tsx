'use client'
import Link from "next/link"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { axios } from "axios"


export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Login</h1>

            <hr />
            <form className="flex flex-col items-center justify-center py-2">

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
                    onClick={onLogin}
                    className="border-gray-400 rounded-lg hover:bg-gray-600 focus:outline-none focus:border-gray-600">Login here</button>
                <Link href='/signup' className="hover:bg-blue-500">Go to Signup</Link>
            </form>
        </div>
    )
}