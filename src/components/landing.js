import React from 'react';
import backgroundImage from './OTT_Cover_Collage.jpg';
import { useNavigate, Link } from 'react-router-dom';
import './home.css';
function Home(){
    const navigate=useNavigate()
    const handleclick=()=>{
    navigate('/signup')
    
};
const handleit=()=>{
        navigate('/login')
    };
    return(
        <div className='hero'>
            <img src={backgroundImage} alt="Background"/>
            <div className='content'>
                <div className='top-bar'>
                    <div className='text-overlay'>STREAMIX</div>
                    <button className='off' onClick={handleit}>Sign In</button>
                    </div>
                    <div className='onam'>
                        <p>Unlimited Movies, TV Shows and More</p>
                        <button className='on'onClick={handleclick}>GET STARTED</button>
                </div>
            </div>
        </div>
    );
};
export default Home;