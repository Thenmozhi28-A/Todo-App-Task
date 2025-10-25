import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login users={users} setCurrentUser={setCurrentUser} />}
        />
        <Route path="/signup" element={<SignUp users={users} setUsers={setUsers} />} />
        <Route path="/dashboard/*" element={<Dashboard currentUser={currentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
