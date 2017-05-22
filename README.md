# Redux-PickApple
![](https://raw.githubusercontent.com/ckinmind/apple-basket-redux/master/src/images/appleBasket.gif)


## 技术栈
- React.js with ES6
- Redux for predictable state
- Redux-thunk for middleware
- immutable for persistent data
- fetch for request 
- Webpack for building tool

## 项目说明
- 本项目来自文章[《实例讲解基于 React+Redux 的前端开发流程》](https://segmentfault.com/a/1190000005356568)
- 摘苹果的fetch请求地址使用的hackernews的api,只是为了让请求走通，数据还需要自己模拟
- 本项目都从码云移到github上,因此只有一次commit,[码云url](https://git.oschina.net/zf6644777/Redux-ApplePick)

## 如何开始
```js
> npm install -g cnpm --registry=https://registry.npm.taobao.org
> cnpm install
> npm run dev
> http://localhost:8080/
```

### 新手教程
在开始之前，我建议大家看一些react和redux的参考资料，这样下面的东西才会更容易理解，如果遇到什么问题，可以查看参考资料

- react [react官网](https://facebook.github.io/react/) [react中文教程](http://react-china.org/c/jiao-cheng) [阮一峰react入门](http://www.ruanyifeng.com/blog/2015/03/react.html) 
- router [react-router](https://github.com/ReactTraining/react-router)
- redux [redux官网](http://redux.js.org/) [redux中文](http://cn.redux.js.org/) 
- es6 [es6英文](http://exploringjs.com/) [阮一峰es6](http://es6.ruanyifeng.com/) 
- webpack [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f) 
那么接下来 
下面先来总体了解一下 redux 应用的基本原理，一图胜千言：
```
store（存放状态） -> container（显示状态） -> reducer （处理动作）-> store
```
这一点对精细化分工协作很有好处。

我们来看看这三个概念：

 -store 是应用的状态管理中心，保存着是应用的状态（state），当收到状态的更新时，会触发视觉组件进行更新。
 -container 是视觉组件的容器，负责把传入的状态变量渲染成视觉组件，在浏览器显示出来。
 -reducer 是动作(action)的处理中心， 负责处理各种动作并产生新的状态（state），返回给store。
NOTE：从对象的包含关系上讲，reducer 是store的一部分，但在逻辑上我们把它分出来，这样会比较容易理解整个redux流程。

我们可以做个形象的比喻，把 js 比喻成巴士，把 store, container, reducer 比喻为三个车站，再把 state 和 action 比喻成两种乘客。这是一趟环路巴士：

js巴士 从 store车站 出发，载上 state乘客 ，state乘客 到达某个 container车站 下车并把自己展示出来
过了一会，有一个 action乘客 上车了，js巴士 把 action乘客 送到 reducer车站，在这里 action乘客 和 state乘客 生了一个孩子 new state，js巴士把 new state 送回了 store车站（好像是人生轮回→_→）
redux 只是定义了应用的数据流程，只解决了 “数据层”（model layer） 的问题，一般还会使用 react， angular 等作为“显示层” （UI layer） 来一起使用，我们项目采用 react 作为显示框架。


下文的展示的js代码，会用到少量简单的 es6 语法，可以在遇到时参考这里，或自己查找资料：

import / export ：es6代码模块化模式
let 声明语句 ： 块级变量声明语句
箭头函数： (..) => {..} 形式的函数
我们会使用 babel 编译器把es6语法编译成es5, 所以大家不必担心浏览器兼容性问题，可以大胆使用es6。


按照开发的内容，我们把前端团队分为两个小组： “布局组” 和 “逻辑组”，每个小组有2种任务，一共4种任务。

布局组 - 负责 contianer、component 部分
任务1：静态布局 - 使用 HTML + CSS 静态布局
任务2：动态布局 - 使用 JSX 语法对静态布局做动态渲染处理
逻辑组 - 负责 action、reducer 部分
任务1：action 开发 - 制作 redux 流程的 action
任务2：reducer 开发 - 制作 redux 流程的 reducer

布局组 要求对 HTML + CSS 布局比较熟悉，只需要会简单的 js 即可， 不需要完整地理解redux流程。
逻辑组 要求对 js 比较熟悉，最好可以比较完整地理解redux流程， 但基本不需要涉及HTML + CSS布局工作。

接下来，先给出我们教程相关的 src 目录。这里大家可以先一扫而过，大概了解即可

```
- src              源码文件夹：包含项目源码，我们基本都在这个文件夹下做开发
    - containers   容器文件夹：存放容器组件，比如 “苹果篮子”
    - components   组件文件夹：存放普通显示组件，比如 “苹果”
    - actions      actions文件夹：存放可以发出的action 
    - reducers     reducers文件夹：存放action的处理器reducers
    - services     服务文件夹：存放经过封装的服务，如 ajax服务, 模拟数据服务
    - styles       样式文件夹：存放应用的样式，如css, scss
    - images       图片文件夹：存放图片资源
    - apis         开发接口文件夹：存放开发接口文档
```
任务1：静态布局
能力要求：只需要会使用 HTML + CSS （SASS）进行布局即可
任务内容：1. 苹果篮子组件（容器组件） 2. 水果组件（显示组件）
redux 的组件分为两类，一类是容器组件 container ，一类是普通显示组件 component。容器负责接收store中的state和并发送action, 大多数时候需要和store直接连接，容器一般不需要多次使用，比如我们这个应用的苹果篮子。普通组件放在容器里面，由容器确定显示的时机、数量和内容，普通组件一般会多次使用。
