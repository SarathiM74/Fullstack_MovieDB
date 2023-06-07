import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-text">
                        Movie Database
                    </span>
                    <button type="button" class="btn btn-link" onClick={handleGoBack}>Back</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar;

