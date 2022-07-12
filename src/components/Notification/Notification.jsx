import React, { memo, useEffect, useState } from 'react';
// import { Context } from "../../contexts/index";
import NotificationItem from './NotificationItem/NotificationItem.jsx';

function NotificationComponent() {
    // const [state, dispatch] = React.useContext(Context);
    const [notifications, setNotifications] = useState({})//state.notifications)

    // useEffect((() => {
    //     setNotifications(state.notifications)
    // }), [state])

    return notifications && notifications.length ? (
        <div className="KIPARISS_UI_notification">
            {notifications?.map((notification, index) => (
                <NotificationItem
                    notification={notification}
                    index={index}
                    key={index}
                />
            ))}
        </div>
    ) : null;
}

export const Notification = memo(NotificationComponent);
