import { AppDispatch} from '../index';
import store from '../index'
import { setSelectedNode } from './appSlice';
import { findNodeById } from '../nodes/thunks';

/**
 * Selects the provided node at the provided indent level.
 * Only fetches node if node content does not exist in state.
 * @param {number} id
 * @param {number} indent
 * @return {(dispatch: AppDispatch) => Promise<void>}
 */
export const selectNode = (id:number, indent:number) => async (dispatch: AppDispatch) => {
  dispatch(setSelectedNode({
    id,
    indent,
  }))
  if(store.getState().nodes.nodes[id].content) return;
  await dispatch(findNodeById(id));
  return;
}


