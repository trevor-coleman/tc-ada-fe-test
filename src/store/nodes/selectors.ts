import { useTypedSelector } from '../index';

export const useNodeState = (id:string) => useTypedSelector(state=>({
  selected: state.app.nodeList.selected,
  isOpen: state.app.nodeList.open.indexOf(id) !== -1
}))

