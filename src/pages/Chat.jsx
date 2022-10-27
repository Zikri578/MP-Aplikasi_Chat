import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu, AiOutlineSetting, AiOutlineLogout } from "react-icons/all"
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import { db } from "../config/FirebaseConfig"
import { collection, doc, getDocs, setDoc, onSnapshot } from "firebase/firestore"

function ChatMenu() {

    const navigate = useNavigate();

    // logout
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    useEffect(() => {
        let user = localStorage.getItem("chat_kuy_user")
        if (user) {
            return (
                navigate("/chat")
            )
        }
    }, [])


    return (
        <div className='w-[30%] flex flex-col fixed top-16 right-0 bg-white shadow-lg'>
            <div className='flex h-10 w-full items-center justify-between px-3 '>
                <AiOutlineSetting /> Setting
            </div>
            <div className='flex h-10 w-full items-center justify-between px-3' onClick={handleLogout}>
                <AiOutlineLogout /> Logout
            </div>
        </div>
    )
}

export default function Chat() {

    // state
    const [showMenu, setShow] = useState(false);
    const [message, setMessage] = useState([
        {
            id: 123213,
            message: "ini user lain lho",
            createdAt: Date.now(),
            user: {
                username: "muzik",
                avatar: "https://api.multiavatar.com/muzik.svg"
            }

        }
    ]);

    const [signUser, setSignUser] = useState(JSON.parse(localStorage.getItem("chat_kuy_user")));
    const [loading, setLoading] = useState(true);

    // membaca data di firebase
    const getChatCollection = async () => {
        let arrayCollection = []
        let chatColRef = await collection(db, "chat")
        let result = await getDocs(chatColRef)
        // return result
        result.forEach((e) => {
            arrayCollection.push(e.data())
        })
        return arrayCollection
    }

    // realtime update chat
    const chatTrigger = () => {
        let chatRef = collection(db, "chat")
        onSnapshot(chatRef, (re) => {
            // console.info(re.docChanges())
            getChatCollection().then(res => {
                setMessage(res)
            })
        })
    }


    // component life cycle
    useEffect(() => {
        let user = localStorage.getItem("chat_kuy_user");
        if (!user) {
            return (window.location.href = "/")
        }
        getChatCollection().then(res => {
            setMessage(res)
        })

        setLoading(false)

        // realtime update chat
        return () => {
            chatTrigger()
        }

    }, [db])

    // toggle menu
    const toggleMenu = () => {
        setShow(!showMenu)
    }

    // handle scroll button
    const scrollButtonPesan = () => {
        let docH = document.body.scrollHeight
        window.scrollTo(0, docH)
        //console.info(docH)
    }

    // handle message
    const handleMessage = (e) => {
        // stop reload pag
        e.preventDefault()

        // menangkap id pesan
        let pesan = e.target.message.value;
        let user = JSON.parse(localStorage.getItem("chat_kuy_user"))

        if (!pesan) {
            return
        }

        // mengosongkan message
        e.target.message.value = ""

        // memanggil id message
        // setMessage([...message, {
        //     id: Date.now(),
        //     message: pesan,
        //     createdAt: Date.now(),
        //     user: user
        // }])

        // db firebase
        let chatRef = doc(db, "chat", Date.now() + signUser.username)
        setDoc(chatRef, {
            id: Date.now(),
            message: pesan,
            createdAt: Date.now(),
            user: user
        }).then(res => {
            console.info(res)
        })

        scrollButtonPesan()

        // menampilkan id message
        // console.info(message)
    }

    if (loading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                loading...
            </div>
        )
    }

    return (
        <main className='w-screen h-screen flex flex-col'>

            <header className='w-full h-16 px-6 flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 fixed top-0 left-0'>

                <div className='flex gap-2 text-white items-center'>
                    <img src={signUser?.avatar} alt="avatar" className='w-10 h-10' />
                    <h1>@{signUser?.username}</h1>
                </div>

                <GiHamburgerMenu onClick={toggleMenu} className='text-2xl text-white' />

            </header>

            {showMenu && <ChatMenu />}

            <div className='w-full mt-auto flex flex-col py-[80px] px-3 gap-2'>
                {message.map((e) => {
                    return (
                        <div className={`w-auto p-4 bg-white flex flex-col rounded-lg shadow-md max-w-[40%] 
                        ${e.user.username !== signUser.username ? "mr-auto" : "ml-auto"} last:mb-20`} key={e.id}>

                            <p className={`${e.user.username !== signUser.username ? "text-left" : "text-right"}`}>{e.message}</p>

                            <div className='mt-4 flex gap-2 items-center'>

                                <img src={e.user.avatar} alt="" className='w-5 h-5' />

                                <div className='flex flex-col text-gray-500'>
                                    <small className='text-[8px]'>{e.user.username}</small>
                                    <small className='text-[8px]'>{moment(e.createdAt).format("dddd DD/MM/YYYY hh:mm")}</small>
                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>

            <form action="" className='w-full h-16 flex px-6 items-center bg-gradient-to-r from-green-500 to-green-700 fixed bottom-0 left-0 gap-2' onSubmit={handleMessage}>
                <input type="text" className='h-10 rounded-full px-4 bg-white flex-1' id="message" />
                <button className='h-10 w-10 text-white rounded-full bg-emerald-600'> {">"} </button>
            </form>


        </main>
    )
}
