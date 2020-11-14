import { AppDispatch} from '../index';
import store from '../index'
import { setSelectedNode } from '.';
import { findNodeById } from '../nodes/thunks';

export const selectANode = (id:string) => async (dispatch: AppDispatch) => {
  dispatch(setSelectedNode(id))
  if(store.getState().nodes.nodes[id]) return;
  await dispatch(findNodeById(id));
  return;
}


