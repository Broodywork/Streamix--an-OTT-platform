import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import image from './f1.webp';
import image1 from './Superman.jpg';
import image2 from './f4.jpg';
import image3 from './coolie.jpeg';
import image4 from  './coolie2.jpg';
import image5 from  './leo.jpg';
import './main.css';
function Mainpage(){
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
 <div className="card-container">
<Link to='/home/1' className="link">
        <div className="card">
          <img src={image} alt="Movie 1" />
           <div className="overlay">
      <h3>1.Formula 1</h3>
      <p>Daytona and F1 race.</p>
    </div>
    </div>
        </Link>
        <Link to='/home/2' className="link">
        <div className="card">
          <img src={image1} alt="Movie 2" />
    <div className="overlay">
      <h3>2.Superman</h3>
      <p>DC's New Movie.</p>
    </div>
        </div>
        </Link>
        <Link to='/home/3' className="link">
        <div className="card">
          <img src={image2} alt="Movie 3" />
    <div className="overlay">
      <h3>3.Fantastic 4</h3>
      <p>Marvel's New Series Starting</p>
    </div>
        </div>
        </Link>
        <Link to='/home/4' className="link">
         <div className="card">
          <img src={image4} alt="Movie 4" />
    <div className="overlay">
      <h3>4.Coolie</h3>
      <p>SuperStar-Rajnikanth's new release</p>
    </div>
        </div>
        </Link>
        <Link to='/home/5' className="link">
        <div className="card">
          <img src={image5} alt="Movie 5" />
    <div className="overlay">
      <h3>5.Leo </h3>
      <p>Vijay as Leo das</p>
    </div>
        </div>
        </Link>
      </div> 
      <div className="card-container">
        <div className="card">
          <img src={image} alt="Movie 1" />
        </div>
        <div className="card">
          <img src={image1} alt="Movie 2" />
        </div>
        <div className="card">
          <img src={image2} alt="Movie 3" />
        </div>
         <div className="card">
          <img src={image4} alt="Movie 4" />
        </div>
        <div className="card">
          <img src={image5} alt="Movie 5" />
        </div>
      </div>
    
</>

    );

};
export default Mainpage;