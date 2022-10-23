import React from 'react'
import { SWRConfig } from 'swr'

import { AppProvider } from './AppContext/AppProvider'

interface ContextProviderProps {
    children?:React.ReactNode
}

const  localStorageProvider = ()=>{
    if(typeof window !== 'undefined' && window.localStorage){
        const map = new Map(JSON.parse(localStorage.getItem('app-api-cache') || '[]'));
        window.addEventListener('beforeunload', (e) => {
            const appCache = JSON.stringify(Array.from(map.entries()));
            localStorage.setItem('app-api-cache', appCache);
        });
        return map
    }else{
        return new Map();
    }
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    return (
        <SWRConfig
            value={{suspense: false, provider: localStorageProvider}}>
            <AppProvider>{children}</AppProvider>
        </SWRConfig>
    )
}



