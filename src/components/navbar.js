import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust path if needed
import './main.css';



const Navbar = () => {
const  user  = localStorage.getItem("name");
console.log(user);


const navigate=useNavigate();


const handlelogout=()=>{
    navigate('/login')
};

  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul className="nav-list">
          <li className="sized">{user}'s TV</li>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "coolie active" : "coolie")}
            >
              Home
            </NavLink>
          </li>
         <li>
            <NavLink
              to="/watchlist"
              className={({ isActive }) => (isActive ? "coolie active" : "coolie")}
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "coolie active" : "coolie")}
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/changepw"
              className={({ isActive }) => (isActive ? "coolie active" : "coolie")}
            >
              Account
            </NavLink>
          </li>
          <input type="search" className="search-bar" placeholder="Search Movies" />
        </ul>
      </div>
      <div className="nav-right">
        <button onClick={handlelogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
