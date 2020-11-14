import React, { useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import NodeList from './components/NodeList/NodeList';
import Home from './components/Home';

function App() {
  return (
      <div>
        <CssBaseline />
          <Home/>
      </div>);
}

export default App;
