import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; 
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './components/Profile';
import Topic from './pages/Topic';
//import CreateATopic from './components/CreateATopic';
import Home from './components/Home';
import EditEntry from './pages/EditEntry';
import EditTopic from './pages/EditTopic';


function App() {

  return (
    <div className="App">
    <Navbar />
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/topic/:id' element={<Topic />} />
      {/* <Route path='/topic/:id' element={<CreateATopic />} /> */}
      <Route path='/' element={<Home />} />
      <Route path='/entry/edit/:id' element={<EditEntry />} />
      <Route path='/topic/edit/:id' element={<EditTopic />} />
    </Routes>
    </div>
  );
}

export default App;
