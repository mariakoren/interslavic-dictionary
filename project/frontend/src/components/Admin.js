import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import './admin.css'; 

const Admin = ({ token, client }) => {
  const isRun = useRef(false);
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    axios
      .get("http://localhost:5000/userwords/all", config)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [token]);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    fetchData();
  }, [fetchData]);

  const handleDelete = (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    axios
      .delete(`http://localhost:5000/userwords?id=${id}`, config)
      .then(() => {
        fetchData();
      })
      .catch(err => console.log(err));
  };

  const handleLogout = () =>{
    if (client) {
      client.logout({ redirectUri: window.location.origin });
    }
  }
  
  return (
    <>
      <div>
    <button onClick={handleLogout}>Wyloguj się</button>
  </div>
      <div>
      <div className="title">Zapisane słowa dla wszystkich użytkowników:</div>
      {data && data.length > 0 ? (
        data.map((rec) => (
          <ul key={rec._id} className="word-list">
            <li className="word-item">Polski: {rec.wordDetails.polish}</li>
            <li className="word-item">Międzysłowiański: {rec.wordDetails.interslavic}</li>
            <li className="word-item">Username: {rec.user}</li>
            <li className="word-item">
              <button onClick={() => handleDelete(rec._id)}>Usuń</button>
            </li>
          </ul>
        ))
      ) : (
        <div className="no-words">Brak słów do wyświetlania</div>
      )}
      </div>
    </>
  );
};

export default Admin;
