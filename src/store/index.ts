import { configureStore } from '@reduxjs/toolkit'
import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { rootReducer, RootStateType} from './reducer'

declare global {
  interface NodeModule {
    hot: any
  }
}

export const getStore = (initialValue = undefined) => {
  if (initialValue) {
    const store = configureStore({
      preloadedState: initialValue,
      reducer: rootReducer
    })
  
    return store
  }
  const store = configureStore({
    reducer: rootReducer
  })

  return store
}

export type AppDispatch = Dispatch
export type AppThunk = ThunkAction<void, RootStateType, null, Action<string>>