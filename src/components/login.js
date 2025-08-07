import React ,{ useContext, useState} from 'react';
import image from './signup.png';
import'./signup.css';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const {login}=useContext(AuthContext)

    const handlelogin=()=>{
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }
  const storeduser=JSON.parse(localStorage.getItem(email));
    if (storeduser &&storeduser.password===password){
         login(storeduser); // ✅ Save to context
    localStorage.setItem("user", JSON.stringify(storeduser));
        navigate('/home');
    }
    else{
                    alert('Invalid Credentials');
        }

        };
return (
    <div className='hero'>
        <img src={image} alt='Background'/>
        <div className='mona'>
            <div className='naan'>
                <h2>Login</h2>
                <input type='email'
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                style={{width:'100%',padding:'10px',marginBottom:'10px'}}/>
                
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
        <p style={{marginTop:'15px'}}>
            No Account? Don't Worry...<Link to ="/signup">Signup</Link>
        </p>

            </div>
        </div>
    </div>
);
};
export default Login;