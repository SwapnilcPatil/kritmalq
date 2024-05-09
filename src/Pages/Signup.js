
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        // Validate email and password
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        // Store user in local storage
        setUserInLocalStorage(email, password);
        alert('Signup successful!');
        navigate('/login');
    };

    const setUserInLocalStorage = (email, password) => {
        const userData = {
            email,
            password,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const onSignin = () => {
        navigate('/')
    }

    return (
        <div className="centered-box">
            <h1>krtrimaIQ Test</h1>
            <div className='input-container'>
                <div className='flex-center'>
                    <h1>Signup</h1>
                </div>

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className='flex-center'>
                    <button onClick={handleSignup}>Signup</button>
                </div>
                <div className='flex-center'>
                    <p onClick={onSignin}>If Account exists <a href='#'>Login</a></p>
                </div>

            </div>
        </div>
    );
};

export default Signup;
