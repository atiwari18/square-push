import dancingNinja from './NinjaSE_WIN.gif';
import './Victory.css'; 
import {Link} from 'react-router-dom';
import React from 'react';

export const Victory = () => {
    
    return (
        <div>
            <div className="parent">
                <h1 className="header">You Have Won!</h1>
                <img className="dancingNinja" src={dancingNinja} width = "500px" alt=""/>
                <Link to="/">
                    <button className="homeButton">Home</button>
                </Link>
            </div>

        </div>
    );
}

export default Victory;