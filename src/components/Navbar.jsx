import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="main-container">
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand me-auto" to="/">
                        Form List Project
                    </Link>
                    <button
                        className="navbar-toggler pe-8"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                Menu
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2 active" aria-current="page" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" to="/trade">
                                        Trade
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to="/login" className="login-button">
                        Login
                    </Link>
                </div>
            </nav>

        </div>

    );
}

export default NavBar;
