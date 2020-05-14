import React, {createContext, useReducer} from 'react'
import * as actions from './types'

const initialState = {
 isLoading: false, //
 isLoggedIn: null,
 currentUser: null,
}
const reducer = (state = initialState, action) => {
 const {type, payload} = action
 switch (type) {
  case actions.LOADING:
   return {...state, isLoading: true}
  case actions.SET_AUTHORIZED:
   return {
    ...state,
    isLoggedIn: true, //
    isLoading: false,
    currentUser: payload,
   }
  case actions.SET_UNAUTHORIZED:
   return {
    ...state,
    isLoggedIn: false,
    currentUser: null,
   }
  default:
   return state
 }
}

// export const CurrentUserContext = createContext([{}, () => {}])
export const CurrentUserContext = createContext()
export const CurrentUserProvider = ({children}) => {
 const value = useReducer(reducer, initialState)
 // const [state, setState] = useState({
 //  isLoading: false, //
 //  isLoggedIn: null,
 //  currentUser: null,
 // })
 return (
  <CurrentUserContext.Provider value={value}>
   {children}
  </CurrentUserContext.Provider>
 )
}
