import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import './reviews.css';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth2.js";


const Reviews = () => {
  const [values, setValues] = useState({ content: '' });
  const [data, setData] = useState([]);
  const [isLogin, token, isAdmin] = useAuth();
  const navigate = useNavigate();

  const fetchData = useCallback( () => {
    
    axios.get("http://localhost:5000/reviews")
    .then(res => setData(res.data))
    .catch (err => console.error(err))
    }, []);

 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit =  () => {
    const queryString = new URLSearchParams(values).toString();
    axios
    .post(`http://localhost:5000/reviews?${queryString}`)
    .then(res => {
      setData([...data, res.data]);
      setValues({ content: '' });
    })
    .catch(err => console.error(err))
  };

  const handleClick = () => {
    navigate('/');
  };

  const handleDelete = (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    axios
    .delete(`http://localhost:5000/reviews?id=${id}`, config)
    .then(res => {
      console.log('Review deleted', res.data)
      fetchData();
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
   <>
   <div>
        <button onClick={handleClick}>Wróć na stronę domową</button>
    </div>
    <div className="container-review">
      <form className="form-review">
        <div>
          <label className="label-review">Treść opinii:</label>
          <textarea
            name="content"
            value={values.content}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="button"
          >
            Dodaj opinię
          </button>
        </div>
      </form>
      <>
        {data && data.length > 0 ? (
          <ul className="review-list">
            {data.map((rec) => (
              <li key={rec._id} className="review-item">
                <div>
                  <p>{rec.content}</p>
                  {isAdmin && <button className="button" onClick={() => handleDelete(rec._id)}>Usuń</button>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak opinii do wyświetlenia.</p>
        )}
      </>
    </div>
   </>
  );
};

export default Reviews;
