import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { ContentTextElement, DbNode } from './types';
import { RootState } from '../index';


export const findNodes = createAsyncThunk<DbNode[], void, { rejectValue: string; }>(
    'nodes/findNodes',
    async (_, thunkAPI) => {
      try {
        return await api.nodes.find();
      } catch (e) {
        thunkAPI.rejectWithValue(e.message);
      }
      return [];
    });

export const findNodeById = createAsyncThunk<DbNode[], number, { rejectValue: string }>(
    'nodes/findNodeById',
    async (id, thunkAPI) => {

      try {
        const [dbNode]:DbNode[] = await api.nodes.findById(id);
        dbNode.content?.forEach(item => {
          if (item.type === "text") {
            item.segments = parseContentText(item.body);
          }
        });
        return [dbNode];

      } catch (e) {
        thunkAPI.rejectWithValue(e.message);
      }
      return [];
    });

/**
 * Function that takes a string and splits it into Text and Variable elements, and returns an ordered array.
 * @param {string} body
 * @return {ContentTextElement[]}
 */
function parseContentText(body: string): ContentTextElement[] {

  /**
   * Regex to capture text and variables.
   * text    = anything before the first `{`
   * id      = the variable id (if a variable exists)
   * default = the fallback (if one exists)
   **/
  const regEx: RegExp = /(?<text>[^{]+)(?:(?:{)(?<id>[0-9a-f]*)(?:\|)(?<default>[^}]*)(?:}))*/g;

  const result: ContentTextElement[] = [];
  let match = regEx.exec(body);
  while (match) {
    const {groups} = match;
    if (!groups) continue;
    if (groups.text !== undefined) {
      result.push({
        element: 'text',
        value: match.groups?.text,
      });
    }
    if (groups.id) {
      result.push({
        default: groups.default,
        element: 'variable',
        id: groups.id,
      });
    }
    match = regEx.exec(body);
  }

  return result;
}

export const searchNodes = createAsyncThunk<DbNode[], string, { state: RootState ,rejectValue: string }>(
    'nodes/search',
    async (searchTerm: string, thunkAPI) => {
      try {
        return await api.nodes.search(searchTerm);
      } catch (e) {
        thunkAPI.rejectWithValue(e);
      }
      return [];
    });
