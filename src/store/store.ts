import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toolkitSliceData from './reducers/toolkitSliceData'
import toolkitSliceSearch from './reducers/toolkitSliceSearch'

const rootReducer = combineReducers({
  toolkitSliceData,
  toolkitSliceSearch,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
