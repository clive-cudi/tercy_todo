import React from "react";

export type HomePageTabCtxType = "home" | "mytasks" | "inbox";

export interface HomePageTabCtx_Props {
    currentTab: HomePageTabCtxType
    setCurrentTab: React.Dispatch<React.SetStateAction<HomePageTabCtxType>>
}

export const HomePageTabCtx = React.createContext<HomePageTabCtx_Props>({currentTab: "home", setCurrentTab: ()=>{}});