import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import './main.css';
function Mainpage(){
     const { user,logout } = useContext(AuthContext);
    const navigate=useNavigate();
    const handlelogout=()=>{
        logout();
        navigate('/login')
    }

    return(
<nav className="navbar">
    <div className="nav-left">
    <ul className="nav-list">
    <li className="sized">{user.name}'s TV</li>
    <li className="coolie">Home</li>
    <li className="coolie">Watchlist</li>
    <li className="coolie">History</li>
    <li className="coolie">Account</li>
    </ul>
    </div>
<div className="nav-right">
        <button onClick={handlelogout}>Logout</button>
      </div>
</nav>
    );
};
export default Mainpage;