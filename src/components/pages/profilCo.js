import React, { useEffect, useState } from "react";

import Footer from "../navigation/footer";
import Navbar from "../navigation/navbar";
import Searchbar from "../navigation/searchbar";

import "../../Styles/index.css";
import robots11 from "../../Images/robots11.jpg";
import robots10 from "../../Images/robots10.jpg";

function ProfilCo() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [occupation, setOccupation] = useState("");

	const [isEditing, setIsEditing] = useState(false); // edition est désactivé par défaut

	async function getInfoProfil() {
		// Fonction pour récupérer les informations de l'utilisateur
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("token"),
			},
		};

		const response = await fetch(
			// Envoie une requête fetch avec l'URL de l'API et les options définies
			`https://social-network-api.osc-fr1.scalingo.io/gptech-social/user`,
			options
		);

		const data = await response.json(); // Récupère la réponse au format JSON
		setFirstName(data.firstname);
		setLastName(data.lastname);
		setEmail(data.email);
		setAge(data.age);
		setOccupation(data.occupation);

		console.log(data); // Utilise les données renvoyées par l'API
	}

	useEffect(() => {
		getInfoProfil();
	}, []);

	async function updateInfoProfil() {
		// Fonction pour mettre à jour les informations de l'utilisateur
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({
				firstname: firstName,
				lastname: lastName,
				email: email,
				age: age,
				occupation: occupation,
			}),
		};

		const response = await fetch(
			`https://social-network-api.osc-fr1.scalingo.io/gptech-social/user`,
			options
		);

		const data = await response.json();
		console.log(data);
	}

	function handleEditClick() {
		// Fonction pour gérer le clic sur le bouton "Modifier"
		if (isEditing) {
			updateInfoProfil();
		}
		setIsEditing(!isEditing);
	}

	useEffect(() => {
		// Utilisation du useEffect pour afficher les informations de l'utilisateur stockées dans le stockage local s'il y en a, sinon pour récupérer les informations depuis l'API
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
			setAge(user.age);
			setOccupation(user.occupation);
		} else {
			getInfoProfil();
		}
	}, []);

	return (
		<div>
			<Searchbar />
			<div className="homeBody">
				<Navbar />

				{isEditing === false ? (
					<div className="container">
						<h1 className="pageTitle">Informations profil</h1>
						<div
							action=""
							className="field"
							method="get"
						/>
						<label htmlFor="">Nom : </label> {/* afficher le Nom */}
						<div className="form-control">{lastName}</div>
						<div
							action=""
							className="field"
							method="get"
						/>
						<div>
							<label htmlFor="">Prénom : </label> {/* afficher le Prénom */}
							<div className="form-control">{firstName}</div>
						</div>
						<div
							action=""
							className="field"
							method="get"
						/>{" "}
						<div>
							<label htmlFor="">Email : </label> {/* afficher l'Email */}
							<div className="form-control">{email}</div>
						</div>
						<div
							action=""
							className="field"
							method="get"
						/>{" "}
						<div>
							<label htmlFor="">Age : </label> {/* afficher l'Age */}
							<div className="form-control">{age}</div>
						</div>
						<div
							action=""
							className="field"
							method="get"
						/>
						<div>
							<label htmlFor="">Emploi : </label> {/* afficher le Travail */}
							<div className="form-control">{occupation}</div>
						</div>
						<button className="buttonToChangeValid" onClick={handleEditClick}>Modifier</button>{" "}
						{/* fonction quand tu cliques sur modifier */}
					</div>
				) : isEditing === true ? (
					<div className="container">
						<h1 className="pageTitle">Informations profil</h1>

						<div
							action=""
							className="field"
							method="get"
						>
							<label htmlFor="">Nom : </label> {/* afficher le Nom */}
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="form-control"
							/>
						</div>

						<div className="field">
							<div
								action=""
								method="get"
								className="field"
							>
								<label htmlFor="">Prénom : </label> {/* afficher le Prénom */}
								<input
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="form-control"
								/>
							</div>

							<div className="field">
								<div
									action=""
									method="get"
									className="field"
								>
									{" "}
									<label htmlFor="">Email : </label> {/* afficher l'Email */}
									<input
										type="text"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="form-control"
									/>
								</div>

								<div className="field">
									<div
										action=""
										method="get"
										className="field"
									>
										{" "}
										<label htmlFor="">Age : </label> {/* afficher l'Age */}
										<input
											type="number"
											value={age}
											onChange={(e) => setAge(e.target.value)}
											className="form-control"
										/>
									</div>

									<div className="field">
										<div
											action=""
											method="get"
											className="field"
										>
											{" "}
											<label htmlFor="">Emploi : </label>{" "}
											{/* afficher le Travail */}
											<input
												type="text"
												value={occupation}
												onChange={(e) => setOccupation(e.target.value)}
												className="form-control"
											/>
										</div>
										<button className="buttonToChangeValid" onClick={handleEditClick}>Valider</button>{" "}
										{/* fonction quand tu cliques sur modifier */}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					""
				)}

				<div className="advert">
					{" "}
					{/* advert on the right */}
					<img
						src={robots10}
						alt="advert"
						className="bot"
					></img>
					<img
						src={robots11}
						alt="advert"
						className="bot"
					></img>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ProfilCo;
