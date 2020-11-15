import { createSlice } from '@reduxjs/toolkit';
import { fetchVariables } from './thunks';
import { ApiRequestInfo, ApiRequestStatus } from '../types';
import { normalizePayload } from '../normalize';

export interface Variable {
  id: string
  name: string
  scope: "global" | "local"
}

export interface NormalizedVariables {
  [id: string]: Variable
}

export interface VariablesState {
  fetchVariablesRequest: ApiRequestInfo,
  variables: NormalizedVariables
}

const initialVariablesState: VariablesState = {
  fetchVariablesRequest: {
    status: ApiRequestStatus.Idle,
    message: null,
    id: null,
  },
  variables: {},
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: initialVariablesState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVariables.pending,
        (state, {meta: {requestId}}) => (
            {
              ...state,
              fetchVariablesRequest: {
                status: ApiRequestStatus.Pending,
                id: requestId,
                message: null,
              },
            }));

    builder.addCase(fetchVariables.fulfilled,
        (state, {payload, meta: {requestId}}) => {
          const variables: {} = normalizePayload(payload);

          return {
            ...state,
            variables,
            fetchVariablesRequest: state.fetchVariablesRequest.id === requestId
                                   ? {
                  status: ApiRequestStatus.Fulfilled,
                  id: null,
                  message: null,
                }
                                   : state.fetchVariablesRequest,
          };
        });
  },
});

export default nodeSlice.reducer;
