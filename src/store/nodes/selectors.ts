import { useTypedSelector } from '../index';

export const useVisibleNodes = () => useTypedSelector(state => state.nodes.visibleNodeIds)

export const useNode = (id: number, indent:number) => useTypedSelector(state => {
  return (
      {
        ...state.nodes.nodes[id],
        selected: state.app.nodeList.selected,
        isHighlighted: state.app.nodeList.selected.slice(-1).pop() === id &&
                       state.app.nodeList.selected[indent] === id,
        requestStatus: state.nodes.findNodesByIdRequests[id],
      });
});

export const useSelectedNode = () => useTypedSelector(state => {
  const [id] = state.app.nodeList.selected.slice(-1);
  return {
    ...state.nodes.nodes[id],
    requestStatus: state.nodes.findNodesByIdRequests[id],
  };
});
