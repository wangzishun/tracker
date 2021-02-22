import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

// import Tracker from '../../dist/tracker.esm.js'
// import Tracker from '../../src/index'

import Tracker from 'tracker'
function name() {
  return log
}

function log(target: Object, propertyName: string) {
  let _val = this[propertyName]
}
class Parent extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { name: 'frank' }
  }

  @Tracker.track('')
  onClick = (e) => {
    console.log(e, this.state.name)

    return { 1: 'a' }
  }

  @Tracker.track(function(...rest) {
    console.log(this + '2222')
    debugger
    return { ...rest, name: 'wangzi', Key: 'a' }
  })
  onClickHandler() {
    // console.log(111, this.state.name)

    return { a: 1 }
  }

  cusFn = () => {
    console.log(this.state.name + '33333')
  }

  render() {
    console.log(this)
    return (
      <div>
        <div onClick={this.onClick}>hi</div>
        <button onClick={this.onClickHandler}>1111111</button>
      </div>
    )
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a className="App-link" href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
      </header>
      <Parent />
    </div>
  )
}

export default App
