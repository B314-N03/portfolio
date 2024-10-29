import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({
    loggedIn: null,
    userId: null,
});

export default function UserProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);


    useEffect(() => {

    }, [loggedIn, userId]);
    

    return (
        <UserContext.Provider value={ { loggedIn, setLoggedIn, userId, setUserId } }>
            {props.children}
        </UserContext.Provider>
    );



}