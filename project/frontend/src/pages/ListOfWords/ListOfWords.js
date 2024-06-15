import React, { useState, useEffect } from "react";
import axios from "axios";
import './listofwords.css'; // Import stylizacji
import useAuth from "../../hooks/useAuth2.js";

const ListOfWords = () => {
    const [data, setData] = useState(null);
    const [isLogin, token] = useAuth();

    const writeWord = (idWord, token) => {
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };

        axios
            .post(`http://localhost:5000/userwords?idWord=${idWord}`, {}, config)
            .then(response => {
                console.log('Word saved:', response.data);
            })
            .catch(err => {
                console.error('Error saving word:', err);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/listofwords")
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return data ? (
        <>
            {data.map((rec, i) => (
                <ul key={i} className="word-list">
                    <li className="word-item">Polski: {rec.polish}</li>
                    <li className="word-item">Międzysłowiański: {rec.interslavic}</li>
                    {isLogin && <button className="button" onClick={() => writeWord(rec._id, token)}>Zapisz</button>}
                </ul>
            ))}
        </>
    ) : (
        <div className="loading">Ładowanie listy słów...</div>
    );
};

export default ListOfWords;
