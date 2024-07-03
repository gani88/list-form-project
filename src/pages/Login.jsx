import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            setUsername('');
            setPassword('');
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="main-container" style={{ marginTop: '100px', textAlign: 'center' }}>
            <h1>Welcome Back</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* Using conditional rendering based on successful login */}
                {username === 'admin' && password === 'admin' ? (
                    <Link to="/trade" className="login-button mt-3">
                        Login
                    </Link>
                ) : (
                    <button type="submit" className="login-button mt-3">
                        Login
                    </button>
                )}
            </form>
        </div>
    );
}

export default Login;
