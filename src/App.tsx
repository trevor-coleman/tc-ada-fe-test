import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

const getNodes = async ()=> {
  const result = await api.nodes.find();
  return result;
}

function App() {
  useEffect(()=> {
    console.log(getNodes());
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {process.env.REACT_APP_API_BASEURL}
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
