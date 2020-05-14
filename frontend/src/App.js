import React from 'react'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const App = () => (
  <BrowserRouter>
  <Navbar/>
  <Switch>
    <Route exact path='/' component={Home} />
  </Switch>
  </BrowserRouter>
)

export default App
