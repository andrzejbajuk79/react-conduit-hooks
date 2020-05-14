import React, {useEffect, useContext, useState} from 'react'
import useFetch from '../../hooks/useFetchHook'
import {Link, Redirect} from 'react-router-dom'
import Loading from '../../components/isLoading'
import ErrorMessage from '../../components/Error'
import {TagList} from '../../components/TagList'
import {CurrentUserContext} from '../../context/currentUser'

const Article = (props) => {
 const slug = props.match.params.slug
 const apiURl = `/articles/${slug}`

 const [
  {
   response: fetchArticleResponse,
   error: fetchArticlError,
   isLoading: fetchArticleIsLoading,
  },
  doFetch,
 ] = useFetch(apiURl)

 const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiURl)
 const [currentUserState] = useContext(CurrentUserContext)

 const [isIsSuccesffullDelete, setIsSuccesffullDelete] = useState(false)
 const isAuthor = () => {
  // jexeli niezalogowany nie pokazujemy buttonow
  if (currentUserState.isLoggedIn === null || !fetchArticleResponse) {
   return false
  }
  return (
   currentUserState.currentUser.username ===
   fetchArticleResponse.article.author.username
  )
 }
 // console.log('isAuthor,is', isAuthor())
 const deleteArticle = () => {
  doDeleteArticle({
   method: 'delete',
  })
 }
 useEffect(() => {
  doFetch()
 }, [doFetch])
 useEffect(() => {
  if (!deleteArticleResponse) {
   return
  }

  setIsSuccesffullDelete(true)
 }, [deleteArticleResponse])

 if (isIsSuccesffullDelete) {
  return <Redirect to="/" />
 }
 return (
  <div className="article-page">
   <div className="banner">
    {!fetchArticleIsLoading && fetchArticleResponse && (
     <div className="container">
      <h1>{fetchArticleResponse.article.title}</h1>
      <div className="article-meta">
       <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
        <img src={fetchArticleResponse.article.author.image} alt="" />
       </Link>
       <div className="info">
        <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
         {fetchArticleResponse.article.author.username}
        </Link>
        <span className="date">{fetchArticleResponse.article.createdAt}</span>
       </div>
       {isAuthor() && (
        <span>
         <Link
          to={`/article/${fetchArticleResponse.article.slug}/edit`}
          className="btn btn-outline-secondary btn-sm"
         >
          <i className="ion-edit"></i>
          Edit
         </Link>{' '}
         <button
          className="btn btn-outline-danger btn-sm"
          onClick={deleteArticle}
         >
          <i className="ion-trash-a"></i>Delete article
         </button>
        </span>
       )}
      </div>
     </div>
    )}
   </div>
   <div className="container page">
    {fetchArticlError && <ErrorMessage />}
    {fetchArticleIsLoading && <Loading />}
    {!fetchArticleIsLoading && fetchArticleResponse && (
     <div>
      <div>
       <p>{fetchArticleResponse.article.body}</p>
      </div>
      <TagList tags={fetchArticleResponse.article.tagList} />
     </div>
    )}
    <hr />
   </div>
  </div>
 )
}

export default Article
