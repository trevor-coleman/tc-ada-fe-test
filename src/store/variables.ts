import { createSlice } from '@reduxjs/toolkit';

export interface Variable {
  id:string
  name: string
  scope: "global" | "local"
}

export interface VariablesState {
  [id: string]: Variable
}

const initialVariablesState: VariablesState = {}

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: initialVariablesState,
  reducers: {}
})

export default nodeSlice.reducer;
