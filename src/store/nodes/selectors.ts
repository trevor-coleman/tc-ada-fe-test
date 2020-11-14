import { useTypedSelector } from '../index';

export const useNode = (id: string, indent:number) => useTypedSelector(state => (
    {
      ...state.nodes.nodes[id],
      selected: state.app.nodeList.selected,
      isHighlighted: state.app.nodeList.selected.slice(-1).pop() === id && state.app.nodeList.selected[indent] == id,
      requestStatus: state.nodes.findNodesByIdRequests[id],
    }));

export const useSelectedNode = () => useTypedSelector(state => {
  const [id] = state.app.nodeList.selected.slice(-1);
  return {
    ...state.nodes.nodes[id],
    requestStatus: state.nodes.findNodesByIdRequests[id],
  };
});
