import { useState, useContext } from "react";
import {
  NotificationsCtx,
  notificationCtx_Props,
  NotificationsCtxTypes,
} from "../../context";

interface useNotificationReturns {
  getNotificationsNumber: () => number;
  updateNotifications: (params: NotificationsCtxTypes) => NotificationsCtxTypes;
}

export function useNotification(): useNotificationReturns {
  const { notifications, setNotifications } = useContext(
    NotificationsCtx
  ) as notificationCtx_Props;

  function getNotificationsNumber(): number {
    return notifications.number;
  }

  function updateNotifications(
    params: NotificationsCtxTypes
  ): NotificationsCtxTypes {
    if (params) {
      setNotifications({
        number: params.number,
        status: params.status,
        data: { ...params.data },
      });
    }

    return notifications;
  }

  function clearNotifications() {
    setNotifications({
      number: 0,
      status: false,
      data: {},
    });
  }

  return { getNotificationsNumber, updateNotifications };
}
