import React, { createContext, useState, useEffect } from 'react'

export const AvatarContext = createContext();

export default function AvatarContextProvider({ children }) {

    // state
    const [avatar, setAvatar] = useState('');

    // component life cycle
    useEffect(() => {
        setAvatar(`https://api.multiavatar.com/${Date.now()}.svg`)
    }, [])


    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    )
}
