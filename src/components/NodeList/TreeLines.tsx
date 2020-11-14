import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface TreeLinesProps {
  index: number,
  lastChild?: boolean,
  indents?: number[]
}

export enum TreeLine  {
  Connector,
  Extender,
}

//COMPONENT
const TreeLines: FunctionComponent<TreeLinesProps> = (props: TreeLinesProps) => {
  const {indents} = props;
  const classes = useStyles(props);
  const dispatch = useDispatch();

  return (
      <div className={classes.root} onClick={()=>console.log(indents)}>
        {indents?.length}
        {indents && indents.length > 1
         ? indents.map((indent, index)=> {
           if(index === indents.length -1) {
             return <div key={"ext-" + index}>c</div>
           }
            return <div key={"ext-" + index}>{indent? "e" : "n"}</div>;
          })
         : ""}</div>)
}

const useStyles = makeStyles((theme: Theme) => (
    {

      root: {
        width: 60
      },

      extender: {
        height: ({index}: TreeLinesProps) => index == 0
                                                ? theme.spacing(5)
                                                : theme.spacing(5),
        width: "2rem",
        top: ({index}: TreeLinesProps) => index == 0
                                             ? '-2rem'
                                             : '-1rem',
        borderLeft: "1px solid darkgrey",
        position: 'relative',
      },
      spacer: {
        width: "2rem",
      },
      connector: {
        height: ({index}: TreeLinesProps) => index == 0
                                                ? theme.spacing(3)
                                                : theme.spacing(6),
        width: "1rem",
        position: 'relative',
        top: ({index}: TreeLinesProps) => index == 0
                                             ? theme.spacing(-1)
                                             : '-2rem',
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: "1px solid darkgrey",
        borderLeft: "1px solid darkgrey",
      },
    }));

export default TreeLines;
