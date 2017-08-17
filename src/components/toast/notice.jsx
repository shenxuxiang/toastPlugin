import React, { Component } from 'react'
import pureRenderMixin from 'react-addons-pure-render-mixin'

export default
class Notice extends Component {
    constructor () {
        super()
        this.state = {
            leaveAnimation: false // 是否开始结束动画
        }
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentDidMount () {
        this.interval = setTimeout(() => {
            this.close()
        }, this.props.duration - 300)
    }
    componentWillUnmount () {
        this.clearTimer()
    }
    clearTimer () {
        clearTimeout(this.interval)
        this.interval = null
    }
    close () {
        this.clearTimer()
        this.setState({leaveAnimation: true})
        this.timer = setTimeout(() => {
            this.props.onCloseToast()
            clearTimeout(this.timer)
            this.timer = null
        }, 300)
    }
    render () {
        return (
            <div
                className={this.state.leaveAnimation ? 'toast-box-content leave' : 'toast-box-content'}
            >
                {this.props.content}
            </div>
        )
    }
}
