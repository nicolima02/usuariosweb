import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Users from "./componentes/login";
import Inicio from "./componentes/inicio";
import Registrar from "./componentes/registrar";
import NavBar from "./componentes/navBar";
import Auditorias from "./componentes/auditorias";
import Footer from "./componentes/footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <NavBar></NavBar>
              <div className="content">
              <Routes>
                <Route path="/Inicio" element={<Inicio />} />
                <Route path="/Login" element={<Users />} />
                <Route path="/Registrar" element={<Registrar />} />
                <Route path="/Auditorias" element={<Auditorias />} />
                <Route path="/" element={<Navigate to="/Inicio" />} />
              </Routes>
              </div>
            <Footer></Footer>
          </Router>
      </header>
    </div>
  );
}

export default App;
