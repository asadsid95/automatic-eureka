'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState('nothing')

    const logout = async () => {

        try {

            await axios.get('/api/users/logout')

            router.push('/login')

        } catch (error: any) {
            console.log(error.message)

        }


    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)

    }


    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen">

            <h1>Profile</h1>
            <h2
                className='p-3'> {data === 'nothing' ? "No user" : <Link href={`/profile/${data}`}
                    className='bg-gray-600 rounded-md hover:bg-gray-400 p-4'>{data}</Link>}</h2>
            <hr />
            <button
                onClick={logout}
            >Logout</button>
            <button
                onClick={getUserDetails}
                className='bg-green-700 rounded-lg p-4 hover:bg-gray-400'>Get User Data</button>
        </div>
    )

}