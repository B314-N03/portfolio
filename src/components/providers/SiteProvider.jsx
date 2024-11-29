import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const SiteContext = createContext({
    siteType: null,
    setSiteType: null,
});

export default function SiteProvider(props) {
    const [siteType, setSiteType] = useState("static");
    useEffect(() => {
        
    },[siteType])
    return (
        <SiteContext.Provider value={ { siteType, setSiteType } }>
            {props.children}
        </SiteContext.Provider>
    );
}