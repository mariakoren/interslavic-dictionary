import React, { useState } from 'react';
import axios from 'axios';
import './addword.css';

const AddWord = ({ token }) => {
  const [values, setValues] = useState({ polish: '', interslavic: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    axios
      .post(
        `http://localhost:5000/listofwords?polish=${values.polish}&interslavic=${values.interslavic}`, {},
        config
      )
      .then(() => {
        setValues({ polish: '', interslavic: '' });
        alert("Słowo dodane!")
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
        <div >Dodaj nowe słowo</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={values.polish}
          onChange={(e) => setValues({ ...values, polish: e.target.value })}
          placeholder="Polski"
        />
        <input
          type="text"
          value={values.interslavic}
          onChange={(e) => setValues({ ...values, interslavic: e.target.value })}
          placeholder="Międzysłowiański"
        />
        <button type="submit">Dodaj słowo</button>
      </form>
    </div>
  );
};

export default AddWord;
