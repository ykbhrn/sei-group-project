import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import IndexPlants from './components/plants/IndexPlants'
import ShowPlant from './components/plants/ShowPlant'
import NewPlant from './components/plants/NewPlant'
import EditPlant from './components/plants/EditPlant'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ProfilePage from './components/common/ProfilePage'




const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/plants/:id/edit' component={EditPlant} />
      <Route path='/plants/new' component={NewPlant} />
      <Route path='/plants/:id' component={ShowPlant} />
      <Route path='/plants' component={IndexPlants} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/*" component={Error} />
    </Switch>
  </BrowserRouter>
)

export default App
