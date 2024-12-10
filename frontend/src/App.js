import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 백엔드 API 호출
    axios.get('http://localhost:3000/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);


  return (
    <div className="App">
    <h1>{message}</h1>
  </div>
  );
}

export default App;
