import React from 'react';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/landing';
import Mainpage from './components/mainpage';
import ProtectedRoute from './components/ProtectedRoute';
import Description from './components/description';
import Change from './components/changepw';
import History from './components/History';
import Watchlist from './components/watchlist';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <ProtectedRoute><Mainpage /></ProtectedRoute> },
  { path: '/description/:id', element: <Description /> },
  { path: '/changepw', element: <Change /> },
  { path: '/history', element: <ProtectedRoute><History /></ProtectedRoute> },
  { path: '/watchlist', element: <ProtectedRoute><Watchlist /></ProtectedRoute> },
]);

export default router;
