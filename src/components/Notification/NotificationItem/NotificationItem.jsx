import React, { memo } from 'react';
// import { Context } from "../../../contexts/index";


function NotificationItem({ notification, index }) {
    // const [state, dispatch] = React.useContext(Context);
    const deleteNotification = (() => {
        // dispatch({ 'type': 'delete_notification', 'index': index })
    })

    return (
        <div className={`KIPARISS_UI_noteItem ${notification.type}`}>
            <div className={`KIPARISS_UI_noteItemText`}>{notification.text}</div>
            <button type="submit" className="btn-close" aria-label="Close" onClick={() => { deleteNotification() }}></button>
        </div>
    );
}


const NotificationItemMemo = memo(NotificationItem);
export default NotificationItemMemo;
