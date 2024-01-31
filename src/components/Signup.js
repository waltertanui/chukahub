import React, {useState}from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSignUp = () => {
        setError('');

        // Check if fields are empty
        if (!regNo || !password) {
            setError('Please enter registration number and password.');
            return;
        }

        // Simulate user existence check (you might use a backend for this)
        if (localStorage.getItem(regNo)) {
            setError('Registration number already exists. Please choose a different one.');
            return;
        }

        // Store signup details in localStorage
        localStorage.setItem(regNo, password);
         navigate('/home')
        // Redirect to another page on successful signup
        //window.location.href = 'game.html'; // You might want to change this.
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="signup-container bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-lg font-bold mb-4">Sign Up</h2>
                <label htmlFor="regNo" className="block text-gray-700 mb-2">Registration Number:</label>
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

                <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                />

                <button
                    type="button"
                    onClick={handleSignUp}
                    className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                >
                    Sign Up
                </button>
                {error && <p className="error text-red-500 mt-2">{error}</p>}

                <p className="signup-link mt-4">Already have an account? <a href="project2.html" className="text-green-500">Login</a></p>
            </div>
        </div>
    );
}


export default Signup