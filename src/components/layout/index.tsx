import Header from '@components/modules/header/header'
import React from "react";

type APPLayoutProps = {
    children: React.ReactNode,
};

export function APPLayout({children}: APPLayoutProps) {
    return (<>
        <Header/>
        <main>{children}</main>
    </>)
};
