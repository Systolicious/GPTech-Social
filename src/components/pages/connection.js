import React, { useState } from "react";
import robots8 from "../../Images/robots8.jpg";
import robots9 from "../../Images/robots9.jpg";
import Navbar from "../navigation/navbar";
import Footer from "../navigation/footer";
import Searchbar from "../navigation/searchbar";
import "../../Styles/index.css";
import { useNavigate } from "react-router-dom"; // hook pour rediriger vers une page

function Connection() {
	// Récupère les informations de connexion stockées dans le localstorage, ou une chaîne vide si elles n'existent pas
	const [email, setEmail] = useState(localStorage.getItem("email") || "");
	const [password, setPassword] = useState(
		localStorage.getItem("password") || ""
	);
	const navigate = useNavigate(); // const pour rediriger vers une page

	// Cette fonction sera appelée lorsque l'utilisateur cliquera sur le bouton "Valider"
	async function handleSubmit() {
		// Déclare un objet options pour configurer la requête fetch
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};

		setEmail(""); // vider les inputs email et password
		setPassword("");

		// Envoie une requête fetch avec l'URL de l'API et les options définies
		const response = await fetch(
			`https://social-network-api.osc-fr1.scalingo.io/gptech-social/login`,
			options
		);

		// Récupère la réponse au format JSON
		const data = await response.json();

		console.log(data); // Utilise les données renvoyées par l'API

		// Stocke les informations de connexion dans le localstorage
		localStorage.setItem("email", email);
		localStorage.setItem("password", password);
		localStorage.setItem("token", data.token);

		// Si la connexion est réussie, naviguer vers la page d'accueil
		if (data.success) {
			navigate("/home");
		} else {
			alert("Identifiant ou mot de passe incorrect, veuillez réessayer");
		}
	}

	return (
		<div className="connection">
			<Searchbar />
			<div className="middle">
				<Navbar />
				<div className="container">
					<h1 className="pageTitle">Connection</h1>
					<div className="field">
						<label htmlFor="">Identifiant</label>

						{/* Crée un champ de saisie pour l'email et met à jour l'état de l'email à chaque changement */}
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
						></input>
					</div>
					<div className="field">
						<label htmlFor="">Mot de passe</label>

						{/* Crée un champ de saisie pour le mot de passe et met à jour l'état du mot de passe à chaque changement */}
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-control"
						></input>
					</div>
					<div className="buttonValider">
						{/* Crée un bouton "Valider" qui déclenche la fonction handleSubmit lorsque l'utilisateur clique dessus */}
						<button onClick={handleSubmit}>Valider</button>
					</div>
				</div>
				<div className="advert">
					<img
						src={robots8}
						alt="advert"
						className="bot"
					></img>
					<img
						src={robots9}
						alt="advert"
						className="bot"
					></img>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Connection;
