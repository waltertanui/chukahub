import React, { useState, useEffect } from "react";
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase'; // Make sure firebase setup is correct

function ProfileInfo() {
  // New state for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    course: '',
    profileImageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);

  // Function to fetch profile data from Firebase
  const fetchProfileData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const profileRef = doc(db, 'profiles', user.uid);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      const data = profileSnap.data();
      setProfileData(data);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle edit profile button click
  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
  };

  // Handle profile data change
  const handleProfileChange = (event) => {
    setProfileData({ ...profileData, [event.target.name]: event.target.value });
  };

  // Handle profile image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  // Handle profile update
  const handleProfileUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const user = auth.currentUser;
    if (!user) return;

    // If there's a new image, upload it first
    if (imageFile) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      setProfileData({ ...profileData, profileImageUrl: imageUrl });
    }

    const profileRef = doc(db, 'profiles', user.uid);

    // Check if the document exists before updating
    const profileDoc = await getDoc(profileRef);
    if (profileDoc.exists()) {
      // Document exists, update it
      await updateDoc(profileRef, profileData);
    } else {
      // Document doesn't exist, create it
      await setDoc(profileRef, profileData);
    }

    setIsEditingProfile(false); // Close edit form
  };

  return (
    <div>
      <section className="flex flex-col items-center">
        {isEditingProfile ? (
          <form onSubmit={handleProfileUpdate} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              placeholder="Name"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="course"
              value={profileData.course}
              onChange={handleProfileChange}
              placeholder="Course"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold">
              Save Profile
            </button>
            <button
              type="button" // Use type="button" to prevent form submission
              onClick={() => setIsEditingProfile(false)}
              className="text-gray-500 hover:text-blue-500 underline"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            {profileData.profileImageUrl && <img src={profileData.profileImageUrl} alt="Profile Picture" className="w-32 h-32 rounded-full border border-gray-200 mb-4" />}
            <h2 className="text-xl font-bold text-white">{profileData.name}</h2>
            <p className="text-gray-500 mb-4">{profileData.course}</p>
            <button onClick={handleEditProfileClick} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold">Edit Profile</button>
          </>
        )}
      </section>
    </div>
  );
}

export default ProfileInfo;

