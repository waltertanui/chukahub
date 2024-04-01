import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have Firebase config in a separate file
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth
import { FaArrowLeft, FaThumbsUp, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { auth, storage } from '../firebase'; // Make sure firebase setup is correct

const Videos = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [userLikedVideos, setUserLikedVideos] = useState([]); // State to track user liked videos
  const [profileData, setProfileData] = useState({ name: '', profileImageUrl: '' }); // State to store user profile data

  useEffect(() => {
    fetchProfileData(); // Fetch user profile data when component mounts
    fetchData();
    fetchUserLikedVideos(); // Fetch user liked videos when component mounts
  }, [selectedFaculty, selectedDepartment, selectedYear]);

  // Fetch user profile data from Firebase
  const fetchProfileData = async () => {
    const user = auth.currentUser;
    if (!user) return;
  
    const profileRef = collection(db, 'profiles'); // Use collection instead of doc
    const q = query(profileRef, where('userId', '==', user.uid)); // Construct a query
    const snapshot = await getDocs(q);
  
    if (snapshot.empty) {
      console.log("No profile document found");
      return;
    }
  
    const data = snapshot.docs[0].data(); // Assuming there's only one profile document per user
    console.log("Fetched profile data:", data);
    setProfileData(data);
  };

  // Fetch user liked videos from Firestore
  const fetchUserLikedVideos = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userLikedVideosRef = collection(db, 'userLikedVideos');
      const q = query(userLikedVideosRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const userLikedVideosData = snapshot.docs.map(doc => doc.data().videoId);
      setUserLikedVideos(userLikedVideosData);
    }
  };

  const fetchData = async () => {
    if (selectedFaculty && selectedDepartment && selectedYear) {
      const uploadsRef = collection(db, 'uploads');
      const q = query(
        uploadsRef,
        where('category', '==', 'video'), // Filter by category
        where('faculty', '==', selectedFaculty), // Filter by faculty
        where('department', '==', selectedDepartment), // Filter by department
        where('year', '==', selectedYear) // Filter by year
      );

      const snapshot = await getDocs(q);

      const fetchedUploads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        likes: doc.data().likes || 0, // Default likes to 0 if not present
        comments: doc.data().comments || 0, // Default comments to 0 if not present
      }));

      setUploads(fetchedUploads);
    }
  };

  const handleGetVideos = () => {
    fetchData();
  };

  const handleLike = async (uploadId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && !userLikedVideos.includes(uploadId)) {
      const uploadRef = doc(db, 'uploads', uploadId);
      await updateDoc(uploadRef, {
        likes: uploads.find(upload => upload.id === uploadId).likes + 1
      });

      // Add user liked video to Firestore
      await addDoc(collection(db, 'userLikedVideos'), {
        userId: user.uid,
        videoId: uploadId
      });

      // Refresh data after update
      fetchData();
      fetchUserLikedVideos(); // Fetch user liked videos again
    }
  };

  const handleComment = async (uploadId) => {
    const uploadRef = doc(db, 'uploads', uploadId);
    await updateDoc(uploadRef, {
      comments: uploads.find(upload => upload.id === uploadId).comments + 1
    });
    // Refresh data after update
    fetchData();
  };

  return (
    <div className='bg-gray-900'>
      <div className="navbar bg-gray-200 overflow-hidden flex justify-between items-center h-16 w-full">
        <div className="flex items-center">
          <Link to="/home" className="mr-4">
            <FaArrowLeft className="text-black w-6 h-6" />
          </Link>
          <div className="logo py-2 px-4 ml-4 text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></div>
        </div>
      </div>
      <div className="p-4 md:p-8 ">
        <h2 className="text-2xl mb-2 md:mb-4 font-serif text-center text-white">Videos</h2>
        <div className="p-2 md:p-2 bg-gray-900  justify-center rounded-md">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className='p-4 md:p-16 bg-slate-400 w-full md:w-1/2 rounded-md'>
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <label htmlFor="faculty" className="block mb-1 text-white md:w-40">Select Faculty:</label>
                <select
                  id="faculty"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full md:w-40"
                >
                  <option className='text-center font-serif' value="">Faculty</option>
                  <option value="Science">Science</option>
                  <option value="Law">Law</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Business">Business</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Education">Education</option>
                  <option value="Agriculture">Agriculture</option>
                </select>
              </div>
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <label htmlFor="department" className="block mb-1 text-white md:w-40">Select Department:</label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full md:w-40"
                >
                  <option value="">Department</option>
                  {selectedFaculty === 'Science' && (
                    <>
                      <option value="Computer Science">Computer Science</option>
                      <option value="IT">IT</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Mathematics">Mathematics</option>
                    </>
                  )}
                  {selectedFaculty === 'Law' && <option value="Law">Law</option>}
                  {selectedFaculty === 'Humanities' && (
                    <>
                      <option value="Criminology">Criminology</option>
                      <option value="Environment">Environment</option>
                      <option value="Sociology">Sociology</option>
                    </>
                  )}
                </select>
              </div>
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <label htmlFor="year" className="block mb-1 text-white md:w-40">Select Year:</label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full md:w-40"
                >
                  <option value="">Year</option>
                  <option value="1.1">1.1</option>
                  <option value="1.2">1.2</option>
                  <option value="2.1">2.1</option>
                  <option value="2.2">2.2</option>
                  <option value="3.1">3.1</option>
                  <option value="3.2">3.2</option>
                  <option value="4.1">4.1</option>
                  <option value="4.2">4.2</option>
                </select>
              </div>
              <button onClick={handleGetVideos} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-blue-600 transition duration-300">
                Get Videos
              </button>
            </div>
          </div>

          <div className="p-4 flex  flex-wrap md:w-full gap-4">
            {uploads.length > 0 ? (
              uploads.map((upload) => (
                <div key={upload.id} className="mb-4 md:w-1/2 md:flex-row">
                  <div className="border border-gray-900 rounded-md bg-slate-200">
                    <video controls className='w-full rounded-t-md'>
                      <source src={upload.downloadURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="p-4">
                    <div className='flex'>
                      {profileData && profileData.profileImageUrl ? (
                        <img src={profileData.profileImageUrl} alt='profile' className='h-10 w-10 rounded-md'/>
                      ) : (
                        <div className='h-10 w-10 rounded-md bg-gray-300'></div>
                      )}
                        <p className='m-2 mt-0 text-gray-600'>{profileData?.name ? profileData.name : 'Anonymous'}</p>
                      </div>

                      <div className='flex gap-10 mt-4'>
                        <p className='flex gap-2' onClick={() => handleLike(upload.id)}><FaThumbsUp /> {upload.likes} Likes</p>
                        <p className='flex gap-2' onClick={() => handleComment(upload.id)}><FaComments /> {upload.comments} Comments</p>
                      </div>

                      <h3 className="text-xl mb-2">{upload.title}</h3>
                      <p className="mb-2">{upload.description}</p>
                      <a href={upload.downloadURL} className="text-blue-500 hover:underline">Download</a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-4 text-green-400">No videos found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;



