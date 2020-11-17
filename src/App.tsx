import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme } from '@material-ui/core';
import Home from './components/Home';
import makeStyles from '@material-ui/core/styles/makeStyles';

function App() {
  const classes=useStyles();
  return (
      <div className={classes.app}>
        <CssBaseline />
          <Home/>
      </div>);
}
const useStyles = makeStyles((theme:Theme)=>({
 app: {backgroundColor: theme.palette.grey['400']}
}))

export default App;
