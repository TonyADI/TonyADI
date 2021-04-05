import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.css';

export const NotFound = props => {
    return (
        <div className="notfound-container full-width">
            <Link to="/"><button className="button redirect">
                Back to Augeo</button></Link>
        </div>
    )
}