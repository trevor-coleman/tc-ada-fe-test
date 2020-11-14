import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DbNode } from '../../store/nodes';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { findNodeById } from '../../store/nodes/thunks';
import { selectNode } from '../../store/app';
import { useTypedSelector } from '../../store';
import  Collapse from '@material-ui/core/Collapse';
import NodeList from './NodeList';

interface NodeListItemProps {
  node:DbNode
}

//COMPONENT
const NodeListItem: FunctionComponent<NodeListItemProps> = (props: NodeListItemProps) => {
  const {node: {id, title}} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const selected = useTypedSelector(state=>state.app.nodeList.selected)

  const handleClick = ()=>{
    dispatch(selectNode(id))
  }

  return (
      <>
        <ListItem selected={id==selected} onClick={()=>handleClick()}>
        <ListItemText primary={title} />
      </ListItem>
        <Collapse in={id==selected}>
          <ListItem>

          </ListItem>
        </Collapse>
      </>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default NodeListItem;
