import React from 'react';

export interface NotificationsCtxTypes {
    status: boolean
    number: number
    data: {}
}

const notificationsCtx_template: NotificationsCtxTypes = {
    status: false,
    number: 0,
    data: {}
}

export interface notificationCtx_Props {
    notifications: NotificationsCtxTypes,
    setNotifications: React.Dispatch<React.SetStateAction<NotificationsCtxTypes>>
} 

export const NotificationsCtx = React.createContext<notificationCtx_Props | null>({notifications: notificationsCtx_template, setNotifications: ()=>{}})
