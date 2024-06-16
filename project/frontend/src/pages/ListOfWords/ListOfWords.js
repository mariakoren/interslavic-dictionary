import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './listofwords.css';
import useAuth from "../../hooks/useAuth2.js";
import { useNavigate } from 'react-router-dom';

const ListOfWords = () => {
    const [data, setData] = useState(null);
    const [isLogin, token, isAdmin] = useAuth();
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        axios
            .get("http://localhost:5000/listofwords")
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [])

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
                alert("Słowo zapisane!")
            })
            .catch(err => {
                console.error('Error saving word:', err);
            });
    };

    const deleteWord = (idWord, token) => {
        const config = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };

        axios
            .delete(`http://localhost:5000/listofwords?id=${idWord}`,  config)
            .then(response => {
                console.log('Word deleted:', response.data);
                fetchData();
            })
            .catch(err => {
                console.error('Error deleting word:', err);
            });
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClick = () => {
        navigate('/');
      };

    return <>
    <div>
        <button onClick={handleClick}>Wróć na stronę domową</button>
    </div>
    
    <div>
    {data ? (
        <>
            {data.map((rec, i) => (
                <ul key={i} className="word-list">
                    <li className="word-item">Polski: {rec.polish}</li>
                    <li className="word-item">Międzysłowiański: {rec.interslavic}</li>
                    {isLogin && <button className="button" onClick={() => writeWord(rec._id, token)}>Zapisz</button>}
                    {isAdmin && <button className="button" onClick={() => deleteWord(rec._id, token)}>Usuń</button>}

                </ul>
            ))}
        </>
    ) : (
        <div className="loading">Ładowanie listy słów...</div>
    )}
    </div>
    </>
};

export default ListOfWords;
