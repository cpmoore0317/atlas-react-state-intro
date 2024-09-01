import React, { useContext } from 'react';
import { EnrollmentContext } from './EnrollmentContext';

export default function Header() {
  const { enrolledCourses } = useContext(EnrollmentContext);

  return (
    <header>
      <h1>Course Enrollment</h1>
      <p>Enrolled Courses: {enrolledCourses.length}</p>
    </header>
  );
}
