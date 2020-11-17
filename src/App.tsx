import React, { useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Theme } from '@material-ui/core';
import NodeList from './components/NodeList/NodeList';
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
