import { createSlice} from '@reduxjs/toolkit';
import { ApiRequestStatus, ApiRequestInfo, InitialApiRequest } from '../types';
import { searchNodes } from '../nodes/thunks';

export type NestedList = string | string[]

export type AppState = {
  search: {
    searchString: string, searchRequest: ApiRequestInfo,
  }
  nodeList: {
    selected: number[], list: (number | NestedList)[],
  }
}

export const initialAppState: AppState = {
  search: {
    searchString: "",
    searchRequest: InitialApiRequest,
  },
  nodeList: {
    selected: [],
    list: [],
  },
};

const appSlice = createSlice({
  name: 'app',
  extraReducers: builder => {
    builder.addCase(searchNodes.pending, (state, {meta: {arg, requestId}}) => {
      //Update SearchRequest
      return {
        ...state,
        search: {
          ...state.search,
          searchString: arg,
          searchRequest: {
            status: ApiRequestStatus.Pending,
            id: requestId,
            message: null,
          },
        },
      };
    });
    builder.addCase(searchNodes.fulfilled,
        (state, {payload, meta: { requestId}}) => {
          const prevSearch = state.search;
          const search = requestId === prevSearch.searchRequest.id
                         ? {
                ...prevSearch,
                searchRequest: {
                  ...prevSearch.searchRequest,
                  status: ApiRequestStatus.Fulfilled,
                },
              }
                         : prevSearch;

          const {selected} = state.nodeList;
          const newSelected = selected.length > 0 &&
                              payload.map(node => node.id)
                                     .indexOf(selected.slice(-1)
                                                      .pop()!) === -1
                              ? []
                              : selected;

          return {
            ...state,
            search,
            nodeList: {
              ...state.nodeList,
              selected: newSelected,
            },
          };
        });
  },
  initialState: initialAppState,
  reducers: {
    /**
     * Resets the search string, initializes SearchRequest
     * @param {Draft<AppState>} state
     * @return {AppState}
     */
    clearSearch: state => (
        {
          ...state,
          search: {
            searchRequest: InitialApiRequest,
            searchString: "",
          },
        }),
    setSelectedNode(state, {payload: {id, indent}}) {

      const selected: number[] = state.nodeList.selected.slice(0, indent);
      selected.push(id);

      return (
          {
            ...state,
            nodeList: {
              ...state.nodeList,
              selected,
            },
          });
    },
  },
});

export function makeListId(id: string, indent: number) {
  return id + "-" + indent;
}

export const {setSelectedNode, clearSearch} = appSlice.actions;
export default appSlice.reducer;
