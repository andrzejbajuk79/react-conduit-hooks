import React, {useEffect} from 'react'
import {stringify} from 'query-string'
import useFetch from '../../hooks/useFetchHook'
import {getPaginator, limit} from '../../utils/getPaginator'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'
import PopularTags from '../../components/PopularTags'
import Loading from '../../components/isLoading'
import ErrorMessage from '../../components/Error'
import FeedToggler from '../../components/FeedToggler'
import Banner from '../../components/Banner'

const GlobalFeed = ({location, match}) => {
 //potrzebujemy offset i currentPage getPaginator
 const {currentPage, offset} = getPaginator(location.search)
 const stringifiedParams = stringify({limit, offset})
 // console.log('para,s', stringifiedParams)

 const apiURL = `/articles?${stringifiedParams}`
 const currentURL = match.url
 const [{response, error, isLoading}, doFetch] = useFetch(apiURL)
 useEffect(() => {
  doFetch()
 }, [doFetch, currentPage])

 return (
  <div className="home-page">
   <Banner />
   <div className="container page">
    <div className="row">
     <div className="col-md-9">
      <FeedToggler />
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
       <>
        <Feed articles={response.articles} />
        <Pagination
         total={response.articlesCount} //
         limit={limit}
         currentPage={currentPage}
         url={currentURL}
        />
       </>
      )}
     </div>
     <div className="col-md-3">
      <PopularTags />
     </div>
    </div>
   </div>
  </div>
 )
}

export default GlobalFeed
