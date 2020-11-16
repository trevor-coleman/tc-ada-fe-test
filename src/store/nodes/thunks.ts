import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { ContentTextElement, DbNode } from './types';


export const findNodes = createAsyncThunk<DbNode[], void, { rejectValue: string }>(
    'nodes/findNodes',
    async (_, thunkAPI) => {
      try {
        return await api.nodes.find();
      } catch (e) {
        thunkAPI.rejectWithValue(e.message);
      }
      return [];
    });

export const findNodeById = createAsyncThunk<DbNode[], string, { rejectValue: string }>(
    'nodes/findNodeById',
    async (id, thunkAPI) => {

      try {
        const [dbNode] = await api.nodes.findById(id);
        dbNode.content?.forEach(item => {
          if (item.type == "text") {
            item.segments = parseContentText(item)
          }
        })
        return [dbNode];

      } catch (e) {
        thunkAPI.rejectWithValue(e.message);
      }
      return [];
    });

function parseContentText({body}: ContentText): ContentTextElement[] {
  const regEx: RegExp = /(?<text>[^{]+)(?:(?:{)(?<id>[0-9a-f]*)(?:\|)(?<default>[^}]*)(?:}))*/g;

  const result:ContentTextElement[] = [];
  console.log(body);
  let match;
  while(match=regEx.exec(body)){
    const {groups}=match;
    if(!groups) continue;
    if(groups.text !== undefined) {
      result.push({
        element: 'text',
        value: match.groups?.text,
      });
    }
    if(groups.id) {
      result.push({
        default: groups.default,
        element: 'variable',
        id: groups.id
      })
    }
  }

  console.log(result);

  return result;
}
