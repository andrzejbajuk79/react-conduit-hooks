import React, {useState, useContext, useEffect} from 'react'
import * as actions from '../../context/types'
import {CurrentUserContext} from '../../context/currentUser'
import useFetch from '../../hooks/useFetchHook'
import useLocalaStorage from '../../hooks/useLocalStorage'
import BackendErrorMessages from '../../components/BackendErrorMessages '
import {Redirect} from 'react-router-dom'

const Settings = () => {
 const apiUrl = '/user'
 const [{response, error}, doFetch] = useFetch(apiUrl)
 const [username, setUserName] = useState('')
 const [image, setImage] = useState('')
 const [bio, setBio] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [currentUserState, dispatch] = useContext(CurrentUserContext)
 const [, setToken] = useLocalaStorage('token')
 const [successfullLogout, setSuccessfullLogout] = useState(false)
 const user = currentUserState.currentUser

 // console.log('biografy1', bio)
 // console.log('user', currentUserState.currentUser)
 const handleSubmit = (e) => {
  e.preventDefault()

  doFetch({
   method: 'put',
   data: {user: {...user, image, bio, username, email, password}},
  })
 }
 const logout = (e) => {
  e.preventDefault()
  setToken('')
  dispatch({type: actions.SET_UNAUTHORIZED})
  setSuccessfullLogout(true)
 }

 useEffect(() => {
  if (!user) return
  setUserName(user.username)
  setImage(user.image)
  setBio(user.bio)
  setEmail(user.email)
 }, [user])

 //chemy zakyualizwac user po operacji PUT,bo caly czas mamy staer dane
 useEffect(() => {
  if (!response) return
  dispatch({type: actions.SET_AUTHORIZED, payload: response.user})
 }, [response, dispatch])

 if (successfullLogout) {
  return <Redirect to="/" />
 }

 return (
  <div className="setting-page">
   <div className="container page">
    <div className="ro">
     <div className="col-md-6 offset-md-3 col-xs-12">
      <h1 className="text-xs-center">Your settings</h1>
      {error && <BackendErrorMessages backendErrors={error.errors} />}
      <form onSubmit={handleSubmit}>
       <fieldset className="form-group ">
        <input
         placeholder="Your name"
         className="form-control form-control-lg"
         type="text"
         value={username}
         onChange={(e) => setUserName(e.target.value)}
        />
       </fieldset>
       <fieldset className="form-group">
        <input
         placeholder="URL of Profile picture"
         className="form-control form-control-lg"
         type="text"
         value={image}
         onChange={(e) => setImage(e.target.value)}
        />
       </fieldset>
       <fieldset className="form-group">
        <textarea
         placeholder="Short biografy"
         className="form-control form-control-lg"
         rows="2"
         value={bio}
         onChange={(e) => setBio(e.target.value)}
        ></textarea>
       </fieldset>
       <fieldset className="form-group">
        <input
         placeholder="Email"
         className="form-control form-control-lg"
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
       </fieldset>
       <fieldset className="form-group">
        <input
         placeholder="Password"
         className="form-control form-control-lg"
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
       </fieldset>
       <button type="submit" className="btn btn-primary pull-xs-right">
        Update settings
       </button>
       <button className="btn btn-outline-danger" onClick={logout}>
        Logout
       </button>
      </form>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Settings
