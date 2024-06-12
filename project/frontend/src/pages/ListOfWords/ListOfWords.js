import React, { useState, useEffect } from "react";
import axios from "axios";
import './listofwords.css';

const ListOfWords = () => {
    const [data, setData] = useState(null);

    useEffect(()=>{
        axios
            .get("http://localhost:5000/listofwords")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    }, []);

    return data ? (
        <>
          {data.map((rec, i) => 
          <ul key={i} className="word-list">
            <li className="word-item">Polski: {rec.polish}</li>
            <li className="word-item">Międzysłowiański: {rec.interslavic}</li>
            {/* <button className="word-item">Zapisz</button> */}
          </ul>
        )}
        </> ) : (
          <div>Lista słów</div>
        );
}

export default ListOfWords;
