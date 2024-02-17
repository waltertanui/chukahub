import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import the Firebase auth module

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Firebase authentication with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Assuming successful login, navigate to home page
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-admin" style={{ backgroundImage: "url(http://codingstella.com/wp-content/uploads/2024/01/download-6-scaled.jpeg)" }}>
      <section className="welcome flex justify-center items-center h-screen">
        <div className="login-container bg-gray-600 opacity-80 p-4 rounded-lg shadow-md w-full max-w-md text-center">
          <form id="loginForm">
            <h2 className="text-lg font-bold mb-4 text-white">Login</h2>
            <label htmlFor="email" className="block text-gray-700 mb-2 text-white">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
            />
            <label htmlFor="password" className="block text-gray-700 mb-2 text-white">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
            />
            <button type="button" onClick={handleLogin} className="bg-green-500 text-white py-2 px-4 rounded-md w-full">Login</button>
            <p className="error text-red-500 mt-2" id="loginError">{loginError}</p>
            <p className="signup-link mt-4 text-white">Don't have an account?<Link to="/signup" className="text-green-500 ">Sign Up</Link></p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;


