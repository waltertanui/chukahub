import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen  bg-gray-400 flex-col">
      <div className="navbar bg-gray-200 overflow-hidden flex justify-between items-center h-16">
        <div className="logo py-2 px-4 ml-4 text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></div>
        <div className="px-6"onClick={() => handleNavigate('/profile')} >
            <img src="/admin.JPG"
                 className="w-10 h-10 rounded-full"
                 alt='profile'
            />
            <span>walter</span>
        </div>
      </div>
     <div className=' '>
      <div className="container mx-auto mt-20 flex flex-col items-center">
        <div className="header text-3xl font-bold mb-4">Welcome to Chuka Repository</div>
        <div className="subheader text-lg mb-8">Knowledge is wealth</div>

        <div className="button-container flex flex-wrap justify-center gap-4">
          <button onClick={() => handleNavigate('/notes')} className="bg-blue-600 rounded-sm p-4 text-white hover:bg-blue-900">Get Notes</button>
          <button onClick={() => handleNavigate('/exams')} className="bg-blue-600 rounded-sm p-4 text-white hover:bg-blue-900 ">Get Past Papers</button>
          <button onClick={() => handleNavigate('/quizes')} className="bg-blue-600 rounded-sm p-4 text-white hover:bg-blue-900 ">Get CATs</button>
          <button onClick={() => handleNavigate('/videos')} className="bg-blue-600 rounded-sm p-4 text-white hover:bg-blue-900">Get Videos</button>
        </div>
      </div>
      </div>
      <footer className="bg-gray-900 text-white py-4 text-center fixed bottom-0 w-full">
        <p>&copy; 2023 Chuka OpenAi. All rights reserved.|<a href="https://thikahighschool.com/peterportfolio.html">Designed by Walter</a> </p>
      </footer>
    </div>
  );
}

export default Home;
