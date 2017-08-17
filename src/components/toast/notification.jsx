import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Notice from './notice.jsx'
import pureRenderMixin from 'react-addons-pure-render-mixin'

class Notification extends Component {
    constructor () {
        super()
        this.state = {
            notices: [],
            hasMask: true // 是否显示遮罩
        }
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this)
    }
    add (notice) {
        const { notices } = this.state
        const key = notice.key ? notice.key : notice.key = 'notification-' + new Date().getTime()
        const mask = notice.mask ? notice.mask : false
        const temp = notices.filter(item => item.key === key).length
        if (!temp) {
            this.setState(prevState => ({
                notices: prevState.notices.concat(notice),
                hasMask: mask
            }))
        }
    }
    remove (key) {
        this.setState(prevState => ({
            notices: prevState.notices.filter(item => item.key !== key)
        }))
    }
    getNoticeDom () {
        const { notices } = this.state
        const result = notices.map(item  => {
            const callBack = () => {
                this.remove(item.key)
                item.onClose && item.onClose()
            }
            return (
                <Notice
                    key={item.key}
                    {...item}
                    onCloseToast={callBack}
                />
            )
        })
        return result
    }
    getMaskDom () {
        const { notices, hasMask } = this.state
        if (notices.length > 0 && hasMask === true) {
            return (
                <div className="toast-box-mask"></div>
            )
        }
    }
    render () {
        const noticeDom = this.getNoticeDom()
        const maskDom = this.getMaskDom()
        return (
            <div className="toast-box">
                {maskDom}
                {noticeDom}
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
        notice (props) {
            notification.add(props)
        },
        removeNotice (key) {
            notification.remove(key)
        },
        destory () {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

export default Notification
