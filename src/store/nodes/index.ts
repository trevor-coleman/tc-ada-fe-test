import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findNodes, findNodeById } from './thunks';
import { RequestState } from '../types';

export interface DbNode {
  id:string
  title: string
  content ?: DbNodeContent[],
  connections ?: number[]
}

export interface DbNodeContent {
  type: "body" | "url",
  body: string,
}

export interface NormalizedNodes {
  [id: string]: DbNode
}

export interface NodesState {
  findNodesRequestState: RequestState
  nodes: NormalizedNodes
}

const initialNodesState: NodesState = {
  findNodesRequestState: RequestState.Idle,
  nodes:{}
}

const nodeSlice=createSlice({
  name: 'nodes',
  initialState: initialNodesState,
  reducers:{},
  extraReducers: builder=> {
    builder.addCase(findNodes.fulfilled, (state, {payload}:PayloadAction<DbNode[]>)=> {
      const nodes = payload.reduce((prev:NormalizedNodes, curr: DbNode)=>({
       ...prev,
       [curr.id]: curr
      }), {});

      return {...state, nodes}
    })

    builder.addCase(findNodeById.fulfilled,
        (state, {payload}: PayloadAction<DbNode[]>) => {
          const nodes = payload.reduce((prev: NormalizedNodes,
                                        curr: DbNode,
                                        ) => (
              {
                ...prev,
                [curr.id]: curr
              }), state.nodes);

          return {
            ...state,
            nodes
          }
        })


  }

})

export default nodeSlice.reducer;
