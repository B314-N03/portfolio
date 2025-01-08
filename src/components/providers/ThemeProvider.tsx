import React, { createContext, useEffect } from "react";
import { useState } from "react";

interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    setTheme: () => {}
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export default function ThemeProvider({children} : (ThemeProviderProps)): JSX.Element {
    const [theme, setTheme] = useState<string>('dark');

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = `${theme}-theme`;
    }, [theme]);

    return (
        <ThemeContext.Provider value={ { theme, setTheme } }>
            {children}
        </ThemeContext.Provider>
    );
}