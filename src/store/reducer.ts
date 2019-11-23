import { combineReducers } from '@reduxjs/toolkit'
import dataReducer from './data'

const rootReducer = combineReducers({
  data: dataReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export { rootReducer }
