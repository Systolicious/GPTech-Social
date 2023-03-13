import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import "../../Styles/index.css";

function Searchbar() {


  async function getInfoProfil() {				// Fonction pour récupérer les informations de l'utilisateur
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
	

	const response = await fetch(			// Envoie une requête fetch avec l'URL de l'API et les options définies
		`https://social-network-api.osc-fr1.scalingo.io/gptech-social/user`,
		options
	  );

  }

  return (
	
    <div className="navSearch">
      <img src={logo} alt="logo" className="logo" />

      <div className="gptech">
        <h1 className="titre">GPTech-Social</h1>
        <h4 className="stitre">"Le réseau social pour les accros des robots"</h4>
      </div>

      {!localStorage.getItem("token") ? (      // si différent du local storage avec le token
        <div className="textNotConnect">
          <h5>Vous n'êtes pas connecté</h5>		
        </div>
      ) : (       //    		:     ca revient à dire   else 
        <div className="textConnect">
          <h5>Vous êtes connecté</h5>
        </div>
        
      )}
    </div>
  );
}

export default Searchbar;
