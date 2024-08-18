import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const ThemeContext = createContext({
    theme: null,
    setTheme: null,
});

export default function ThemeProvider(props) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = `${theme}-theme`;
    }, [theme]);

    return (
        <ThemeContext.Provider value={ { theme, setTheme } }>
            {props.children}
        </ThemeContext.Provider>
    );
}