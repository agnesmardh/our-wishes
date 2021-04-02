import React, { ReactElement, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export const App = (): ReactElement => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=redux');

      setData(result.data);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello and welcome to our wishes!</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};
