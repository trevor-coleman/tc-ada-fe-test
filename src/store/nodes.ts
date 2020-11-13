import {createSlice} from '@reduxjs/toolkit';

export interface Node {
  id:string
  title: string
}

export interface NodesState {
  [id:string]: Node
}

const initialNodesState: NodesState = {}

const nodeSlice=createSlice({
  name: 'nodes',
  initialState: initialNodesState,
  reducers:{}
})


export default nodeSlice.reducer;
