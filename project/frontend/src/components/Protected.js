import React, { useState, useEffect, useRef } from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import "./protected.css";


const Protected = ({token, client}) => {
  const navigate = useNavigate();
  const isRun = useRef(false);
  const [data, setData] = useState(null);

  useEffect(()=>{
    if (isRun.current) return;
    isRun.current = true;
    const config = {
      headers:{
        authorization: `Bearer ${token}`
      }
    }
    
    axios
    .get("http://localhost:5000/userwords", config)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  });

  const handleLogout = () =>{
    if (client) {
      client.logout({ redirectUri: window.location.origin });
    }
  }

  const handleClick = () => {
    navigate('/');
  };

  return <>
  <div>
    <button onClick={handleLogout}>Wyloguj się</button>
  </div>
  <div>
        <button onClick={handleClick}>Wróć na stronę domową</button>
    </div>
  <div>
  {data ? (
  <>
    <div className="title">Zapisane słowa:</div>
    {data && data.length > 0 ? (
      data.map((rec, i) => 
        ( <ul key={i} className="word-list">
          <li className="word-item">Polski: {rec.polish}</li>
          <li className="word-item">Międzysłowiański: {rec.interslavic}</li>
        </ul>
  
        ))
    ) : (
      <div className="no-words">Brak słów do wyświetlania</div>
    )}
  </> ) : (
    <div>Protected</div>
  )}
  </div>
  </>
};

export default Protected;