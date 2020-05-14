import React, {useState, useEffect, useContext} from 'react'

import useFetch from '../../hooks/useFetchHook'
import ArticleForm from '../../components/ArticleForm'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from '../../context/currentUser'

const EditArticle = ({match}) => {
 const slug = match.params.slug
 const apiUrl = `/articles/${slug}`
 const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
 const [
  {response: updateArticleResponse, error: updateArticleError},
  doUpdateArticle,
 ] = useFetch(apiUrl)

 const [
  {response: fetchArticleResponse, error: fetchArticleError},
  doFetchArticle,
 ] = useFetch(apiUrl)

 const [currentUserState] = useContext(CurrentUserContext)
 const [initialValues, setInitialValues] = useState(null)

 // console.log('fetchArticleResponse', fetchArticleResponse)

 const onSubmit = (article) => {
  doUpdateArticle({
   method: 'put',
   data: {
    article,
   },
  })
 }
 //pobranie artykylu
 useEffect(() => {
  doFetchArticle()
 }, [doFetchArticle])

 //pobranie artykylu do edycji
 useEffect(() => {
  if (!fetchArticleResponse) {
   return
  }
  setInitialValues({
   title: fetchArticleResponse.article.title,
   description: fetchArticleResponse.article.description,
   body: fetchArticleResponse.article.body,
   tagList: fetchArticleResponse.article.tagList.join(' '),
  })
 }, [fetchArticleResponse])

 useEffect(() => {
  if (!updateArticleResponse) {
   return
  }
  setIsSuccessfullSubmit(true)
 }, [updateArticleResponse])

 //na samym pocztaku zanim sie zrenderuje
 if (currentUserState.isLoggedIn === null) {
  return null
 }
 //dopiero teraz sparawdzamy czy zakogowany
 if (currentUserState.isLoggedIn === false) {
  return <Redirect to="/" />
 }
 if (isSuccessfullSubmit) {
  return <Redirect to={`/article/${slug}`} />
 }

 return (
  <div>
   <ArticleForm
    onSubmit={onSubmit}
    initialValues={initialValues}
    errors={
     (updateArticleError && updateArticleError.errors) ||
     (fetchArticleError && fetchArticleError.errors)
    }
   />
  </div>
 )
}
export default EditArticle
