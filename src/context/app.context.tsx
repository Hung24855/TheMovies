'use client'

import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { ContextAction, InfoMovie, stateType } from './type'

const initStateReducer: stateType = {
  favoriteMovies: []
}

export const reducer = (state: stateType, action: ContextAction) => {
  switch (action.type) {
    case 'Init':
      return {
        ...state,
        favoriteMovies: action.payload
      }
    case 'Add': {
      const favMovies = [...state.favoriteMovies, action.payload]
      localStorage.setItem('fav-movies', JSON.stringify(favMovies))
      return {
        ...state,
        favoriteMovies: favMovies
      }
    }
    case 'Remove': {
      const favMovies = state.favoriteMovies.filter((item) => item.slug !== action.payload)

      localStorage.setItem('fav-movies', JSON.stringify(favMovies))
      return {
        ...state,
        favoriteMovies: favMovies
      }
    }
    default:
      return state
  }
}

// Tạo context
export const AppContext = createContext<{
  state: stateType
  dispatch: Dispatch<ContextAction>
}>({
  state: initStateReducer,
  dispatch: () => null
})

// Bọc context
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initStateReducer)

  useEffect(() => {
    const favMovies: InfoMovie[] = JSON.parse(localStorage.getItem('fav-movies') || '[]')
    dispatch({
      type: 'Init',
      payload: favMovies
    })
  }, [])
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default AppContextProvider
