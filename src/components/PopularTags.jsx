import React, {useEffect} from 'react'
import useFetch from '../hooks/useFetchHook'
import Loading from '../components/isLoading'
import ErrorMessage from '../components/Error'
import {Link} from 'react-router-dom'
const PopularTags = () => {
 const [{response, error, isLoading}, doFetch] = useFetch('/tags')
 useEffect(() => {
  doFetch()
 }, [doFetch])
 if (isLoading || !response) {
  return <Loading />
 }
 if (error) {
  return <ErrorMessage />
 }
 return (
  <div className="sidebar">
   <p>Popular tags</p>
   <div className="tag-list">
    {response.tags.map((tag) => (
     <Link key={tag} to={`/tags/${tag}`} className="tag-default tag-pill">
      {tag}
     </Link>
    ))}
   </div>
  </div>
 )
}

export default PopularTags
