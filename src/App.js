import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {CurrentUserProvider} from './context/currentUser'

import Routes from './routes'
import TopBar from './components/TopBar'
import CurrentUserChecker from './components/CurrentUserChecker'

const App = () => {
 return (
  <CurrentUserProvider>
   {' '}
   {/* tu sprawdzamy usera */}
   <CurrentUserChecker>
    <Router>
     <TopBar />
     <Routes />
    </Router>
   </CurrentUserChecker>
  </CurrentUserProvider>
 )
}

export default App
