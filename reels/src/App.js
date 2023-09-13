
import './App.css';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import {  BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import React, {component} from 'react';
import Feed from './Components/Feed';
import Profile from './Components/Profile';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
    <Route path='/login' element={<LogIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    
    <Route element={<PrivateRoute/>}/>
    <Route path='/profile/:id' element={<Profile/>}/>
    <Route exact path='/' element={<Feed/>}/>
      
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
