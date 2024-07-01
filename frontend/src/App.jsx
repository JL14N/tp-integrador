import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Poderes } from "./components/Poderes";
import { Personajes } from "./components/personajes/Personajes";
import { Equipos } from "./components/equipos/Equipos";
import { Lugares } from "./components/Lugares";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";
// import { ArticulosJWT } from "./components/articulosJWT/ArticulosJWT";
// import { RequireAuth } from "./components/RequiereAuth";
// import { Login } from "./components/login/Login";



function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/poderes" element={<Poderes />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/lugares" element={<Lugares />} />
            {/* <Route
              path="/articulosjwt"
              element={
                <RequireAuth>
                  <ArticulosJWT />
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} /> */}
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
