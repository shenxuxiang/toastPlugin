import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Notice extends PureComponent {
    static propTypes = {
        emitCloseToast: PropTypes.func,
        duration: PropTypes.number,
        content: PropTypes.any, // Notice显示的内容
    }
    static defaultProps = {
        emitCloseToast: null,
        duration: 3000
    }
    constructor () {
        super()
        this.state = {
            leaveAnimationStart: false
        }
    }
    componentDidMount () {
        this.interVal = setTimeout (() => {
            this.onClose()
        }, this.props.duration - 300)
    }
    componentWillUnmount () {
        this.clearTimer()
    }
    clearTimer () {
        if (this.interVal) {
            clearTimeout(this.interVal)
            this.interVal = null
        }
    }
    onClose () {
        this.clearTimer()
        this.setState({leaveAnimationStart: true})
        this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
            this.props.emitCloseToast && this.props.emitCloseToast()
        }, 300)
    }
    render () {
        return (
            <div
                className={this.state.leaveAnimationStart ? 'toast-box-txt leave' : 'toast-box-txt'}
            >
                {this.props.content}
            </div>
        )
    }
}