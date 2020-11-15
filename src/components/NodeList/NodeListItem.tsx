import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { useNode } from '../../store/nodes/selectors';
import { selectNode } from '../../store/app/thunks';
import { ApiRequestStatus } from '../../store/types';

interface NodeListItemProps {
  id: string,
  indent?: number,
  index?: number,
}

//COMPONENT
const NodeListItem: FunctionComponent<NodeListItemProps> = (props: NodeListItemProps) => {
  const {id} = props;
  const indent = props.indent ?? 0;
  const classes = useStyles();
  const dispatch = useDispatch();
  const {selected, title, connections, requestStatus, isHighlighted} = useNode(
      id,indent
      );

  const isSelected: boolean = selected[indent] === id;
  const finishedLoading = requestStatus?.status === ApiRequestStatus.Fulfilled;

  const handleClick = () => {
    console.log("click", id, indent)
    dispatch(selectNode(id, indent));
  };

  const showDivider = indent == 0;
  const showTopDivider = showDivider && isSelected && connections &&
                         connections.length > 0;

  return (

      <li className={indent > 0 ? classes.li:classes.topLi} key={id}><div onClick={() => handleClick()}>{title}</div>
        <Collapse in={isSelected}>
          <ul className={classes.ul}>
            {connections?.map((connection, index)=> (<NodeListItem key={id+connection+index}  id={connection.toString()} indent={indent+1}>{title}</NodeListItem>))}
          </ul>
        </Collapse>
      </li>
  );
};

interface ConnectorProps {
  indent: number
}

const useStyles = makeStyles((theme:Theme)=> ({
  ul: {
    position: 'relative',
    listStyle: 'none',
    paddingLeft: 32,
  },
  topLi: {
    position: 'relative',
    cursor: "pointer",
  },
  li: {
    position: 'relative',
    cursor: "pointer",
    '&::before': {
      display: "inline",
      content: '" "',
      position: 'absolute',
      left: -12,
      height: 0,
      borderTop: "1px solid black",
      top: "0.7rem",
      width: "0.7rem",


    },
    '&::after': {
      content: '" "',
      position: 'absolute',
      top: -2,
      left: -12,
      height: "100%",
      width: 0,
      border: "1px solid darkgrey"
    },
    '&:last-child': {
      marginBottom: theme.spacing(1),
      height: "90%"
    },
    '&:last-child::after': {
      marginBottom: theme.spacing(1),
      height: "90%"
    },
  }
}))


export default NodeListItem;

