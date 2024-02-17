import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Assuming you have set up Firebase configuration and exported the Firestore instance as 'db'

function Profile() {
    const navigate = useNavigate();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isEditingCover, setIsEditingCover] = useState(false);
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [activeContent, setActiveContent] = useState('videos');
    const [coverImage, setCoverImage] = useState('/admin.JPG');
    const [profilePhoto, setProfilePhoto] = useState('/admin.JPG');
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('the greatest');
    const [videos, setVideos] = useState([
        { id: 1, title: 'Video 1', url: 'url_to_video_1' },
        { id: 2, title: 'Video 2', url: 'url_to_video_2' },
    ]);
    const [pastPapers, setPastPapers] = useState([]);
    const [cats, setCats] = useState([
        { id: 1, title: 'cat 1', url: 'url_to_past_paper_1' },
        { id: 2, title: 'cat 2', url: 'url_to_past_paper_2' },
    ]);
    const [notes, setNotes] = useState([
        { id: 1, title: 'notes 1', url: 'url_to_past_paper_1' },
        { id: 2, title: 'notes 2', url: 'url_to_past_paper_2' },
        { id: 2, title: 'notes 2', url: 'url_to_past_paper_2' },
        { id: 2, title: 'notes 2', url: 'url_to_past_paper_2' },
    ]);

    useEffect(() => {
        const fetchPastPapers = async () => {
            try {
                const pastPapersSnapshot = await db.collection('pastPapers').get();
                const pastPapersData = pastPapersSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, title: data.title }; // Assuming the title field exists in your documents
                });
                setPastPapers(pastPapersData);
            } catch (error) {
                console.error('Error fetching past papers:', error);
            }
        };

        fetchPastPapers();
    }, []);

    const handleNameEdit = () => {
        setIsEditingName(!isEditingName);
    };

    const handleBioEdit = () => {
        setIsEditingBio(!isEditingBio);
    };

    const handleCoverEdit = () => {
        setIsEditingCover(!isEditingCover);
    };

    const handlePhotoEdit = () => {
        setIsEditingPhoto(!isEditingPhoto);
    };

    const handleContentChange = (content) => {
        setActiveContent(content);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            {/* Cover Image */}
            <div className="h-40 bg-cover bg-center rounded-t-lg relative" style={{ backgroundImage: `url(${coverImage})` }}>
                {isEditingCover && (
                    <button className="absolute top-2 right-2 bg-blue-500 text-black px-2 py-1 rounded" onClick={handleCoverEdit}>Save</button>
                )}
            </div>

            {/* Profile Photo */}
            <div className="h-32 w-32 rounded-full overflow-hidden mx-auto -mt-16 border-4 border-white shadow-md relative">
                <img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                {isEditingPhoto && (
                    <button className="absolute bottom-2 right-2 bg-blue-500 text-black px-2 py-1 rounded" onClick={handlePhotoEdit}>Save</button>
                )}
            </div>

            {/* Profile Name */}
            <div className="text-center mt-4">
                {isEditingName ? (
                    <input type="text" className="text-2xl font-bold border-b border-gray-400 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                    <h2 className="text-2xl font-bold">{name}</h2>
                )}
                <button className="text-blue-500 mt-1" onClick={handleNameEdit}>{isEditingName ? 'Cancel' : 'Edit'}</button>
            </div>

            {/* Bio */}
            <div className="text-center mt-2 px-4">
                {isEditingBio ? (
                    <textarea className="border border-gray-400 p-2 focus:outline-none" value={bio} onChange={(e) => setBio(e.target.value)} />
                ) : (
                    <p className="text-gray-600">{bio}</p>
                )}
                <button className="text-blue-500 mt-1" onClick={handleBioEdit}>{isEditingBio ? 'Cancel' : 'Edit'}</button>
            </div>

            <div className="p-4 flex justify-between">
                <button
                    className={`bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300 ${activeContent === 'videos' ? 'active' : ''}`}
                    onClick={() => handleContentChange('videos')}
                >
                    Videos
                </button>
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${activeContent === 'pastPapers' ? 'active' : ''}`}
                    onClick={() => handleContentChange('pastPapers')}
                >
                    Past Papers
                </button>
                <button
                    onClick={() => handleContentChange('notes')}
                    className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ${activeContent === 'notes' ? 'active' : ''}`}
                >
                    Notes
                </button>
                <button
                    className={`bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300 ${activeContent === 'cats' ? 'active' : ''}`}
                    onClick={() => handleContentChange('cats')}
                >
                    CATs
                </button>
            </div>

            {/* Section to show content based on active category */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="mt-8 grid grid-cols-2 gap-4">
                    {activeContent === 'videos' && videos.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded overflow-hidden shadow-md">
                            <div className="h-40 bg-gray-200"></div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>
                        </div>
                    ))}

                    {activeContent === 'pastPapers' && pastPapers.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded overflow-hidden shadow-md">
                            <div className="h-40 bg-gray-200"></div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>
                        </div>
                    ))}

                    {activeContent === 'cats' && cats.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded overflow-hidden shadow-md">
                            <div className="h-40 bg-gray-200"></div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>
                        </div>
                    ))}

                    {activeContent === 'notes' && notes.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded overflow-hidden shadow-md">
                            <div className="h-40 bg-gray-200"></div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;

