import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { findNodes } from '../../store/nodes/thunks';
import { useTypedSelector } from '../../store';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import NodeListItem from './NodeListItem';

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

  return (
      <Box>
        <List dense>
          {Object.keys(nodes).map(n => {
            const {id, title} =  nodes[n];
            return <NodeListItem key={n} node={nodes[n]}/>;
          })}
        </List>
      </Box>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default NodeList;
