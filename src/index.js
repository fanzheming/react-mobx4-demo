import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { observable,action,autorun } from 'mobx';
import { observer } from 'mobx-react'

// import './decorator'  // 装饰器

class Store {
  @observable count = 0
  @observable foo = 'red'
  @action.bound increment () {
    console.log(this)
  }
}

const store = new Store()

autorun(()=>{
  console.log(store.foo)
})

store.foo = 'pink'
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
        <div>
          {store.count}
          <p><button onClick={store.increment}>increment</button></p>
          <p><button onClick={this.clickTest.bind(this)}>test</button></p>
        </div>
        
      )
    }
}

ReactDOM.render(
    <App store={new Store()}/>,
  document.getElementById('root')
)