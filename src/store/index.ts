import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import nodeStore from './nodes/nodeSlice';
import variablesStore from './variables/variablesSlice'
import appStore from './app/appSlice'

const rootReducer = combineReducers({
  app:appStore,
  nodes: nodeStore,
  variables: variablesStore
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;

export default store;
