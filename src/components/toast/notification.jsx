import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Notice from  './notice.jsx'

class Notification extends Component {
    constructor () {
        super()
        this.state = {
            notices: [],
            hasMask: true
        }
    }
    add (notice) {
        const { notices } = this.state
        const key = notice.key ? notice.key : notice.key = new Date().getTime()
        const mask = notice.mask ? notice.mask : false
        const temp = notices.filter((item) => item.key === key).length
        if (!temp) {
            this.setState((prevState) => ({
                notices: prevState.notices.concat(notice),
                hasMask: mask
            }))
        }
    }
    remove (key) {
        this.setState((prevState) => ({
            notices: prevState.notices.filter((notice) => notice.key !== key)
        }))
    }
    get noticeDom () {
        const { notices } = this.state
        let result = []
        result = notices.map((item) => {
            const callback = () => {
                item.onClose && item.onClose()
                this.remove(item.key)
            }
            return (
                <Notice
                    key={item.key}
                    { ...item }
                    emitCloseToast={callback}
                />
            )
        })
        return result
    }
    get maskDom () {
        const { notices, hasMask } = this.state
        if (notices.length > 0 && hasMask  === true) {
            return (
                <div className="toast-box-mask"></div>
            )
        }
    }
    render () {
        return (
            <div className="toast-box">
                {this.maskDom}
                {this.noticeDom}
            </div>
        )
    }
}

Notification.reWrite = () => {
    let div
    div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<Notification />, div)
    return {
        notice (propertys) {
            notification.add(propertys)
        },
        remove (key) {
            notification.remove(key)
        },
        destory () {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        },
        component: notification
    }
}

export default Notification
