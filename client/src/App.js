import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './components/Profile';
import Topic from './pages/Topic';
import TopicPopUp from './components/TopicPopUp';
import Home from './components/Home';



function App() {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
      axios.get('/api/topic/gettopics')
      .then(response => {
         // console.log(response)
          setTopics(response.data.allTopics)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
    <h1>Outdoor Dictionary</h1>
    <Navbar />
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/topic/:id' element={<Topic />} />
      {/* <Route path='/topic/:id' element={<TopicPopUp />} /> */}
      <Route path='/' element={<Home topics={topics} setTopics={setTopics} />} />
    </Routes>
    </div>
  );
}

export default App;
