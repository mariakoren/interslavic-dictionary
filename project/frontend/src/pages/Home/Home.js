import React from 'react';
import { useNavigate} from 'react-router-dom';
import './home.css';
// import {useAuth} from "../../context/AuthContext.js";

const Home = () => {
    // const { isLogin, token } = useAuth();
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
    };

    return (
        <div>
            <div className="nav">
                Strona domowa
            </div>

            <div className="buttonContainer">
                <button className="navButton" onClick={goToLogin}>Moje słowa</button>
                {/* <Link to="/login">Moje słowa</Link> */}
                <button className="navButton" onClick={goToList}>Lista słów</button>
                <button className="navButton" onClick={goToReviews}>Opinie</button>
            </div>

            {/* <div>
            {isLogin ? (
                <p>Logged in with token: {token}</p>
            ) : (
                <p>Not logged in</p>
            )}
        </div> */}
        </div>
    );
}

export default Home;
