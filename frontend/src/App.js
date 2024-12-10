import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/respond', {
        question,
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div>
      <h1>답장코치 AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문을 입력하세요"
        />
        <button type="submit">질문 제출</button>
      </form>
      <div>
        <h2>AI의 답변:</h2>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default App;