import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import nodeStore from './nodes';
import variablesStore from './variables'
import appStore from './app'

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

export default store;
