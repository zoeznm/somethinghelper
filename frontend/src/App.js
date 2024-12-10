import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/respond", {
        data: inputData, // 데이터 키가 'data'여야 함
      });
      setMessage(response.data.answer); // 서버에서 'answer' 키로 응답
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;