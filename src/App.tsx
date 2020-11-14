import React, { useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import NodeList from './components/NodeList/NodeList';

function App() {
  return (
      <div>
        <CssBaseline />
        <Container>
          <div>
            <Typography variant={"h1"}>Ada Test</Typography>
          <NodeList/>
          </div>
        </Container>
      </div>);
}

export default App;
