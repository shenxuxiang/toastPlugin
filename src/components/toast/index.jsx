import './style.css'
import React from 'react'
import Notification from './notification.jsx'
let newNotification

const getNewNotification = () => {
    if (!newNotification) {
        newNotification = Notification.reWrite()
    }
    return newNotification 
}

const notice = (content, duration, onClose, type, icon, mask = false) => {
    let notificationInit = getNewNotification()
    notificationInit.notice({
        duration,
        onClose,
        mask,
        content: !! icon ? (
            <div
                className={type === 'show' ? 'toast-box-content' : 'toast-box-content hasIcon'}
            >
                <div className="toast-box-content-icon">
                    <i
                        style={{fontSize: '24px'}}
                        className={'iconfont icon-' + icon}
                    ></i>
                </div>
                <div className="toast-box-content-txt">{content}</div>
            </div>
        ) : (
            <div
                className={type === 'show' ? 'toast-box-content' : 'toast-box-content hasIcon'}
            >
                <div className="toast-box-content-txt">{content}</div>
            </div>
        )
    })
}

export default {
    show (content, duration, onClose, mask) {
        return notice(content, duration, onClose, 'show', null, mask)
    },
    success (content, duration, onClose, mask) {
        return notice(content, duration, onClose, 'success', 'success', mask)
    },
    warning (content, duration, onClose, mask) {
        return notice(content, duration, onClose, 'warning', 'warning', mask)
    },
    error (content, duration, onClose, mask) {
        return notice(content, duration, onClose, 'error', 'error', mask)
    },
    hide () {
        if (newNotification) {
            newNotification.destory()
            newNotification = null 
        }
    }

}




