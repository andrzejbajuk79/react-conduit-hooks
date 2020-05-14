import React, {useState, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import * as actions from '../../context/types'
import {CurrentUserContext} from '../../context/currentUser'
import {useEffect} from 'react'
import useFetch from '../../hooks/useFetchHook'
import useLocalStorage from '../../hooks/useLocalStorage'
import BackendErrorMessages from '../../components/BackendErrorMessages '

export const Authentication = (props) => {
 //constants
 const isLogin = props.match.path === '/login' //jesli isLogin =FALSE to znaczy ze to jest register
 const pageTitle = isLogin ? 'Sign in' : 'Sign Up'
 const descriptionLink = isLogin ? '/register' : '/login'
 const descriptionText = isLogin ? 'Need an account' : 'Have an account'
 const apiUrl = isLogin ? '/users/login' : '/users'
 //forms fields
 const [email, setEmail] = useState('')
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [isSuccesfullSubmit, setIsSuccesfullSubmit] = useState(false)
 // Custom Hooks
 const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
 const [, setToken] = useLocalStorage('token')
 //------------------z reducerem!!!
 const [, dispatch] = useContext(CurrentUserContext)
 //------------------ bez reducera!!!!
 // const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)

 const handleSubmit = (e) => {
  // debugger
  e.preventDefault()
  const user = isLogin ? {email, password} : {email, password, username}
  doFetch({
   method: 'post',
   data: {user},
  })
 }
 useEffect(() => {
  if (!response) {
   return
  }
  // debugger
  setToken(response.user.token)
  setIsSuccesfullSubmit(true)
  // Z REDUCEREM!!!!!!
  dispatch({type: actions.SET_AUTHORIZED, payload: response.user})
 }, [response, setToken, dispatch])

 //action after Signing in
 if (isSuccesfullSubmit) {
  return <Redirect to="/" />
 }

 return (
  <div className="auth-page">
   <div className="container">
    <div className="row">
     <div className="col-md-6 offset-md-3 col-xs-12">
      <h1 className="text-xs-center">{pageTitle}</h1>
      <p className="text-xs-center">
       <Link to={descriptionLink}> {descriptionText}</Link>
      </p>
      {error && <BackendErrorMessages backendErrors={error.errors} />}
      <form onSubmit={handleSubmit}>
       {!isLogin && (
        <fieldset className="form-group">
         <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control form-control-lg"
          placeholder="username"
         />
        </fieldset>
       )}

       <fieldset className="form-group">
        <input
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         type="email"
         className="form-control form-control-lg"
         placeholder="email"
        />
       </fieldset>
       <fieldset className="form-group">
        <input
         valye={password}
         onChange={(e) => setPassword(e.target.value)}
         type="password"
         className="form-control form-control-lg"
         placeholder="password"
        />
       </fieldset>
       <button
        disabled={isLoading}
        className="btn btn-lg btn-primary pull-xs-right"
       >
        {pageTitle}
       </button>
      </form>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Authentication

//BEZ REDUCERA!!!!!!
// setCurrentUserState((state) => ({
//  ...state,
//  isLoggedIn: true,
//  isLoading: false,
//  currentUser: response.user,
// }))
