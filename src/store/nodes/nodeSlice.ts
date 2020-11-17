import { createSlice } from '@reduxjs/toolkit';
import { findNodes, findNodeById, searchNodes } from './thunks';
import {
  ApiRequestStatus, ApiRequestInfo, FulfilledApiRequest, InitialApiRequest,
} from '../types';
import { NormalizedNodes, DbNode } from './types';

export interface NodesState {
  findNodesByIdRequests: { [id: string]: ApiRequestInfo }
  findNodesRequest: ApiRequestInfo
  nodes: NormalizedNodes
  nodeIds: number[],
  visibleNodeIds: number[],
}

const initialNodesState: NodesState = {
  findNodesByIdRequests: {},
  findNodesRequest: InitialApiRequest,
  nodes: {},
  nodeIds: [],
  visibleNodeIds: [],
};


const nodeSlice = createSlice({
  name: 'nodes',
  initialState: initialNodesState,
  reducers: {
    resetVisibleNodes:state => ({
      ...state,
      visibleNodeIds: state.nodeIds,
    })
  },
  extraReducers: builder => {
    //FIND NODES
    builder.addCase(findNodes.pending, (state, action) => {
      const {meta: {requestId}} = action;
      return (
          {
            ...state,
            findNodesRequest: {
              ...state.findNodesRequest,
              status: ApiRequestStatus.Pending,
              id: requestId,
              message: null,
            },
          });
    });

    builder.addCase(findNodes.fulfilled,
        (state, {payload, meta: {requestId}}) => {
          // Normalize nodes before adding to store
          const nodes = payload.reduce((prev: NormalizedNodes,
                                        curr: DbNode) => (
              {
                ...prev,
                [curr.id]: curr,
              }), {});

          const nodeIds = Object.keys(nodes).map(i=>parseInt(i));
          const visibleNodeIds = Object.keys(nodes).map(i => parseInt(i));

          return {
            ...state,
            findNodesRequest: state.findNodesRequest.id === requestId
                              ? FulfilledApiRequest
                              : state.findNodesRequest,
            nodes,
            nodeIds,
            visibleNodeIds,
          };
        });

    builder.addCase(findNodes.rejected,
        (state, {payload, meta: {requestId}}) => (
            {
              ...state,
              findNodesRequest: requestId === state.findNodesRequest.id
                                ? {
                    status: ApiRequestStatus.Rejected,
                    id: null,
                    message: payload ?? "Failed to find nodes.",
                  }
                                : state.findNodesRequest,
            }));
    ///FIND NODE BY ID
    builder.addCase(findNodeById.pending, (state, action) => {
      const {meta: {arg, requestId}} = action;
      return (
          {
            ...state,
            findNodesByIdRequests: {
              ...state.findNodesByIdRequests,
              [arg]: {
                id: requestId,
                message: null,
                status: ApiRequestStatus.Pending,
              },
            },
          });
    });

    builder.addCase(findNodeById.fulfilled,
        (state, {payload, meta: {arg, requestId}}) => {
          //Normalize the returned node.
          const nodes = payload.reduce((prev: NormalizedNodes, curr) => (
              {
                ...prev,
                [curr.id]: curr,
              }), state.nodes);

          const nodeIds = Object.keys(nodes).map(i => parseInt(i));

          return {
            ...state,
            findNodesByIdRequests: state.findNodesByIdRequests[arg].id ===
                                   requestId
                                   ? {
                  ...state.findNodesByIdRequests,
                  [arg]: FulfilledApiRequest,
                }
                                   : state.findNodesByIdRequests,
            nodes,
            nodeIds,
          };
        });

    builder.addCase(findNodeById.rejected, (state, {payload, meta: {arg}}) => {

      return (
          {
            ...state,
            findNodesByIdRequests: {
              [arg]: {
                status: ApiRequestStatus.Rejected,
                id: null,
                message: payload ?? "Failed to find requested node",
              },
            },
          });
    });

    //SEARCH NODES
    builder.addCase(searchNodes.fulfilled,
        (state, {payload}) => {

          //normalize nodes -- keep existing data to reduce fetching.
          const nodes = payload.reduce((prev: NormalizedNodes,
                                        curr: DbNode) => (
              {
                ...prev,
                [curr.id]: {
                  ...prev[curr.id],
                  ...curr,
                },
              }), state.nodes);


          const nodeIds  = Object.keys(nodes).map(i => parseInt(i));
          const visibleNodeIds = payload.reduce((prev: number[],
                                                 curr: DbNode) => {
            prev.push(curr.id);
            return prev;
          }, []);

          return {
            ...state,
            nodes,
            nodeIds,
            visibleNodeIds,
          };
        });
  },
});

export const { resetVisibleNodes } = nodeSlice.actions;
export default nodeSlice.reducer;
