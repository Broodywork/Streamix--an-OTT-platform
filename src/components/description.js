import {React,useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import image from './f1.webp';
import image1 from './Superman.jpg';
import image2 from './f4.jpg';
import image3 from './coolie.jpeg';
import image4 from  './coolie2.jpg';
import image5 from  './leo.jpg';

import './desc.css';


const movieData = {
  1: {
    title: "F1:Formula 1",
    description: `In the 1990s, Sonny Hayes was Formula 1's most promising driver until an accident on the track nearly ended his career.
    Thirty years later, the owner of a struggling Formula 1 team convinces Sonny to return to racing and become the best in the world.
     Driving alongside the team's hotshot rookie, Sonny soon learns that the road to redemption is not something you can travel alone.`,
    image: image,
  },
  2: {
    title: "Superman",
    description: `When Superman gets drawn into conflicts at home and abroad, his actions are questioned, giving tech billionaire
     Lex Luthor the opportunity to get the Man of Steel out of the way for good. Will intrepid reporter Lois Lane and Superman's four-legged
      companion,Krypto, be able to help him before it's too late`,
    image: image1,
  },
  3: {
    title: "Fantastic Four",
    description: `Mister Fantastic, Invisible Woman, Human Torch and the Thing face their most daunting challenge yet
     as they defend Earth from Galactus and Silver Surfer`,
    image: image2,
  },
  4:{
    title: "Coolie",
     description: `Deva, a former gold smuggler, seeks to regain his past glory by reviving his old gang with stolen technology hidden in 
     vintage golden watches, leading to unintended consequences.`,
    image: image4,
  },
  5:{
    title: "Leo",
     description: `Parthiban, a cafe owner, lives with his wife and son in Himachal Pradesh. Things take an absurd turn for him when he gets
      in the way of a drug cartel.`,
    image: image5,
  },
};

function Description(){
    const{id}=useParams();
    const movie=movieData[id];


     const { user,logout } = useContext(AuthContext);
    const navigate=useNavigate();
    const handlelogout=()=>{
        logout();
        navigate('/login')
    }
    const handlehome=()=>{
        navigate('/home')
    }

    return(
        <>
<nav className="navbar">
    <div className="nav-left">
    <ul className="nav-list">
    <li className="sized">{user.name}'s TV</li>
    <li>
  <NavLink to="/home" className={({ isActive }) => isActive ? "coolie active" : "coolie"}>
    Home
  </NavLink>
</li>

    <li className="coolie" >Watchlist</li>
    <li className="coolie">History</li>
    <li className="coolie">Account</li>
    <input type="search" className="search-bar" placeholder="Search Movies"/>
    </ul>
    </div>
<div className="nav-right">
        <button onClick={handlelogout}>Logout</button>
      </div>
</nav>
 {/* Movie Description */}
      <div className="description-card">
      <img
        src={movie.image}
        alt={movie.title}
        className="description-image"
      />
      <div className="description-overlay">
        <div className="description-buttons">
        <button >Watch Now</button>
        <button>Wishlist</button>
        </div>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
      </div>
    </div>
</>
);
};
export default Description;