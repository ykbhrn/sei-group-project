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
import ProfilePage from './components/common/ProfilePage'
import PublicProfile from './components/common/PublicProfile'
import ErrorPage from './components/common/ErrorPage'
import Chat from './components/common/Chat'

console.log('%cThis app was built by Aino, George, Jakub, and Yarden, check us out on github', 'color:blue;font-size:20px;font-weight:bold')
console.log('%cAino: github.com/ainokyto\nGeorge: github.com/jompra\nJakub: github.com/ykbhrn\nYarden: github.com/YBL123', 'color:red;font-size:16px')

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <SecureRoute path='/plants/:id/edit' component={EditPlant} />
      <SecureRoute path='/plants/new' component={NewPlant} />
      <SecureRoute path='/plants/:id' component={ShowPlant} />
      <SecureRoute path='/plants' component={IndexPlants} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <SecureRoute path="/maps" component={Maps} />
      <SecureRoute path="/profile/:id" component={PublicProfile} />
      <SecureRoute path="/profile" component={ProfilePage} />
      <SecureRoute path="/chat" component={Chat} />
      <Route path="/*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
)

export default App