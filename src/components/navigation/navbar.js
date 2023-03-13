import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/index.css";

function Navbar() {
  const navigate = useNavigate(); // rediriger page

  const handleSubmit = async (e) => {

    let reponse = prompt("Voulez-vous vraiment vous déconnectez ?");
    if (reponse == "oui") {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      navigate("/");
      alert("Vous êtes déconnecté");
    } else {
      alert("Vous n'avez pas été déconnecté");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navButtons">
        {token ? ( // si présence du token, afficher Profil et déconnection
          <>
            <button className="bloc1">
              <Link to="/home">Accueil</Link>
            </button>
            <div className="blocConnect">
              <button className="bloc1">
                <Link to="/profil">Profil</Link>
              </button>
              <button onClick={handleSubmit} className="buttonDeco">
                Déconnexion
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="bloc1">
              <Link to="/">Accueil</Link>
            </button>
            <div className="blocNoConnect">
              <button className="bloc1">
                <Link to="/register" className="bloc1">
                  Inscription
                </Link>
              </button>
              <button className="bloc1">
                <Link to="/connection" className="bloc1">
                  Se connecter
                </Link>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
