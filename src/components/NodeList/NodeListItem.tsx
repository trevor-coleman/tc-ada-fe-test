import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { useNode } from '../../store/nodes/selectors';
import { selectNode } from '../../store/app/thunks';
import { ApiRequestStatus } from '../../store/types';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface NodeListItemProps {
  id: string,
  indent?: number,
  index?: number,
}

//COMPONENT
const NodeListItem: FunctionComponent<NodeListItemProps> = (props: NodeListItemProps) => {
  const {id} = props;
  const indent = props.indent ?? 0;
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const {selected, title, connections, requestStatus, isHighlighted} = useNode(
      id,
      indent);

  const isSelected: boolean = selected[indent] === id;
  const finishedLoading = requestStatus?.status === ApiRequestStatus.Fulfilled;

  const handleClick = () => {
    console.log("click", id, indent);
    dispatch(selectNode(id, indent));
  };

  const showDivider = indent == 0;
  const showTopDivider = showDivider && isSelected && connections &&
                         connections.length > 0;

  return (

      <li className={indent > 0
                     ? classes.li
                     : classes.topLi} key={id}>
        <div onClick={() => handleClick()}
             className={classes.title}><Typography>{title}</Typography></div>
        <Collapse in={isSelected && finishedLoading}>
          {showTopDivider
           ? <Divider className={classes.topDivider} />
           : ""}
          <ul className={classes.ul}>
            {connections?.map((connection, index) => (
                <NodeListItem key={id + connection + index}
                              id={connection.toString()}
                              indent={indent + 1}>{title}</NodeListItem>))}
          </ul>
        </Collapse>
      </li>);
};

interface ConnectorProps {
  indent: number
}

const useStyles = makeStyles((theme: Theme) => (
    {
      ul: {
        position: 'relative',
        listStyle: 'none',
      },
      topDivider: {
        width: "100%",
      },
      title: {
        paddingLeft({indent}: NodeListItemProps) {
          console.log(indent);
          return (
                     indent ?? 0) == 0
                 ? theme.spacing(2)
                 : 0;
        },
        paddingTop({indent}: NodeListItemProps) {
          console.log(indent);
          return (
                     indent ?? 0) == 0
                 ? theme.spacing(1)
                 : theme.spacing(1);
        },
        paddingBottom({indent}: NodeListItemProps) {
          console.log(indent);
          return (
                     indent ?? 0) == 0
                 ? theme.spacing(1)
                 : 0;
        },

      },
      topLi: {
        position: 'relative',
        cursor: "pointer",
        width: "100%",
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
          borderTop: "1px solid darkgrey",
          top: "1.1rem",
          width: "0.7rem",

        },
        '&::after': {
          content: '" "',
          position: 'absolute',
          top: 0,
          left: -12,
          height: "100%",
          width: 0,
          border: "1px solid darkgrey",
        },
        '&:last-child': {
          marginBottom: theme.spacing(1),
          height: "100%",
        },
        '&:last-child::after': {
          marginBottom: theme.spacing(1),
          top: "-0.1rem",
          height: "1.3rem",
        },
      },
    }));

export default NodeListItem;

