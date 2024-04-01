import React from 'react';
import { FaUpload } from 'react-icons/fa'; // Import the upload icon from React Icons
import { FaUser } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <header className="bg-gray-300 text-white shadow-md flex md:flex-row items-center py-2 md:py-4 px-4 md:px-6 gap-8">
  <div className="flex gap-4 items-center  md:gap-6 w-full ">
    <img src="/logo192.png" alt="logo" className="h-12 w-12 rounded-md mx-auto mx-0 mb-2 md:mb-0" />
    <div className="text-lg md:text-xl font-bold md:text-left">Chuka <span className="text-red-400">Repository</span></div>
  </div>
  <div className="flex items-center mt-2 md:mt-0 ml-auto gap-8 md:gap-24">
    <FaUpload className="cursor-pointer mr-2 md:mr-4" onClick={handleUploadClick} />
    <FaUser className="w-8 h-8 rounded-full cursor-pointer" onClick={handleProfileClick} />
  </div>
</header>










      <main className="container mx-auto py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-serif text-center mb-4 text-white">Welcome to Chuka Repository</h1>
        <p className="text-lg mb-8 text-white">Knowledge is wealth</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigate('/notes')}
            className="bg-blue-600 rounded-md p-4 text-white hover:bg-blue-900 transition duration-300"
          >
            Get Notes
          </button>
          <button
            onClick={() => handleNavigate('/exams')}
            className="bg-blue-600 rounded-md p-4 text-white hover:bg-blue-900 transition duration-300"
          >
            Get Past Papers
          </button>
          {/*<button
            onClick={() => handleNavigate('/quizes')}
            className="bg-blue-600 rounded-md p-4 text-white hover:bg-blue-900 transition duration-300"
          >
            Get CATs
  </button>*/}
          <button
            onClick={() => handleNavigate('/videos')}
            className="bg-blue-600 rounded-md border-spacing-2 border-white p-4 text-white hover:bg-blue-900 transition duration-300"
          >
            Get Videos
          </button>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-4 px-6 text-center fixed bottom-0 w-full">
        <p>
          © 2024 Chuka Repository. All rights reserved. | <span>Designed by Walter</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;


