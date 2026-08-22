import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import Students from "./pages/Students";

function App() {
  const [students, setStudents] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/add"
          element={
            <AddStudent
              students={students}
              setStudents={setStudents}
            />
          }
        />
        <Route
  path="/dashboard"
  element={<Dashboard students={students} />}
/>

        <Route
          path="/students"
          element={<Students students={students} />}
        />

        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;