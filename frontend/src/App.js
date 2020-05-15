import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import IndexPlants from './components/plants/IndexPlants'
import ShowPlant from './components/plants/ShowPlant'
import NewPlant from './components/plants/NewPlant'
import EditPlant from './components/plants/EditPlant'




const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/plants/:id/edit' component={EditPlant} />
      <Route path='/plants/new' component={NewPlant} />
      <Route path='/plants/:id' component={ShowPlant} />
      <Route path='/plants' component={IndexPlants} />
    </Switch>
  </BrowserRouter>
)

export default App
