import React from 'react';
import { useNavigate} from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); 
        window.location.reload();
    };

    const goToList = () => {
        navigate('/listofwords'); 
        window.location.reload();
    };

    const goToReviews = () => {
        navigate('/reviews'); 
        window.location.reload();
    };

    return (
        <div>
            <div className="nav">
                Strona domowa
            </div>

            <div className="buttonContainer">
                <button className="navButton" onClick={goToLogin}>Moje słowa</button>
                <button className="navButton" onClick={goToList}>Lista słów</button>
                <button className="navButton" onClick={goToReviews}>Opinie</button>
            </div>
        </div>
    );
}

export default Home;
