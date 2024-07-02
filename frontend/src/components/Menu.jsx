import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";


function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );


  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }


  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    }
  }, []);


  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
        <img src="https://static.thenounproject.com/png/3914586-200.png" alt="Hero" style={{height: '24px', filter: 'invert(100%)'}} />
          &nbsp;<i>Superhéroes</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/personajes">
                Personajes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/poderes">
                Poderes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/equipos">
                Equipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/lugares">
                Lugares
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/peliculas">
                Peliculas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/franquicias">
                Franquicias
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" title="exclusivo para administradores" to="/articulosjwt">
                Articulos JWT
              </NavLink>
            </li> */}
          </ul>


          <ul className="navbar-nav ms-auto">
            {usuarioLogueado && (
              <li className="nav-item">
                <a className="nav-link" href="#!">Bienvenido: {usuarioLogueado}</a>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/Inicio">
                <span
                  className={
                    usuarioLogueado ? "text-warning" : "text-success"
                  }
                >
                  <i
                    className={
                      usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                    }
                  ></i>
                </span>
                {usuarioLogueado ? " Logout" : " Login"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export { Menu };