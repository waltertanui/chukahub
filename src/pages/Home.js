import React from 'react';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <header className="bg-gray-200 py-4 px-6 flex items-center justify-between sm:px-8">
        <img src='/logo192.png' alt='logo' className='h-12 w-12 rounded-md'/>
        <div className="text-xl font-bold text-black">Chuka <span className="text-orange-500">Repository</span></div>
        <div className="flex items-center">
          <FaUpload
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => handleNavigate('/upload')}
          />
         <div className="ml-3 flex items-center">
            <img
              src="/admin.JPG"
              className="w-10 h-10 rounded-full"
              alt="profile"
              onClick={()=> handleNavigate('/profile')}
            />
            
             </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Welcome to Chuka Repository</h1>
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
          <button
            onClick={() => handleNavigate('/quizes')}
            className="bg-blue-600 rounded-md p-4 text-white hover:bg-blue-900 transition duration-300"
          >
            Get CATs
          </button>
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
          © 2023 Chuka OpenAi. All rights reserved. | <span>Designed by schoolr</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;


