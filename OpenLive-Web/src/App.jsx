import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Index from './pages/index'
import Meeting from './pages/meeting'
import Admin from './pages/admin'
import Screen from './pages/screen'
import { BrowserRouterHook } from './utils/use-router'
function App () {
  return (
    <BrowserRouterHook>
      <Switch>
        <Route exact path="/screen" component={Screen}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route exact path="/meeting/:name" component={Meeting}></Route>
        <Route path="/" component={Index}></Route>
      </Switch>
    </BrowserRouterHook>
  )
}

export default App
