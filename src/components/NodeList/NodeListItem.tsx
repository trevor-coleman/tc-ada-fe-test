import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DbNode } from '../../store/nodes';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { setSelectedNode } from '../../store/app';
import  Collapse from '@material-ui/core/Collapse';
import { useNodeState } from '../../store/nodes/selectors';

interface NodeListItemProps {
  node:DbNode
}

//COMPONENT
const NodeListItem: FunctionComponent<NodeListItemProps> = (props: NodeListItemProps) => {
  const {node: {id, title}} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const {selected, isOpen} = useNodeState(id);


  const handleClick = ()=>{
    dispatch(setSelectedNode(id))
  }

  return (
      <>
        <ListItem selected={id==selected} onClick={()=>handleClick()}>
        <ListItemText primary={title} />
      </ListItem>
        <Collapse in={isOpen}>
          <ListItem>
            <ListItemText primary={"Hello"} inset />
          </ListItem>
        </Collapse>
      </>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default NodeListItem;
