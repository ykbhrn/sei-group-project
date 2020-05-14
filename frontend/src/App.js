import React from 'react'
import IndexPlants from './components/plants/IndexPlants'
import NewPlant from './components/plants/NewPlant'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const App = () => (
  <BrowserRouter>
  <Navbar/>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/plants/new' component={NewPlant} />
    <Route path='/plants' component={IndexPlants} />
  </Switch>
  </BrowserRouter>
)

export default App
