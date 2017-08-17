import React, { Component } from 'react'
import Toast from './components/toast/index.jsx'

export default
class App extends Component{
    constructor () {
        super()
        this.state = {
            duration: 2000
        }
    }
    handleEmit () {
        Toast.show('普通的Toast', this.state.duration)
        //Toast.success('操作成功', this.state.duration)
        //Toast.error('操作失败', this.state.duration)
        //Toast.warning('错误提示', this.state.duration)
    }
    render () {
        return (
            <div className="container">
                <div
                    className="btn"
                    onTouchEnd={this.handleEmit.bind(this)}
                >提示</div>
            </div>
        )
    }
}
