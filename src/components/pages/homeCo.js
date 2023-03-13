import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../navigation/navbar";
import Footer from "../navigation/footer";
import "../../Styles/navStyle.css";
import robots1 from "../../Images/robots1.png";
import robots5 from "../../Images/robots5.jpg";
import Searchbar from "../navigation/searchbar";

function HomeCo() {
	//we create a const to handle the file input action
	const [inputValue, setInputValue] = useState(""); //  ajout tache, we create a table to hold the input of the posts
	const [inputTitle, setInputTitle] = useState(""); // titles of the posts
	const [array, setArray] = useState([]); // tableau vide
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [allPosts, setAllPosts] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	//LIKES
	//displaying likes
	async function like(postId) {
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				//verifying the token is authorized (tokens are saved in the local storage)
				Authorization: "bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({
				postId: postId,
			}),
		};

		//Fetching the likes with the api
		const response = await fetch(
			`https://social-network-api.osc-fr1.scalingo.io/gptech-social/post/like`,
			options
		);
		//gets the reply in a JSON format
		const data = await response.json();
		setFirstName(data.firstname);
		setLastName(data.lastname);

		//if there is a reply from the fetch (posts present), then launch the getallpost function to list the info, else display an alert
		if (data.success) {
			getAllPost();
		} else {
			alert(data.message);
		}
	}
	//launch the getAllPost function
	useEffect(() => {
		getAllPost();
	}, []);

	//Functions for posting
	function handleInputChange(event) {
		setInputValue(event.target.value);
	}
	function handleInputChange2(event) {
		setInputTitle(event.target.value);
	}
	function handleSubmit(event) {
		event.preventDefault();
		postPosts();
		setInputValue("");
		setInputTitle("");
	}

	//CHECKING AUTHORISATION
	// Getting the token collected when connecting from the api to check whether the user can post
	async function getInfoProfil() {
		//get the info from local storage
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
		// get the necessary info
		const data = await response.json();
	}
	useEffect(() => {
		getInfoProfil();
	}, []);

	//POSTING
	// Posting posts to the api
	async function postPosts() {
		const options = {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: "bearer " + localStorage.getItem("token"),
		  },
		  body: JSON.stringify({
			title: inputTitle,
			content: inputValue,
		  }),
		};
		const response = await fetch(
		  "https://social-network-api.osc-fr1.scalingo.io/gptech-social/post",
		  options
		);
		const data = await response.json();
		if (data.success) {
		  getAllPost();
		} else {
		  alert(data.message);
		}
	  }
	

	//displays the comments with the name of the author and the likes
	const renderMyPosts = () => {
		return allPosts.map((item, index) => {
			return (
				<div key={index}>
					<div className="homeSpace">
						<p className="contenuBloc">{item.title}</p>
						<p className="contenuBloc">{item.content}</p>
						<p className="author">
							{item.firstname} {item.lastname}
						</p>
						<button
							className="buttonLike"
							onClick={() => like(item._id)}
						>
							❤️
						</button>{" "}
						{/* quand tu cliques sur le bouton, ajouter 1 */}
						<span>{item.likes.length}</span>
					</div>
				</div>
			);
		});
	};

	// FETCHING
	//getting posts from the api
	async function getAllPost() {
		const options = {
			method: "GET",
			headers: {
				//standard http header, tells the server that the request is in json format
				"Content-Type": "application/json",
			},
		};
		//using the api to fetch the data
		let response = await fetch(
			"https://social-network-api.osc-fr1.scalingo.io/gptech-social/posts?page=0&limit=10",
			options
		);
		let data = await response.json();

		setAllPosts(data.posts);
	}

	return (
		<div className="App">
			{/* section on the top */}
			<Searchbar />
			<div className="homeBody">
				{/* section on the left */}
				<Navbar />

				{/* MIDDLE POST  */}
				<div className="container">
					<h1 className="pageTitle">Fil d'actualités</h1>
					<h3>"Miroir, mon bot miroir..."</h3>
					<form onSubmit={handleSubmit}>
						<div className="field2">
							<div className="posts">
								<input
									type="text"
									value={inputTitle}
									onChange={handleInputChange2}
									placeholder="Titre"
									className="form-control"
								/>
								<textarea
									type="textarea"
									rows="5"
									value={inputValue}
									onChange={handleInputChange}
									placeholder="Raconter sa vie"
									className="form-control"
								/>
							</div>
						</div>
						<button
							type="submit" onClick={handleSubmit}
							className="posterButton"
						>
							Poster
						</button>
					</form>

					{/* displaying the posts */}

					<div className="form-control2">
						<div
							action=""
							method="get"
							className="field"
						>
							{renderMyPosts()}
						</div>
					</div>
				</div>

				{/* advert on the right */}
				<div className="advert">
					<img
						src={robots1}
						alt="advert"
						className="bot"
					/>
					<img
						src={robots5}
						alt="advert"
						className="bot"
					/>
				</div>
			</div>
			{/* end of the page */}
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default HomeCo;
