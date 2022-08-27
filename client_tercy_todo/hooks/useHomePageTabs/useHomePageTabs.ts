import { useState, useContext } from "react";
import {
  HomePageTabCtx,
  HomePageTabCtx_Props,
  HomePageTabCtxType,
} from "../../context";

export function useHomePageTabs() {
  const { currentTab, setCurrentTab } = useContext(
    HomePageTabCtx
  ) as HomePageTabCtx_Props;

  function switchTab(tab: HomePageTabCtxType): void {
    if (tab !== currentTab) {
      setCurrentTab(tab);
      return;
    } else if (tab === currentTab) {
      return;
    } else {
      setCurrentTab("home");
      return;
    }
  }

  return {
    currentTab,
    setCurrentTab,
    switchTab,
  };
}
