import { createSlice } from '@reduxjs/toolkit';

export type AppState = {
  nodeList: {
    selected: string | null, open: string[],
  }
}

export const initialAppState: AppState = {
  nodeList: {
    selected: null,
    open: [],
  },
};

const appSlice = createSlice({
  name: 'app',
  extraReducers: {},
  initialState: initialAppState,
  reducers: {
    setSelectedNode: (state, {payload}) => {

      let open = state.nodeList.open.slice();
      let shouldSelect;
      if (open.indexOf(payload) === -1) {
        open.push(payload);
        shouldSelect = true;
      }
      else {
        open = open.filter(id => id != payload);
        shouldSelect = false;
      }

      const selected = shouldSelect
                       ? state.nodeList.selected === payload
                         ? null
                         : payload
                       : null;

      return (
          {
            ...state,
            nodeList: {
              selected,
              open,
            },
          });
    },

  },
});

export const {setSelectedNode} = appSlice.actions;
export default appSlice.reducer;
