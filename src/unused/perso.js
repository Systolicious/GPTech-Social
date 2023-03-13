import React from "react";
import Navbar from "../components/navigation/navbar";
import Searchbar from "../components/navigation/searchbar";
import Footer from "../components/navigation/footer";
import "../../Styles/index.css";
import robots4 from "../../Images/robots4.jpg";
import robots3 from "../../Images/robots3.jpg";

function Perso() {
	return (
		<div>
			<Searchbar />
			<div className="profil">
				<Navbar />
				<div className="container">
					<h1 className="pageTitle">Profil</h1>

					<h3 className="profilTitlePublic">Public</h3>

					<div className="field">
						<label htmlFor="">Nom d'utilisateur</label>
						<input className="form-control"></input>
					</div>
					<div className="field">
						<label htmlFor="">Age</label>
						<input
							className="form-control"
							type="number"
							min="15"
							max="99"
						></input>
					</div>
					<div className="field">
						<label htmlFor="">Description</label>
						<textarea className="form-control"></textarea>
					</div>

					<h3 className="profilTitlePrivate">Privé 🔒</h3>
					<div className="field">
						<label htmlFor="">Email</label>
						<input className="form-control"></input>
					</div>
					<div className="field">
						<label htmlFor="">Adresse</label>
						<input className="form-control"></input>
					</div>
					<button className="buttonModifProfil">Modifier</button>
				</div>
				<div className="advert">
					<img
						src={robots4}
						alt="advert"
						className="bot"
					></img>
					<img
						src={robots3}
						alt="advert"
						className="bot"
					></img>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Perso;
