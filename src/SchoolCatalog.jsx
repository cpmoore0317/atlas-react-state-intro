import React, { useState, useEffect, useContext } from 'react';
import { EnrollmentContext } from './EnrollmentContext';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const { enrolledCourses, enrollCourse, dropCourse } = useContext(EnrollmentContext);

  useEffect(() => {
    // Fetch data from the API
    fetch('/api/courses.json')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredCourses = sortedCourses.filter((course) =>
    course.courseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEnroll = (course) => {
    enrollCourse(course);
  };

  const handleDrop = (courseNumber) => {
    dropCourse(courseNumber);
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <h2>Enrolled Courses: {enrolledCourses.length}</h2>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('trimester')}>Trimester</th>
            <th onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th onClick={() => handleSort('courseName')}>Course Name</th>
            <th onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                {enrolledCourses.some(enrolled => enrolled.courseNumber === course.courseNumber) ? (
                  <button onClick={() => handleDrop(course.courseNumber)}>Drop</button>
                ) : (
                  <button onClick={() => handleEnroll(course)}>Enroll</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <h2>Class Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
