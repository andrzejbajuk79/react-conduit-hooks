import React, {useEffect} from 'react'
import {stringify} from 'query-string'
import useFetch from '../hooks/useFetchHook'
import {getPaginator, limit} from '../utils/getPaginator'
import Loading from '../components/isLoading'
import ErrorMessage from '../components/Error'
import Feed from '../components/Feed'
import Pagination from '../components/Pagination'

const getApiUrl = ({username, offset, isFavourite}) => {
 const params = isFavourite
  ? {
     limit,
     offset,
     favorited: username,
    }
  : {limit, offset, author: username}
 // console.log(stringify(params))

 return `/articles?${stringify(params)}`
}
const UserArticles = ({url, username, location}) => {
 const isFavourite = location.pathname.includes('favourites')
 const {offset, currentPage} = getPaginator(location.search)
 const apiUrl = getApiUrl({username, offset, isFavourite})
 const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
 console.log('apiurl', apiUrl)

 console.log('response', response)

 useEffect(() => {
  doFetch()
 }, [doFetch])
 return (
  <div>
   {isLoading && <Loading />}
   {error && <ErrorMessage />}
   {!isLoading && response && (
    <>
     <Feed articles={response.articles} />
     <Pagination
      total={response.articlesCount}
      limit={limit}
      url={url}
      currentPage={currentPage}
     />
    </>
   )}
  </div>
 )
}

export default UserArticles
