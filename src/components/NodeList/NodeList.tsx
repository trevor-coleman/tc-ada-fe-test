import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { findNodes } from '../../store/nodes/thunks';
import { useTypedSelector } from '../../store';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import NodeListItem from './NodeListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import { Collapse } from '@material-ui/core';

interface NodeListProps {
}

//COMPONENT
const NodeList: FunctionComponent<NodeListProps> = (props: NodeListProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNodes());
  }, [])

  const {nodes} = useTypedSelector(state => state.nodes)

  let nodeIds: string[] = Object.keys(nodes);
  let lastNode = nodeIds.slice(-1).pop();
  return (
      <Box>
        <ul className={classes.ul}>
          {nodeIds.map(n => {
            return <NodeListItem key={n} id={n} />;
          })}
        </ul>
      </Box>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      ul: {
        position: 'relative',
        listStyle: 'none',
        paddingLeft: 32,
      },
    }));

export default NodeList;
