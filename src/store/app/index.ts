import { createSlice } from '@reduxjs/toolkit';

export type NestedList = string | string[]

export type AppState = {
  nodeList: {
    selected: string[],
    list: (string | NestedList)[] ,
  }
}

export const initialAppState: AppState = {
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
    setSelectedNode: (state, {payload:{id, indent}}) => {
      const shouldSelect = state.nodeList.selected[indent]!==id;
      const selected: string[]  = state.nodeList.selected.slice(0,
          indent);

      if(shouldSelect) {
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

  },
});

export function makeListId(id:string, indent: number) {
  return id + "-" + indent;
}

export const {setSelectedNode} = appSlice.actions;
export default appSlice.reducer;
