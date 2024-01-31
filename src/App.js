import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Exams from './components/Exams';
import Notes from './components/Notes';
import Quizes from './components/Quizes';
import Videos from './components/Videos';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

