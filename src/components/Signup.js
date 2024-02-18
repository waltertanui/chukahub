import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import essential Firebase modules
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

function Signup() {
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError('');

    try {
      // Form validation:
      if (!regNo || !email || !password) {
        throw new Error('Please fill in all required fields: registration number, email, and password.');
      }

      // Firebase user creation:
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore user data storage:
      const userRef = collection(db, 'users');
      await addDoc(userRef, { regNo, email });

      console.log('User created successfully:', user);

      // Navigate to home page:
      navigate('/home');
    } catch (error) {
      console.error('Error creating user:', error.message);
      setError(error.message);
    }
  };

  return (
    <div
      className="bg-gray-100 flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(http://codingstella.com/wp-content/uploads/2024/01/download-6-scaled.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="signup-container bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-lg font-bold mb-4 text-white">Sign Up</h2>
        <label htmlFor="regNo" className="block text-gray-700 mb-2">
          Registration Number:
        </label>
        <input
          type="text"
          id="regNo"
          placeholder="eb1/12345/00"
          name="regNo"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <button type="button" onClick={handleSignUp} className="bg-green-500 text-white py-2 px-4 rounded-md w-full">
          Sign Up
        </button>

        {error && <p className="error text-red-500 mt-2">{error}</p>}

        <p className="signup-link mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-green-500 ">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;




