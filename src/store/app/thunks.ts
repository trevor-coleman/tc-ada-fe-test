import { AppDispatch} from '../index';
import store from '../index'
import { setSelectedNode } from '.';
import { findNodeById } from '../nodes/thunks';

export const selectNode = (id:string, indent:number) => async (dispatch: AppDispatch) => {
  dispatch(setSelectedNode({
    id,
    indent,
  }))
  if(store.getState().nodes.nodes[id].content) return;
  await dispatch(findNodeById(id));
  return;
}


