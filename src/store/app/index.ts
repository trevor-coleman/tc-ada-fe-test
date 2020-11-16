import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NestedList = string | string[]

export type AppState = {
  search: {
    searchString: string
  }
  nodeList: {
    selected: string[],
    list: (string | NestedList)[] ,
  }
}

export const initialAppState: AppState = {
  search: {
    searchString: ""
  },
  nodeList: {
    selected: [],
    list: []
  },
};

const appSlice = createSlice({
  name: 'app',
  extraReducers: {},
  initialState: initialAppState,
  reducers: {
    setSelectedNode(state, {payload: {id, indent}}) {
      const shouldSelect = state.nodeList.selected[indent] !== id;
      const selected: string[] = state.nodeList.selected.slice(0, indent);

      if (shouldSelect) {
        selected.push(id.toString());
      }

      return (
          {
            ...state,
            nodeList: {
              ...state.nodeList,
              selected,
            },
          });
    },
    setSearchString(state, {payload}: PayloadAction<string>) {
      return {...state,
      search: {
        searchString: payload
      }}

    },

  },
});

export function makeListId(id:string, indent: number) {
  return id + "-" + indent;
}

export const {setSelectedNode, setSearchString} = appSlice.actions;
export default appSlice.reducer;
