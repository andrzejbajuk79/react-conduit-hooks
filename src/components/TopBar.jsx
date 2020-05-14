import React, {useContext} from 'react'
import {CurrentUserContext} from '../context/currentUser'
import {Link, NavLink} from 'react-router-dom'

const TopBar = () => {
 const [currentUserState] = useContext(CurrentUserContext)
 const userImage =
  (currentUserState.isLoggedIn && currentUserState.currentUser.image) ||
  'https://static.productionready.io/images/smiley-cyrus.jpg'
 // console.log('topbar', currentUserState)

 return (
  <nav className="navbar navbar-light">
   <div className="container">
    <Link className="navbar-brand" to="/">
     Medium
    </Link>
    <ul className="nav navbar-nav pull-xs-right">
     <li className="nav-item">
      <NavLink className="nav-link" to="/">
       Home
      </NavLink>
     </li>
     {currentUserState.isLoggedIn && (
      <>
       <li className="nav-item">
        <NavLink className="nav-link" to="/article/new">
         <i className="ion-compose" />
         &nbsp;New Post
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="/settings">
         <i className="ion-gear-a" />
         &nbsp; Settings
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink
         className="nav-link"
         to={`/profiles/${currentUserState.currentUser.username}`}
        >
         <img className="user-pic" src={userImage} alt="" />
         &nbsp; {currentUserState.currentUser.username}
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="/logout">
         <i className="ion-log-out" />
         Logout
        </NavLink>
       </li>
      </>
     )}

     {currentUserState.isLoggedIn === false && (
      <>
       <li className="nav-item">
        <NavLink className="nav-link" to="/login">
         Sign in
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="/register">
         Sign Up
        </NavLink>
       </li>
      </>
     )}
    </ul>
   </div>
  </nav>
 )
}

export default TopBar
