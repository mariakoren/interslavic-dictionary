import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Protected = ({token}) => {
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

    // axios
    // .get("http://localhost:5000/documents", config)
    // .then(res => setData(res.data))
    // .catch(err => console.error(err))

    axios
    .get("http://localhost:5000/userwords", config)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  });

  return data ? (
  <>
    Zapisane słowa:
    {data.map((rec, i) => 
      ( <ul key={i} className="word-list">
        <li className="word-item">Polski: {rec.polish}</li>
        <li className="word-item">Międzysłowiański: {rec.interslavic}</li>
      </ul>

      ))}
  </> ) : (
    <div>Protected</div>
  );
};

export default Protected;