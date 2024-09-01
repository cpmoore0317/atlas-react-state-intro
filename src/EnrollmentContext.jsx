import React, { createContext, useState } from 'react';

export const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prevCourses) => [...prevCourses, course]);
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.filter((course) => course.courseNumber !== courseNumber)
    );
  };

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
      {children}
    </EnrollmentContext.Provider>
  );
};
