import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Exams from './components/Exams';
import Notes from './components/Notes';
import Quizzes from './components/Quizes';
import Videos from './components/Videos';
import Profile from './components/Profile';
import Upload from './components/Upload';
import { auth } from './firebase'; // Import Firebase authentication module

function App() {
  const [user, setUser] = useState(null); // State to hold user authentication status

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        {/* Protected Routes */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/exams"
          element={user ? <Exams /> : <Navigate to="/" />}
        />
        <Route
          path="/notes"
          element={user ? <Notes /> : <Navigate to="/" />}
        />
        <Route
          path="/quizes"
          element={user ? <Quizzes /> : <Navigate to="/" />}
        />
        <Route
          path="/videos"
          element={user ? <Videos /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={user ? <Upload /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;


