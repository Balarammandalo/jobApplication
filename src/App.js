import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobsItemDetails from './components/JobsItemDetails'

import ProtectedRouter from './components/ProtectedRouter'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRouter exact path="/" component={Home} />
    <ProtectedRouter exact path="/jobs" component={Jobs} />
    <ProtectedRouter exact path="/jobs/:id" component={JobsItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
