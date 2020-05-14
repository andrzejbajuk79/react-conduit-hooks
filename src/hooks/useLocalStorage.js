import {useState, useEffect} from 'react'

export default (key, initialValues = '') => {
 // debugger
 const [value, setValue] = useState(() => {
  //lazy fetch token
  return localStorage.getItem(key) || initialValues
 })

 //odpalamy setValue(setToken) w authentication  kiedy zmieniamy VALUE

 useEffect(() => {
  // debugger
  localStorage.setItem(key, value)
 }, [key, value])
 return [value, setValue]
}
