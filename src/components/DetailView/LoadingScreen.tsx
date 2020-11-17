import React, { FunctionComponent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelectedNode } from '../../store/nodes/selectors';
import { ApiRequestStatus } from '../../store/types';

//COMPONENT
const LoadingScreen: FunctionComponent = () => {
  const classes = useStyles();
  const {requestStatus} = useSelectedNode()



  return (
      <div className={classes.root}>
        {!requestStatus || requestStatus?.status === ApiRequestStatus.Idle ?
        <div className={classes.getStarted}>
          Select an item from the sidebar to get started.
        </div>: ""}
        {requestStatus?.status === ApiRequestStatus.Rejected
         ? <div className={classes.getStarted}>
           Error loading selected content. </div>
         : ""}
        {requestStatus?.status === ApiRequestStatus.Pending
         ? <div className={classes.getStarted}>
            Beaming up the requested data. Load long and prosper.
        </div>
         : ""}

      </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {
        display:"flex",
        width:"100%",
        height:"90vh",
        alignItems: "center",
        justifyContent:"center"
      },
      getStarted: {
        color: theme.palette.grey.A700,
        fontWeight: 400,
        fontSize:"1.6rem"
      }
    }));

export default LoadingScreen;
