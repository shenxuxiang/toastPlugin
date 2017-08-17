## Folder Structure
```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    app.js
    index.js
    components/
      toast/
        index.jsx
        notification.jsx
        notice.jsx
        style.css
        font/
    static/
      images/
      css/
        main.css

```
* Toast 插件内容在components/toast目录下面， 可以直接将toast文件夹复制拷贝到项目中
* Toast 插件用到了icon图标，以下载完成font文件夹中，不需要再起下载
* 使用Toast插件，需要您去下载 [react-addons-pure-render-mixin](https://www.npmjs.com/package/react-addons-pure-render-mixin).<br>
或命令行执行 npm run --save react-addons-pure-render-mixin

## Toast 如何使用
```
  // 在所需文档中引入Toast
  import Toast from './components/toast/index.jsx'
  // 可以在react事件或者回掉函数中去触发
  handleEmit () {
    Toast.show('普通的Toast', this.state.duration)
    // Toast.success('操作成功', this.state.duration)
    // Toast.error('操作失败', this.state.duration)
    // Toast.warning('错误提示', this.state.duration)
  }
  // 记得在 componentWillUnmount 生命周期中销毁Toast
  componentWillUnmount() {
    Toast.hide()
  }

```
