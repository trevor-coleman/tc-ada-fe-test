import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchVariables = createAsyncThunk('variables/fetch', async (_,
                                                                         thunkApi) => {
  try {
    return await api.variables.find();
  } catch (e) {
    thunkApi.rejectWithValue(e);
  }
  return [];
})
