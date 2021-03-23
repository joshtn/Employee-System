import './App.css'
import Axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import System from './components/System'
import PageNotFound from './components/PageNotFound'

function App() {
  Axios.defaults.withCredentials = true

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Login />} />
          <Route path="/system" render={(props) => <System />} />
          <Route path="/register" render={(props) => <Register />} />
          <Route render={(props) => <PageNotFound />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
