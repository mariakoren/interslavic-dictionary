import React from 'react';
import { useNavigate} from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); 
    };

    const goToList = () => {
        navigate('/listofwords'); 
    };

    const goToReviews = () => {
        navigate('/reviews'); 
    };

    return (
        <div>
            <div className="nav">
                Strona domowa
            </div>

            <div className="buttonContainer">
                <button className="navButton" onClick={goToLogin}>Załoguj się</button>
                <button className="navButton" onClick={goToList}>Lista słów</button>
                <button className="navButton" onClick={goToReviews}>Opinie</button>
            </div>
        </div>
    );
}

export default Home;
