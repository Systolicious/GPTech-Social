import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../navigation/footer";
import Navbar from "../navigation/navbar";
import Searchbar from "../navigation/searchbar";
import "../../Styles/register.css";
import robots6 from "../../Images/robots6.jpg";
import robots7 from "../../Images/robots7.jpg";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  //functions
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      }),
    };
    console.log("option", options);

    //Appel Api
    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/gptech-social/register`,
      options
    )
      .then((response) => response.json()) // Récupère la réponse au format JSON
      .then((data) => {
        if (data.success) {
          navigate("/connection");
        } else {
          alert(data.message);
        }
      }); // Utilise les données renvoyées par l'API
  };

  return (
    <div>
      <Searchbar />
      <div className="bodyReg">
        <Navbar />
        <div className="container">
          <h1 className="pageTitle">Création de Compte</h1>
          <form action="" className="mx-auto" method="post">
            <div className="field">
              <label htmlFor="">Nom</label>
              <input
                type="text"
                className="form-control"
                id="Nom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="Prenom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Mot de Passe</label>
              <input
                type="password"
                className="form-control"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} className="buttonInscription">
              S'inscrire
            </button>
          </form>
        </div>
        <div className="advert">
          <img src={robots6} alt="advert" className="bot"></img>
          <img src={robots7} alt="advert" className="bot"></img>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
