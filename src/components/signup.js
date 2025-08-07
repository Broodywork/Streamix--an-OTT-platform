import React, { useState } from 'react';
import image from './signup.png';
import './signup.css';
import { useNavigate, Link } from 'react-router-dom';


function Signup() {
  const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirm_password,setConfirm]=useState('');
   const navigate = useNavigate();
   const [name, setName] = useState('');


  const handleSignup = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!name || !email || !password || !confirm_password) {
    alert('Please fill in all fields.');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }
 
    if(password!=confirm_password){
        alert('Password do not match');
    return;
    }
    const user = { email, password ,name};
    localStorage.setItem(email, JSON.stringify(user));
    navigate('/login');
  };

  return (
    <div className="hero">
      <img src={image} alt="Background" />
       <div className="mona">
      <div className="naan">
        <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
        />
         <input
          type="password"
          placeholder="Confirm Password"
          value={confirm_password}
          onChange={(e) => setConfirm(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
        />
        <button
          onClick={handleSignup}
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
          Signup
        </button>
        <p style={{ marginTop: '15px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        </div>
    </div>
    </div>
  );
};

export default Signup;
