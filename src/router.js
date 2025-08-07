import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/landing';
import Signup from './components/signup';
import Login from './components/login';
import Mainpage from './components/mainpage';
import ProtectedRoute from './components/ProtectedRoute';


const AppRouter=()=>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" 
                element={
                <ProtectedRoute>
                <Mainpage/>
                </ProtectedRoute>
}/>
            </Routes>
        </Router>
    );
};
export default AppRouter;