import React from 'react'
import { useLocalStorageState } from '../hooks';

const UserContext = React.createContext()

function UserProvider(props) {
    const value = useLocalStorageState("User")
    return <UserContext.Provider value={value} {...props}/>
}

export default UserProvider;