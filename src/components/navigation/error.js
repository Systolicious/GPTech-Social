import React from "react";
import Navbar from "../navigation/navbar";
import Searchbar from "../navigation/searchbar";
import Footer from "../navigation/footer";
import "../../Styles/navStyle.css";
import robots12 from "../../Images/robots12.jpg";
import robots13 from "../../Images/robots13.jpeg";

function Error() {
	return (
		<div>
			<Searchbar />
			<div className="homeBody">
				<Navbar />
				<div className="container">
					<h1 className="pageTitle">Game Over</h1>
				</div>
				<div className="advert">
					<img
						src={robots12}
						alt="advert"
						className="bot"
					/>
					<img
						src={robots13}
						alt="advert"
						className="bot"
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Error;
