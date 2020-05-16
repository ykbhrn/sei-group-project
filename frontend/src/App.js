import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'
import IndexPlants from './components/plants/IndexPlants'
import ShowPlant from './components/plants/ShowPlant'
import NewPlant from './components/plants/NewPlant'
import EditPlant from './components/plants/EditPlant'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Maps from './components/common/Maps'



const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <SecureRoute path='/plants/:id/edit' component={EditPlant} />
      <SecureRoute path='/plants/new' component={NewPlant} />
      <Route path='/plants/:id' component={ShowPlant} />
      <Route path="/maps/:id" component={Maps} />
      <Route path='/plants' component={IndexPlants} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/*" component={Error} />
    </Switch>
  </BrowserRouter>
)

export default App
