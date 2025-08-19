import React, { useContext, useState } from 'react';
import axios from 'axios';
import image from './signup.png';
import './signup.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // ✅ Added state
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // ✅ Make sure AuthProvider wraps your app

    const handlelogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

      

        // Backend login request
        const user = { email, password };
        axios.post('http://127.0.0.1:8000/api/login/', user)
            .then(response => {
                setErrorMessage('');

                // ✅ Store token from API response
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.name);

                // ✅ Save user to context if needed
                login({ email, token: response.data.token });

                navigate('/home');
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Please Check the Credentails Entered again');
                }
            });
    };

    return (
        <div className='hero'>
            <img src={image} alt='Background' />
            <div className='mona'>
                <div className='naan'>
                    <h2>Login</h2>

                    {errorMessage && (
                        <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>
                    )}

                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                    />

                    <button
                        onClick={handlelogin}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>

                    <p style={{ marginTop: '15px' }}>
                        No Account? Don't Worry... <Link to="/signup">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
