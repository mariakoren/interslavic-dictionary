import axios from "axios";
import { useState, useEffect } from "react";
import './reviews.css';

const Reviews = () => {
  const [values, setValues] = useState({ content: '' });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/reviews");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const queryString = new URLSearchParams(values).toString();
    try {
      const res = await axios.post(`http://localhost:5000/reviews?${queryString}`);
      setData([...data, res.data]);
      setValues({ content: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form className="form">
        <div>
          <label className="label">Treść opinii:</label>
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
            {data.map((dane) => (
              <li key={dane._id} className="review-item">
                <div>
                  <p>{dane.content}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak opinii do wyświetlenia.</p>
        )}
      </>
    </div>
  );
};

export default Reviews;
