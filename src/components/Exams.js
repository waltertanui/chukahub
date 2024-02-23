import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have Firebase config in a separate file
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf'; // Import from react-pdf library

const Exams = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [numPages, setNumPages] = useState(null); // For PDF pages count

  useEffect(() => {
    fetchData();
  }, [selectedFaculty, selectedDepartment, selectedYear]);

  const fetchData = async () => {
    if (selectedFaculty && selectedDepartment && selectedYear) {
      const uploadsRef = collection(db, 'uploads');
      const q = query(
        uploadsRef,
        where('category', '==', 'pastpapers'), // Filter by category
        where('faculty', '==', selectedFaculty), // Filter by faculty
        where('department', '==', selectedDepartment), // Filter by department
        where('year', '==', selectedYear) // Filter by year
      );

      const snapshot = await getDocs(q);

      const fetchedUploads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUploads(fetchedUploads);
    }
  };

  const handleGetPapers = () => {
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
      <div className="uploads-container p-4 md:p-8">
        <h2 className="text-2xl mb-2 md:mb-4 font-serif text-center text-white">Past Papers</h2>
        <div className="p-4 md:p-30 bg-gray-900 justify-center rounded-md">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className='p-4 md:p-16 bg-slate-400 w-full md:w-1/2'>
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <label htmlFor="faculty" className="block mb-1 text-white md:w-40">Select Faculty:</label>
                <select
                  id="faculty"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full md:w-40"
                >
                  <option value="">Faculty</option>
                  <option value="Science">Science</option>
                  <option value="Law">Law</option>
                  <option value="Humanities">Humanities</option>
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
              <button onClick={handleGetPapers} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-blue-600 transition duration-300">
                Get Past Papers
              </button>
            </div>
          </div>

          <div className="p-4 md:p-24 w-full md:w-1/2 mt-4 rounded-md flex flex-col md:flex-row gap-8">
            {uploads.length > 0 ? (
              uploads.map((upload) => (
                <div key={upload.id} className="mb-4 border border-gray-300 p-4 md:p-10 rounded-md bg-slate-200 flex flex-col">
                  <Document
                     file={upload.downloadURL}
                     onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                      <Page pageNumber={1} width={150} />
                  </Document>
                  <h3 className="text-xl mb-2">{upload.title}</h3>
                  <p className="mb-2">{upload.description}</p>
                  <div className="flex gap-2">
                    <p className="mb-2 flex">Faculty: {upload.faculty}</p>
                    <p className="mb-2 flex">Department: {upload.department}</p>
                    <p className="mb-2 flex">Year: {upload.year}</p>
                  </div>
                  <a href={upload.downloadURL} className="text-blue-500 hover:underline">Download</a>
                </div>
              ))
            ) : (
              <p className="mt-4 text-green-400">No past papers found.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Exams;



