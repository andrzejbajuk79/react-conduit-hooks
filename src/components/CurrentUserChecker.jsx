import {useContext, useEffect} from 'react'
import * as actions from '../context/types'
import useLocalStorage from '../hooks/useLocalStorage'
import useFetch from '../hooks/useFetchHook'
import {CurrentUserContext} from '../context/currentUser'

const CurrentUserChecker = ({children}) => {
 const [, dispatch] = useContext(CurrentUserContext)
 const [{response}, doFetch] = useFetch('/user')
 const [token] = useLocalStorage('token')

 // console.log('response', response)
 // console.log(state)

 useEffect(() => {
  if (!token) {
   dispatch({type: actions.SET_UNAUTHORIZED})
   return
  }
  doFetch()
  dispatch({type: actions.LOADING})
 }, [doFetch, token, dispatch])
 //PONIEWAZ DAJEMY CUSTOMOWA FUNKCJE DOFETCH jako dependency
 //zeby uniknac petli uzywamy USECALLBACK w UseFEtch w ktora owijamy DoFetch

 useEffect(() => {
  if (!response) {
   return
  }
  dispatch({type: actions.SET_AUTHORIZED, payload: response.user})
 }, [response, dispatch])

 return children
}

export default CurrentUserChecker
