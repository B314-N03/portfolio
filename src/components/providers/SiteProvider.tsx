import React, { createContext, useEffect, useState, ReactNode} from "react";

interface SiteContextType {
  siteType: string;
  setSiteType: React.Dispatch<React.SetStateAction<string>>;
}

export const SiteContext = createContext<SiteContextType>({
    siteType: "static",
    setSiteType: () => {},
});

interface SiteProviderProps {
  children: ReactNode
}

export default function SiteProvider({children}: SiteProviderProps): JSX.Element {
    const [siteType, setSiteType] = useState("static");
    useEffect(() => {
        
    },[siteType])
    return (
        <SiteContext.Provider value={ { siteType, setSiteType } }>
            {children}
        </SiteContext.Provider>
    );
}