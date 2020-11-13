import { combineReducers, configureStore } from '@reduxjs/toolkit';
import nodeStore from './nodes';
import variablesStore from './variables'

const rootReducer = combineReducers({
  nodes: nodeStore,
  variables: variablesStore
})

const store = configureStore({
  reducer: rootReducer
});
