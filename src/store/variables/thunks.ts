import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchVariables = createAsyncThunk('variables/fetch', async (_,
                                                                         ThunkApi) => {
  //TODO: Handle Failed Request with RejectWithValue()
  const result =  await api.variables.find()
  return result;
})
