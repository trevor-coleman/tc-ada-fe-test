import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { useNode, useVisibleNodes } from '../../store/nodes/selectors';
import { selectNode } from '../../store/app/thunks';
import { ApiRequestStatus } from '../../store/types';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import HighlightText from '../HighlightText';
import { useSearchTerm } from '../../store/app/selectors';

interface NodeListItemProps {
  id: number,
  indent?: number,
  index?: number,
}

type StyleProps = NodeListItemProps & {
  isHighlighted: boolean;
}

/**
 * Component that displays items inside of a node list.
 * @param {NodeListItemProps} props
 * @return {JSX.Element}
 * @constructor
 */
const NodeListItem: FunctionComponent<NodeListItemProps> = (props: NodeListItemProps) => {
  const {id} = props;
  const indent = props.indent ?? 0;
  const dispatch = useDispatch();
  const visibleNodes = useVisibleNodes();
  const {selected, title, connections, requestStatus, isHighlighted} = useNode(
      id,
      indent);
  const classes = useStyles({
    ...props,
    isHighlighted,
  });
  const thisNode = useNode(id, indent);
  const isOpen: boolean = selected[indent] === id;
  const finishedLoading = requestStatus?.status === ApiRequestStatus.Fulfilled;
  const searchTerm=useSearchTerm();

  const handleClick = () => {
    dispatch(selectNode(id, indent));
  };

  const visibleConnections = connections
                             ? connections.filter(connection => visibleNodes.indexOf(
          connection) !== -1)
                             : [];
  const showDivider = indent == 0;
  const showTopDivider = showDivider && isOpen && connections &&
                         connections.length > 0;

  return (

      <li className={indent > 0
                     ? classes.li
                     : classes.topLi} key={id}>
        <div className={classes.title} onClick={() => handleClick()}>
          <HighlightText body={title} stringToHighlight={searchTerm} />
        </div>
        <Collapse in={isOpen && finishedLoading}>
          {showTopDivider
           ? <Divider className={classes.topDivider} />
           : ""}
          <ul className={classes.ul}>
            {visibleConnections?.map((connection, index) => {
              return (
                  <NodeListItem key={id + connection + index}
                                id={connection}
                                indent={indent + 1}>{title}</NodeListItem>);
            })}
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
        display: 'flex',
        alignItems: 'center',

        paddingLeft({indent}: StyleProps) {
          return (
                     indent ?? 0) == 0
                 ? theme.spacing(2)
                 : 4;
        },
        paddingTop({indent}: StyleProps) {
          return (
                     indent ?? 0) == 0
                 ? theme.spacing(1)
                 : theme.spacing(1);
        },
        paddingBottom({indent}: StyleProps) {
          return (
                     indent ?? 0) == 0
                 ? theme.spacing(1)
                 : theme.spacing(1);
        },
        backgroundColor: ({isHighlighted}: StyleProps) => isHighlighted
                                                          ?  theme.palette.grey['200']
                                                          : "#fff",
        color: ({isHighlighted}: StyleProps) => isHighlighted
                                                ? theme.palette.getContrastText(theme.palette.grey['100'])
                                                : theme.palette.text.primary,

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

