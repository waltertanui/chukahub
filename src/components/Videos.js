import React, { useState } from 'react';

function Videos() {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [videoCards, setVideoCards] = useState([]);

  const facultyDepartments = {
    'Science': ['Computer Science', 'IT', 'Electrical', 'Mechanical'],
    'Humanities': ['Criminology', 'Environment', 'Sociology', 'History'],
    // Add more faculties and their departments as needed
  };

  const updateDepartments = (event) => {
    const faculty = event.target.value;
    setSelectedFaculty(faculty);
    setSelectedDepartment('');
    setSelectedYear('');
    setVideoCards([]);
  };

  const applyFilters = () => {
    const filteredVideoCards = document.querySelectorAll('.video-card');
    const filteredCards = Array.from(filteredVideoCards).filter((card) => {
      const cardFaculty = card.getAttribute('data-faculty');
      const cardDepartment = card.getAttribute('data-department');
      const cardYear = card.getAttribute('data-year');

      const facultyMatch = selectedFaculty === '' || selectedFaculty === cardFaculty;
      const departmentMatch = selectedDepartment === '' || selectedDepartment === cardDepartment;
      const yearMatch = selectedYear === '' || selectedYear === cardYear;

      return facultyMatch && departmentMatch && yearMatch;
    });
    setVideoCards(filteredCards);
  };

  return (
    <>
      <div className="font-sans bg-cover bg-center">

      <div className="navbar bg-gray-200 overflow-hidden flex justify-between items-center h-16 ">
        <div className="logo py-2 px-4 ml-4 text-black text-lg font-bold">Chuka <span className="text-orange-500">Repository</span></div>
      </div>
        <div className="flex justify-center bg-gray-900 ">
          <form id="filterForm" className="bg-white p-8 rounded-lg shadow-lg mb-8 mt-8 flex flex-wrap justify-between">
            <div className="w-full md:w-1/4">
              <label htmlFor="faculty" className="text-gray-700">Faculty:</label>
              <select id="faculty" name="faculty" onChange={updateDepartments} className="block w-full p-2 border border-gray-300 rounded-md mb-4">
                <option value="">All</option>
                <option value="Science">Science</option>
                <option value="Humanities">Humanities</option>
                <option value="Law">Law</option>
                <option value="Education">Education</option>
                <option value="Enviromental Sciences">Enviromental Sciences</option>
                <option value="School of Nursing">School of Nursing</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <label htmlFor="department" className="text-gray-700">Department:</label>
              <select id="department" name="department" className="block w-full p-2 border border-gray-300 rounded-md mb-4">
                <option value="">All</option>
                {facultyDepartments[selectedFaculty]?.map((department, index) => (
                  <option key={index} value={department}>{department}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <label htmlFor="year" className="text-gray-700">Year:</label>
              <select id="year" name="year" className="block w-full p-2 border border-gray-300 rounded-md mb-4">
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
            </div>
            <div className="w-full md:w-auto">
              <button type="button" onClick={applyFilters} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
                Watch Videos
              </button>
            </div>
          </form>
        </div>
        <div className="error-message text-red-500 font-bold mb-4 hidden" id="errorMessage">No videos found for your selection</div>
        <div className="container flex flex-wrap justify-center gap-4" id="videoContainer">
          {videoCards.map((card, index) => (
            <div key={index} className="video-card" data-faculty={card.getAttribute('data-faculty')} data-department={card.getAttribute('data-department')} data-year={card.getAttribute('data-year')}>
              {card.innerHTML}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Videos;
