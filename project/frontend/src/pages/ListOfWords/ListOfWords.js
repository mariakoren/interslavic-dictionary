import React, { useState, useEffect } from "react";
import axios from "axios";

const ListOfWords = () => {
    const [data, setData] = useState(null);

    useEffect(()=>{
        axios
            .get("http://localhost:5000/listofwords")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    });

    return data ? (
        <>
          {data.map((rec, i) => 
          <ul>
            <li>Polski: {rec.polish}</li>
            <li>Międzysłowiański: {rec.interslavic}</li>
          </ul>
        )}
        </> ) : (
          <div>Lista słów</div>
        );
}

export default ListOfWords;
