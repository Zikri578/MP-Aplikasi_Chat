import React from 'react'
import { useNavigate } from "react-router-dom"

export default function SplashScreen() {

    const navigate = useNavigate();

    // untuk login
    const toLogin = () => {
        navigate('/login')
    }

    return (
        <main className='w-screen h-screen p-8 bg-gradient-to-t from-green-300 to-green-500 flex flex-col'>
            <h1 className='text-[70px] text-white font-bold leading-10'>Chat Kuy...!</h1>
            <p className='text-[20px] text-white font-semibold mt-4'>
                Chat Dengan orang
                yang belum kita kenal
                diseluruh dunia!</p>
            <button className='w-full h-10 bg-emerald-500 text-white hover:bg-emerald-500 to-emerald-600 mt-auto rounded-lg z-[100]' onClick={toLogin}>Login</button>
            <img src="https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" className='w-screen h-screen object-cover absolute opacity-25 top-0 left-0' />
        </main>
    )
}
