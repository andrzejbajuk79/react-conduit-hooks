import React from 'react'
import classNames from 'classnames'
import useFetch from '../hooks/useFetchHook'
// Request URL: https://conduit.productionready.io/api/articles/test1-kjsszg/favorite
const AddToFavourite = ({isFavorited, favoritesCount, articleSlug}) => {
 const apiUrl = `/articles/${articleSlug}/favorite`
 const [{response}, doFetch] = useFetch(apiUrl)

 //aktualizujem po responsie kiedy klikniemy handleLike
 const isFavouritedWithResponse = response
  ? response.article.favorited
  : isFavorited

 const newfavoritesCount = response
  ? response.article.favoritesCount
  : favoritesCount
 // console.log('response', response)

 const buttonClasses = classNames({
  btn: true,
  'btn-sm': true,
  'btn-primary': isFavouritedWithResponse,
  'btn-outline-primary': !isFavouritedWithResponse,
 })
 const handleLike = (e) => {
  e.preventDefault()
  doFetch({
   method: isFavouritedWithResponse ? 'delete' : 'post',
  })
 }
 return (
  <button className={buttonClasses} onClick={handleLike}>
   <i className="ion-heart"></i>
   <span> &nbsp; {newfavoritesCount}</span>
  </button>
 )
}

export default AddToFavourite
