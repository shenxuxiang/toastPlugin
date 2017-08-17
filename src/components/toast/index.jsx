import './style.css'
import React from 'react'
import Notification from './notification.jsx'

let newNotification
const getNotification = () => {
    if (!newNotification) {
        newNotification = Notification.reWrite()
    }
    return newNotification
}

const notice = (content, duration = 3000, onClose, type, icon, mask = false) => {
    const notificationInit = getNotification()
    notificationInit.notice({
        duration,
        mask,
        onClose,
        content: type === 'show' ? (
            <div
                className="toast-box-content-con"
            >
                <div className="toast-box-content-con-txt">
                    {content}
                </div>
            </div>
        ) : (
            <div
                className="toast-box-content-con hasIcon"
            >
                <div className="toast-box-content-con-icon">
                    <i
                        className={'iconfont icon-'  + icon}
                        style={{fontSize: '24px'}}
                    ></i>
                </div>
                <div className="toast-box-content-con-txt">
                    {content}
                </div>
            </div>
        )
    })
}

export default {
    show (content, duration, onClose, mask) {
        return notice(content, duration, onClose, 'show', 'show', mask)
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
    hide () { // 销毁
        if (newNotification) {
            newNotification.destory()
            newNotification = null
        }
    }
}
