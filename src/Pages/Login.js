// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const userData = getUserFromLocalStorage();

        // Validate email and password
        if (userData && userData.email === email && userData.password === password) {
            alert('Login successful!');
            navigate('/dashboard');
        } else {
            alert('Invalid email or password.');
        }
    };

    const onSignup = () => {
        navigate('signup')
    }

    const getUserFromLocalStorage = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    };

    return (
        <div className="centered-box">
            <h1>krtrimaIQ Test</h1>
            <div className='input-container'>
                <div className='flex-center'>
                    <h1>Login</h1>
                </div>

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className='flex-center'>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className='flex-center'>
                    <p onClick={onSignup}>Create New Account <a href='#'>Signup</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
