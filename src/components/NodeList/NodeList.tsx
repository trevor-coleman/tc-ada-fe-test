import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles} from '@material-ui/core/styles';
import { findNodes } from '../../store/nodes/thunks';
import Box from '@material-ui/core/Box';
import NodeListItem from './NodeListItem';
import Divider from '@material-ui/core/Divider';
import { useVisibleNodes } from '../../store/nodes/selectors';


/**
 * Component that displays the visibleNodeIds as list with lines to indicate parent-child relationships.
 * @return {JSX.Element}
 * @constructor
 */
const NodeList: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNodes());
  }, [dispatch])

  const visibleNodes = useVisibleNodes();

  return (
      <Box>
        <nav>
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
        </nav>
      </Box>);
};

const useStyles = makeStyles(() => (
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
