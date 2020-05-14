import React, {useEffect} from 'react'
import useFetch from '../hooks/useFetchHook'
import {NavLink} from 'react-router-dom'

const UserProfile = ({match}) => {
 const slug = match.params.slug
 const apiUrl = `/profiles/${slug}`
 const [{response}, doFetch] = useFetch(apiUrl)

 useEffect(() => {
  doFetch()
 }, [])
 if (!response) {
  return null
 }
 // console.log('response', response.profile)

 return (
  <div className="profile-page">
   <div className="user-info">
    <div className="container">
     <div className="row">
      <div className="col-xs-12 col-md-10 offset-md-1">
       <img src={response.profile.image} className="user-img" alt="" />
       <h4>{response.profile.username}</h4>
       <p>{response.profile.bio}</p>
      </div>
     </div>
    </div>
   </div>
   <div className="container">
    <div className="row">
     <div className="col-xs-12 col-md-10 offset-md-1">
      <div className="articles-toggle">
       <ul className="nav nav-pills outline-active">
        <li className="nav-item">
         <NavLink
          exact
          className="nav-link"
          to={`/profiles/${response.profile.username}`}
         >
          My Posts
         </NavLink>
        </li>
        <li className="nav-item">
         <NavLink
          className="nav-link"
          to={`/profiles/${response.profile.username}/favourites`}
         >
          Favourite Posts
         </NavLink>
        </li>
       </ul>
      </div>
      UserArticles
     </div>
    </div>
   </div>
  </div>
 )
}

export default UserProfile
