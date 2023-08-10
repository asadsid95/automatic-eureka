'use client'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"


export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)


    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log("login successful", response)
            router.push('/profile')

        } catch (error: any) {
            console.log('login failed: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing" : "Login"}</h1>

            <hr />
            {/* <form className="flex flex-col items-center justify-center py-2"> */}

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
                type='submit'
                onClick={onLogin}
                className="border-gray-400 rounded-lg hover:bg-gray-600 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href='/signup' className="hover:bg-blue-500">Go to Signup</Link>
            {/* </form> */}
        </div>
    )
}