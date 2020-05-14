import React, {useState, useEffect, useContext} from 'react'

import useFetch from '../../hooks/useFetchHook'
import ArticleForm from '../../components/ArticleForm'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from '../../context/currentUser'

const CreateArticle = ({article}) => {
 const apiUrl = '/articles'
 const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
 const [{response, error}, doFetch] = useFetch(apiUrl)
 const [currentUserState] = useContext(CurrentUserContext)
 console.log(currentUserState)

 const onSubmit = (article) => {
  doFetch({
   method: 'post',
   data: {
    article,
   },
  })
 }

 const initialValues = {
  title: '',
  description: '',
  body: '',
  tagList: '',
 }

 useEffect(() => {
  if (!response) {
   return
  }
  setIsSuccessfullSubmit(true)
 }, [response])

 //na samym pocztaku zanim sie zrenderuje
 if (currentUserState.isLoggedIn === null) {
  return null
 }
 //dopiero teraz sparawdzamy czy zakogowany
 if (isSuccessfullSubmit || currentUserState.isLoggedIn === false) {
  return <Redirect to="/" />
 }

 return (
  <div>
   <ArticleForm
    onSubmit={onSubmit}
    initialValues={initialValues}
    errors={(error && error.errors) || {}}
   />
  </div>
 )
}
export default CreateArticle
