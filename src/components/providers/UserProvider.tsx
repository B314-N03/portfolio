import { createContext, useEffect, useState } from "react";


interface UserContextType {
    loggedIn: boolean;
    userId: string;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
    loggedIn: false,
    userId: "",
    setLoggedIn: () => {},
    setUserId: () => {},
});


interface UserProviderProps {
    children: React.ReactNode;
}

export default function UserProvider({children} : UserProviderProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");


    useEffect(() => {

    }, [loggedIn, userId]);
    

    return (
        <UserContext.Provider value={ { loggedIn, setLoggedIn, userId, setUserId } }>
            {children}
        </UserContext.Provider>
    );



}