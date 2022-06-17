import { useState } from "react";
import { HomePageTabCtx, HomePageTabCtxType } from "../../../context";

export const HomePageTabCtxProvider = ({children}: {children: any}): JSX.Element => {
    const [currentTab, setCurrentTab] = useState<HomePageTabCtxType>("home");

    return (
        <HomePageTabCtx.Provider value={{currentTab, setCurrentTab}}>
            {children}
        </HomePageTabCtx.Provider>
    );
}