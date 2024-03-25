import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Replace with your Firebase setup (auth only needed for profile update)
import ProfileInfo from './profileinfo';


const Profile = () => {
  const [uploads, setUploads] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  

  useEffect(() => {
    const fetchUserUploads = async () => {
      const user = auth.currentUser;
      if (!user) return; // Handle case where user is not logged in

      const q = query(collection(db, 'uploads'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedUploads = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUploads(fetchedUploads);
    };

    fetchUserUploads();
  }, []);

  const handleClick = (category) => {
    setActiveCategory(category);
  };

  const filteredUploads = () => {
    if (!activeCategory) return uploads; // Show all uploads if no category selected
    return uploads.filter((upload) => upload.category === activeCategory);
  };

  

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-200 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">Chuka <span className="text-orange-500">Repository</span></h1>
      </header>

      <main className="container mx-auto px-4 py-16 flex flex-col space-y-8">
         <ProfileInfo/>
        <section className="flex justify-center mb-4">
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mx-2 ${
              activeCategory === '' && 'bg-gray-300 text-white'
            }`}
            onClick={() => handleClick('')}
          >
            All
          </button>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mx-2 ${
              activeCategory === 'pastpapers' && 'bg-gray-300 text-white'
            }`}
            onClick={() => handleClick('pastpapers')}
          >
            Past Papers
          </button>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mx-2 ${
              activeCategory === 'video' && 'bg-gray-300 text-white'
            }`}
            onClick={() => handleClick('video')} // Changed from 'videos' to 'video'
          >
            Video
          </button>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mx-2 ${
              activeCategory === 'notes' && 'bg-gray-300 text-white'
            }`}
            onClick={() => handleClick('notes')}
          >
            Notes
          </button>
        </section>


        {filteredUploads().length > 0 && (
         <section className="rounded-lg shadow-md overflow-hidden">
         <h2 className={`text-xl font-bold p-4 border-b border-gray-200 text-white ${activeCategory === 'notes' ? 'bg-blue-500' : activeCategory === 'pastpapers' ? 'bg-yellow-500' : activeCategory === 'video' ? 'bg-green-500' : ''}`}>
           {activeCategory === 'notes' ? 'Notes' : activeCategory === 'pastpapers' ? 'Past Papers' : activeCategory === 'video' ? 'Video' : ''}
         </h2>

         <div className="mx-auto">
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4">
    {filteredUploads().map((upload) => (
      <li
        key={upload.id}
        className="flex flex-col items-center rounded-lg bg-slate-400 hover:bg-gray-100 overflow-hidden shadow-md"
      >
        {upload.category === "video" ? (
          <video controls className="w-full h-48 object-cover rounded-t-lg">
            <source src={upload.downloadURL} type="video/mp4" />
            Your browser does not support the video tag or the video format is not supported.
          </video>
        ) : (
          <img src="placeholder.png" alt="Thumbnail" className="w-full h-48 object-cover rounded-t-lg" />
        )}
        <div className="flex flex-col items-center p-4">
          <span className="text-gray-700 hover:text-blue-500 font-medium text-center truncate">
            {upload.title}
          </span>
          <span className="text-sm text-gray-500 text-center">{upload.category}</span>
        </div>
      </li>
    ))}
  </ul>
</div>

       </section>
        )}
      </main>
    </div>
  );
};

export default Profile;

