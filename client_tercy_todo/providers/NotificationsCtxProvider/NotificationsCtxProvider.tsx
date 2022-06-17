import React, { useState } from "react";
import { NotificationsCtx, NotificationsCtxTypes } from "../../context";

export const NotificationsCtxProvider = ({children}: any) => {
    const [notifications, setNotifications] = useState<NotificationsCtxTypes>({
        status: false,
        number: 0,
        data: {}
    })

    return (
        <NotificationsCtx.Provider value={{notifications, setNotifications}}>
            {children}
        </NotificationsCtx.Provider>
    )
}