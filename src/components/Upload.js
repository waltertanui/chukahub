import React, { useState } from 'react';
import { storage, db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const facultyDepartments = {
        'Science': ['Computer Science', 'IT', 'Electrical', 'Mechanical', 'Mathematics'],
        'Law': ['Law'],
        'Humanities': ['Criminology', 'Environment', 'Sociology']
    };

    const updateDepartments = (event) => {
        const faculty = event.target.value;
        setSelectedFaculty(faculty);
        setSelectedDepartment('');
        setSelectedYear('');
    };

    const updateYears = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile || !selectedCategory || !title || !description || !selectedDepartment || !selectedYear) {
            console.error('Please fill out all fields.');
            return;
        }

        try {
            setLoading(true); // Set loading to true when upload starts
            const storageRef = ref(storage, `uploads/${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            const downloadURL = await getDownloadURL(storageRef);
            const userId = auth.currentUser.uid;

            const uploadRef = collection(db, 'uploads');
            await addDoc(uploadRef, {
                userId: userId,
                downloadURL,
                category: selectedCategory,
                faculty: selectedFaculty,
                department: selectedDepartment,
                year: selectedYear,
                title: title,
                description: description
            });

            toast.success('File uploaded successfully');
            clearForm();
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file');
        } finally {
            setLoading(false); // Set loading to false after upload completes
        }
    };

    const clearForm = () => {
        setSelectedFaculty('');
        setSelectedDepartment('');
        setSelectedYear('');
        setSelectedCategory('');
        setSelectedFile(null);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="h-screen bg-cover bg-center items-center flex flex-col bg-gray-900">
            <ToastContainer />
            <div className="navbar bg-gray-200 overflow-hidden flex justify-between items-center h-16 w-full">
                <div className="logo py-2 px-4 ml-4 text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></div>
            </div>

            <div className="justify-center w-full bg-gray-900 flex">
                <div className='w-full md:w-1/2'>
                    <h1 className="text-3xl text-white mb-4 text-center font-bold">Upload Documents</h1>
                    <form id="filterForm" className="bg-gray-500 p-6 mt-8 rounded-lg shadow-lg mb-8 flex flex-wrap items-center justify-center ">
                        <select id="faculty" name="faculty" onChange={updateDepartments} className="block w-full p-2 border border-gray-300 rounded-md mb-4">
                            <option value="">Faculty</option>
                            <option value="Science">Science</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Law">Law</option>
                        </select>

                        <select id="department" name="department" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-md mb-4">
                            <option value="">Department</option>
                            {facultyDepartments[selectedFaculty]?.map((department, index) => (
                                <option key={index} value={department}>{department}</option>
                            ))}
                        </select>

                        <select id="year" name="year" value={selectedYear} onChange={updateYears} className="block w-full p-2 border border-gray-300 rounded-md mb-4">
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

                        <select id="category" name="category" onChange={handleCategoryChange} className="block w-full p-2 border border-gray-300 rounded-md mb-4">
                            <option value="">Select Category</option>
                            <option value="video">Video</option>
                            <option value="pastpapers">Past Papers</option>
                            <option value="notes">Notes</option>
                            <option value="cats">Cats</option>
                        </select>

                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            className="block w-full p-2 border border-gray-300 rounded-md mb-4" 
                        />

                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <textarea 
                            placeholder="Description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
                        ></textarea>

                        <button 
                            type="button" 
                            onClick={handleUpload} 
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Upload;


