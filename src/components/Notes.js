import React, { useState } from 'react';

function Notes() {
  // State hooks for selected filters
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [pdfCards, setPdfCards] = useState([]);

  // Mapping between faculties and their corresponding departments
  const facultyDepartments = {
    'Science': ['Computer Science', 'IT', 'Electrical', 'Mechanical'],
    'Law': ['Law'],
    'Humanities': ['Criminology', 'Environment', 'Sociology']
    // Add more faculties and their departments as needed
  };

  // Function to update departments based on the selected faculty
  const updateDepartments = (event) => {
    const faculty = event.target.value;
    setSelectedFaculty(faculty);
    setSelectedDepartment('');
    setSelectedYear('');
    setPdfCards([]);
  };

  // Function to apply filters and update PDF cards
  const applyFilters = () => {
    const filteredCards = document.querySelectorAll('.pdf-card');
    const filteredPdfCards = Array.from(filteredCards).filter((card) => {
      const cardFaculty = card.getAttribute('data-faculty');
      const cardDepartment = card.getAttribute('data-department');
      const cardYear = card.getAttribute('data-year');

      const facultyMatch = selectedFaculty === '' || selectedFaculty === cardFaculty;
      const departmentMatch = selectedDepartment === '' || selectedDepartment === cardDepartment;
      const yearMatch = selectedYear === '' || selectedYear === cardYear;

      return facultyMatch && departmentMatch && yearMatch;
    });
    setPdfCards(filteredPdfCards);
  };

  return (
    <div className="h-screen bg-cover bg-center items-center flex flex-col">
      <div className="navbar bg-gray-200 overflow-hidden flex justify-between items-center h-16 w-full">
        <div className="logo py-2 px-4 ml-4 text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></div>
      </div>

      
     <div className=" justify-center w-full bg-gray-900">
     <header className="w-full flex justify-center mt-4">
        <h1 className="text-3xl text-white font-serif">Find all the Notes</h1>
      </header>
      <form id="filterForm" className="bg-gray-200 p-16 mt-8 rounded-lg shadow-lg mb-8 flex flex-wrap justify-between">
        {/* Faculty select */}
        <select id="faculty" name="faculty" onChange={updateDepartments} className="block w-1/4 p-2 border border-gray-300 rounded-md mb-4">
          <option value="">All</option>
          <option value="Science">Science</option>
          <option value="Humanities">Humanities</option>
          <option value="Law">Law</option>
          {/* Add more options as needed */}
        </select>

        {/* Department select */}
        <select id="department" name="department" className="block w-1/4 p-2 border border-gray-300 rounded-md mb-4">
          <option value="">All</option>
          {facultyDepartments[selectedFaculty]?.map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </select>

        {/* Year select */}
        <select id="year" name="year" className="block w-1/4 p-2 border border-gray-300 rounded-md mb-4">
          <option value="">All</option>
          <option value="1.1">1.1</option>
          <option value="1.2">1.2</option>
          {/* Add more options as needed */}
        </select>

        {/* Get Notes button */}
        <button type="button" onClick={applyFilters} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-1/4">
          Get Notes
        </button>
      </form>
      </div>
      {/* Error message */}
      <div className="error-message text-red-500 font-bold mb-4 hidden" id="errorMessage">No PDFs found for your selection</div>

      {/* PDF cards */}
      <div className="container flex flex-wrap justify-center gap-4" id="pdfContainer">
        {pdfCards.map((card, index) => (
          <div key={index} className="pdf-card" data-faculty={card.getAttribute('data-faculty')} data-department={card.getAttribute('data-department')} data-year={card.getAttribute('data-year')}>
            {card.innerHTML}
          </div>
        ))}
      </div>

      <footer className="text-center text-white mt-10">
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Notes;
