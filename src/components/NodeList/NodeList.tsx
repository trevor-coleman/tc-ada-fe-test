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
import { useVisibleNodes } from '../../store/nodes/selectors';

interface NodeListProps {
}

/**
 * Component that displays the visibleNodeIds as list with lines to indicate parent-child relationships.
 * @param {NodeListProps} props
 * @return {JSX.Element}
 * @constructor
 */
const NodeList: FunctionComponent<NodeListProps> = (props: NodeListProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNodes());
  }, [])

  const visibleNodes = useVisibleNodes();

  let lastNode = visibleNodes.slice(-1).pop();
  return (
      <Box>
        <ul className={classes.ul}>
          {visibleNodes.map((n,index) => {
            return <div key={"node-" + n + "-" + index}>
              <div className={classes.node}>
                <NodeListItem id={n} />
              </div>
              <Divider />
            </div>;

          })}
        </ul>
      </Box>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      ul: {
        position: 'relative',
        listStyle: 'none',
        paddingLeft:0,
        margin:0,
      },
      node: {
        display: 'flex',
        alignItems: 'center',
      }
    }));

export default NodeList;
