import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import api from '../../api';
import { DbNode, NodesState } from './index';

export const findNodes = createAsyncThunk<DbNode[], void, {rejectValue: string} >('nodes/findNodes', async (_, thunkAPI)=> {
  try {
    return await api.nodes.find();
  }
   catch (e) {
    thunkAPI.rejectWithValue(e.message)
   }
  return [];
})

export const findNodeById = createAsyncThunk<DbNode[], string, { rejectValue: string }>(
    'nodes/findNodeById',
    async (id, thunkAPI) => {
      try {
        return await api.nodes.findById(id);
      } catch (e) {
        thunkAPI.rejectWithValue(e.message)
      }
      return [];
    })
