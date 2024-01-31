import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom


function Login() {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  

  const handleLogin = () => {
    if (!regNo || !password) {
      setLoginError('Please enter registration number and password.');
      return;
    }
   
    // Simulate authentication by checking against localStorage
    const storedPassword = localStorage.getItem(regNo);
    

    if (storedPassword && storedPassword === password) {
      // Redirect to faculty page on successful login
      navigate('/home');
    } else {
      setLoginError('Invalid registration number or password.');
    }
    //playWelcomeMessage();
  };


  return (
    <div>
      <nav className="navbar bg-gray-200 overflow-hidden flex justify-between items-center h-16">
        <div className="logo py-2 px-4 ml-4">
          <a href="#" className="text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></a>
        </div>
      </nav>

      <section className="welcome flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-admin">
        <div className="login-container bg-white opacity-80 p-4 rounded-lg shadow-md w-full max-w-md text-center">
          <form id="loginForm">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <label htmlFor="regNo" className="block text-gray-700 mb-2">Registration Number:</label>
            <input type="text" id="regNo" placeholder="Eb1/1234/12" name="regNo" required value={regNo} onChange={(e) => setRegNo(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"/>

            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"/>

            <button type="button" onClick={handleLogin} className="bg-green-500 text-white py-2 px-4 rounded-md w-full">Login</button>
            <p className="error text-red-500 mt-2" id="loginError">{loginError}</p>

            <p className="signup-link mt-4">Don't have an account?<Link to="/signup" className="text-green-500">Sign Up</Link></p>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-4">
        <h3 className="text-center">Quick Links</h3>
        <div className="quicklinks flex justify-center items-center mt-2 gap-6">
          <p><a href="https://www.chuka.ac.ke/" className="text-white hover:border-white border-b-2 border-transparent">Chuka University Website</a></p>
          <p><a href="http://repository.chuka.ac.ke/handle/chuka/622" className="text-white hover:border-white border-b-2 border-transparent">Chuka University Repository</a></p>
          <p><a href="https://portal.chuka.ac.ke/" className="text-white hover:border-white border-b-2 border-transparent">Chuka University Students Portal</a></p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
