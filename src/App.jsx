import React from "react";
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { EnrollmentProvider } from "./EnrollmentContext";

export default function App() {
  return (
    <EnrollmentProvider>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrollmentProvider>
  );
}
