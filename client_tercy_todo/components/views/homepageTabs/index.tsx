import { HomeTab } from "./HomeTab";
import { MyTasksTab } from "./MyTasksTab";
import { InboxTab } from "./InboxTab";
import { useHomePageTabs } from "../../../hooks";

export function HomePageCurrentTab(): JSX.Element{
    const { currentTab } = useHomePageTabs();

    function showCurrentTab(): JSX.Element{
        switch (currentTab) {
            case "home":
                return <HomeTab />;
            case "mytasks":
                return <MyTasksTab />;
            case "inbox":
                return <InboxTab />;
        }
    }

    return (
        <>
            {showCurrentTab()}
        </>
    )
}