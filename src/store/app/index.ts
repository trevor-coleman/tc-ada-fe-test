import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = {
  nodeList: {
    selected: string|null
  }
}

export const initialAppState: AppState = {
  nodeList: {selected: null}
};

const appSlice = createSlice({
  name: 'app',
  extraReducers: {},
  initialState: initialAppState,
  reducers: {
    selectNode: (state, action:PayloadAction<string>) => {
      return (
          {
            ...state,
            nodeList: {
              selected: action.payload,
            },
          });
    }

  },
});

export const {selectNode}= appSlice.actions;
export default appSlice.reducer;
