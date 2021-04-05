import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'

export const Navbar = props => {
    return(
        <div className="full-width">
            <nav>
                <ul>
                    <div id="nav-container">
                        <li id="home">
                            <Link to="/">Augeo</Link>
                        </li>
                        {!props.authenticated && 
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        }
                        {!props.authenticated && 
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        }
                        {props.authenticated &&
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                        }
                        <li id="sell">
                                <Link to="/sell">Sell</Link>
                        </li>
                        
                        <li id="browse">
                            <Link to="/browse">Browse</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}