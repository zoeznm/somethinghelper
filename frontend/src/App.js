import React, { useEffect, useState } from "react"; 
import "./App.css"; 
import axios from "axios"; 

function App() {
  const [getData, setGetData] = useState(null); // GET 요청으로 받은 데이터를 저장할 상태
  const [postData, setPostData] = useState(null); // POST 요청의 결과를 저장할 상태
  const [inputData, setInputData] = useState({ name: "", email: "" }); // 사용자 입력을 처리할 상태

  // GET 요청
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data") // 백엔드 API URL
      .then((response) => {
        console.log("Received data:", response.data); // 받은 데이터 확인
        setGetData(response.data); // 받은 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // 에러 발생 시 처리
      });
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  // POST 요청 (데이터 보내기)
  const handleSubmit = () => {
    const postData = {
      name: inputData.name, // 사용자가 입력한 name
      email: inputData.email, // 사용자가 입력한 email
    };

    axios
      .post("http://localhost:3000/api/data", postData) // 백엔드 API URL로 POST 요청
      .then((response) => {
        console.log("Data posted:", response.data); // 서버에서 받은 응답 확인
        setPostData(response.data); // 서버 응답을 상태에 저장
      })
      .catch((error) => {
        console.error("Error posting data:", error); // 에러 발생 시 처리
      });
  };

  return (
    <div className="App">
      <h1>GET 요청으로 받은 데이터</h1>
      <div>
        {getData ? (
          <pre>{JSON.stringify(getData, null, 2)}</pre> // 받은 데이터 출력
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      <h1>POST 요청 예시</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={inputData.email}
          onChange={(e) =>
            setInputData({ ...inputData, email: e.target.value })
          }
        />
        <button onClick={handleSubmit}>Send Data</button>
      </div>

      {postData && (
        <div>
          <h2>POST 요청 응답</h2>
          <pre>{JSON.stringify(postData, null, 2)}</pre> {/* 서버 응답 출력 */}
        </div>
      )}
    </div>
  );
}

export default App;
