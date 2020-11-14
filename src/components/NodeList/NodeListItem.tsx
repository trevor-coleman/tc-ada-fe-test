import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { useNode } from '../../store/nodes/selectors';
import { selectNode } from '../../store/app/thunks';
import { ApiRequestStatus } from '../../store/types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TreeLines from './TreeLines';

interface NodeListItemProps {
  id: string,
  indents?: number[],
  index?: number,
  lastChild: boolean,
  parentIsLastChild?: boolean,
}

//COMPONENT
const NodeListItem: FunctionComponent<NodeListItemProps> = (props: NodeListItemProps) => {
  const {id, lastChild, index} = props;
  const indents = props.indents ?? [];
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const {selected, title, connections, requestStatus, isHighlighted} = useNode(
      id,
      indents.length);

  const isSelected: boolean = selected[indents.length] === id;
  const finishedLoading = requestStatus?.status === ApiRequestStatus.Fulfilled;

  const handleClick = () => {
    dispatch(selectNode(id, indents.length));
    console.log(lastChild,indents.length, indents)
  };

  const showDivider = indents.length == 0;
  const showTopDivider = showDivider && isSelected &&
                         connections && connections.length > 0;

  return (
      <>
        <div className={classes.root} style={{
          backgroundColor: isHighlighted
                           ? "#ddd"
                           : "#fff",
        }} onClick={handleClick}>
          <div className={classes.treeLines}><TreeLines indents={indents} index={index??0}/></div>
          <div>
          <Typography className={classes.title}>{title}</Typography>
          </div>
        </div>
        {showTopDivider
         ? <Divider />
         : ""}
          {connections
           ? connections.map((connection, index) => {
             const newIdents = indents.slice();
             newIdents.push(lastChild ? 0: 1)
                return (
                    <NodeListItem key={id + "-" + indents.length + "-" + index}
                                    indents={newIdents}
                                    id={connection.toString()}
                                    index={index}
                                    lastChild={index==connections.length-1}
                    />
                    );
              })
           : ""}
        {showDivider
         ? <Divider />
         : ""}
      </>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {
        paddingLeft: ({indents}: NodeListItemProps) => theme.spacing(indents && indents.length > 0
                                                                    ? 4
                                                                    : 2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: theme.spacing(5),
        cursor: 'default',
      },

      title: {
        marginLeft: theme.spacing(1),
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace:"nowrap"

      },
      loadingSpinner: {
        width: 20,
        height: 20,
      },
      treeLines: {
        width: 20,
      }
    }));

export default NodeListItem;

