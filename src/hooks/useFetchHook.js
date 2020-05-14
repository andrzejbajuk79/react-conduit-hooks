import {useState, useEffect, useCallback} from 'react'
import useLocalStorage from './useLocalStorage'
import axios from 'axios'

export default (url) => {
 const baseURL = 'https://conduit.productionready.io/api'
 const [isLoading, setIsLoading] = useState(false)
 const [response, setResponse] = useState(null)
 const [options, setOptions] = useState({})
 const [error, setError] = useState(null)
 const [token] = useLocalStorage('token')

 //seCallback zwraca funkcje, ktora sie aktualizuje tylko wtedy kiedy zmieniamy dependecies []
 //zawsze przy customowych funkcjach
 const doFetch = useCallback((options = {}) => {
  setIsLoading(true)
  setOptions(options)
 }, [])

 useEffect(() => {
  let skipGetResponseAfterDestroy = false
  if (!isLoading) {
   return
  }
  //chcemy polaczyc body z requesta z tokenem zeby
  //zey moc pobrac na jego podstawie  usera
  const requestOptons = {
   ...options,
   headers: {
    authorization: token ? `Token ${token}` : '',
   },
  }

  // console.log('odpalono')

  axios(baseURL + url, requestOptons) //
   .then((res) => {
    if (!skipGetResponseAfterDestroy) {
     setIsLoading(false)
     setResponse(res.data)
    }
   })
   .catch((err) => {
    if (!skipGetResponseAfterDestroy) {
     setIsLoading(false)
     setError(err.response.data)
    }
   })
  return () => {
   skipGetResponseAfterDestroy = true
   console.log('destroy')
  }
 }, [isLoading, url, options, token])
 return [{isLoading, response, error}, doFetch]
}
