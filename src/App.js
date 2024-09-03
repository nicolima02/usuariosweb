import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Users from "./componentes/users";
import Inicio from "./componentes/inicio";
import Check from "./componentes/check";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <Routes>
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Check" element={<Check />} />
            <Route path="/" element={<Navigate to="/Inicio" />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
