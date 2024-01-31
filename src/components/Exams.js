import React, { useState } from 'react';

function Exams() {
  // State hooks for filters
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');

  // State hook for PDF cards
  const [pdfCards, setPdfCards] = useState([]);

  // Event handler for applying filters
  const applyFilters = () => {
    // Logic to filter PDF cards based on selected filters
    // Update the state of filtered PDF cards
  };

  return (
    <div className="h-screen top-0 bg-cover bg-center flex  flex-col items-center ">
         <div className=" bg-gray-200 overflow-hidden flex justify-between items-center h-16 w-full">
           <div className="logo py-2 px-4 ml-4 text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></div>
        </div>
      <div className=" flex justify-center w-full bg-gray-900">
      <form className="bg-white p-8  mt-8 rounded-lg shadow-lg mb-8">
        <label htmlFor="faculty" className="block text-gray-700 font-bold mb-2">Faculty:</label>
        <select 
          id="faculty" 
          name="faculty" 
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        >
          <option value="">All</option>
          <option value="Science">Science</option>
          <option value="Humanities">Humanities</option>
          <option value="Law">Law</option>
          <option value="Education">Education</option>
          <option value="Enviromental Sciences">Enviromental Sciences</option>
          <option value="School of Nursing">School of Nursing</option>
          <option value="Business">Business</option>
        </select>

        <label htmlFor="department" className="block text-gray-700 font-bold mb-2">Department:</label>
        <select 
          id="department" 
          name="department" 
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All</option>
          {/* Add options dynamically */}
        </select>

        <label htmlFor="year" className="block text-gray-700 font-bold mb-2">Year:</label>
        <select 
          id="year" 
          name="year" 
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All</option>
          <option value="1.1">1.1</option>
          <option value="1.2">1.2</option>
          <option value="2.1">2.1</option>
          <option value="2.2">2.2</option>
          <option value="3.1">3.1</option>
          <option value="3.2">3.2</option>
          <option value="4.1">4.1</option>
          <option value="4.2">4.2</option>
        </select>

        <button type="button" onClick={applyFilters} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
          Get Exams
        </button>
      </form>
      </div>
      <div className="error-message text-red-500 font-bold mb-4 hidden" id="errorMessage">No PDFs found for your selection</div>

      <div className="container flex flex-wrap justify-center gap-4" id="pdfContainer">
        {/* Render PDF Cards here */}
      </div>
    </div>
  );
}

export default Exams;
