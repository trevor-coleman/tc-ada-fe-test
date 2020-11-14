import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import nodeStore from './nodes';
import variablesStore from './variables'

const rootReducer = combineReducers({
  nodes: nodeStore,
  variables: variablesStore
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const store = configureStore({
  reducer: rootReducer
});

export default store;
