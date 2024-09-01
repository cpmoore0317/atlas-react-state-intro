import React, { useContext } from 'react';
import { EnrollmentContext } from './EnrollmentContext';

export default function ClassSchedule() {
  const { enrolledCourses } = useContext(EnrollmentContext);

  return (
    <div>
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
