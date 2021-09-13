import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { observable,action,autorun, computed ,configure, runInAction, when, reaction} from 'mobx';
import { observer } from 'mobx-react'

// import './decorator'  // 装饰器

// 通过配置  强制改变store的属性要通过调用action
configure({
  enforceActions:'observed'
})
class Store {
  //监听属性
  @observable count = 0
  @observable foo = 'red'
  @observable bar = 'thank'
  @observable tim = 99

  // bound为方法绑定this为该store
  @action.bound increment () {
    this.count += 1
  }

  // 计算属性
  @computed get getTotalCount(){
    return this.count * 2
  }

  @action testAction(){
    console.log(this)
    // this.count += 100
    // this.foo = 'orange'
  }

  @action changeBarAction(){
    this.bar = 'you'
  }

  @action changetTimAction(){
    this.tim = 101
  }

  // 异步改变store属性
  @action.bound asyncAction(){
    // 1.方式1 直接调用同步的action
    // this.increment()
    // 2. 方式2 调用action注解方法   不推荐
    // action('incrementCount',()=>{
    //   this.count += 2
    // })()
    // 3. 方式3 调用runInAction  适用于逻辑比较简单的
    runInAction(()=>{
      this.count += 3
    })
    
  }

}

const store = new Store()

// 回调函数中被 **监听的属性**  发生改变后自动运行    属性不在回调函数中，换句话说就是没有被依赖的情况下autorun是不会执行的    
autorun(()=>{
  console.log(`auto run: ${store.foo}   ${store.count}`)
})

// store.asyncAction()
// store.changeBarAction() //autorun是不会执行的

// 改变store属性后自动触发↑的autorun
// runInAction(()=>{
//   store.count += 100
//   store.foo = 'orange'
// })

// 满足某些条件下执行，只执行一次
when(()=>{
  return store.tim >= 100
},()=>{
  console.log('when =>', store.tim)
})

reaction(()=>{
  return store.count
},(data,reaction)=>{
  console.log('reaction =>'+data)
  reaction.dispose()
})

store.increment()



// store.changetTimAction()



// store.testAction()
// store.count += 100

// const ta = store.testAction
// ta()



@observer
class App extends React.Component {
    constructor(props){
      super()
      this.props = props
    }

    clickTest(){
      console.log(this)
    }
    render(){
      const {store} = this.props
      return (
        <div style={{padding:'10px'}}>
          {store.count}
          <p>{store.getTotalCount}</p>
          <p><button onClick={store.increment}>increment</button></p>
          <p><button onClick={this.clickTest.bind(this)}>test</button></p>
          <p><button onClick={store.testAction}>testAction</button></p>
        </div>
        
      )
    }
}

ReactDOM.render(
    <App store={new Store()}/>,
  document.getElementById('root')
)