import React, { useState, useEffect } from "react";
import Navbar from "../navigation/navbar";
import Footer from "../navigation/footer";
import "../../Styles/navStyle.css";
import robots1 from "../../Images/robots1.png";
import robots5 from "../../Images/robots5.jpg";
import Searchbar from "../navigation/searchbar";


function Home() {

  const [allPosts, setAllPosts] = useState([]);
 
  async function like (postId) {
    console.log(postId)
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
      postId: postId
      }),
    };
    console.log("option", options);

    //Appel Api
    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/gptech-social/post/like`,
      options
    )
    
      .then((response) => response.json()) // Récupère la réponse au format JSON
      .then((data) => {
        if (data.success) {
          getAllPost()
        } else {
          alert(data.message);
        }
        
      }); // Utilise les données renvoyées par l'API
  };
  



  const renderMyPosts = () => {
    if (allPosts.length >= 0) {
      return allPosts.map((item, index) => {
        return (
          <div key={index}>
            <div className="homeSpace">
            <p className="contenuBloc">{item.title}</p>
            <p className="contenuBloc">{item.content}</p>
            <button className="buttonLike" onClick={ () => like (item._id) }>❤️</button>    {/* quand tu clique sur le bouton, ajouter 1 */}
            <span>{item.likes.length}</span>
            </div>
          </div>
        );
      });
    }
  };

  async function getAllPost() {        // permet de changer ma variable d'état grace à mon input

    const options = {         // Fonction pour récupérer les informations de l'utilisateur
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      // Envoie une requête fetch avec l'URL de l'API et les options définies
      `https://social-network-api.osc-fr1.scalingo.io/gptech-social/posts?page=0&limit=10`,
      options
    );
    const data = await response.json(); // Récupère la réponse au format JSON
    setAllPosts(data.posts);

    console.log(data.posts); // Utilise les données renvoyées par l'API
  }

  useEffect(() => {
    getAllPost();
  }, []);

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
          <div>
            <div className="form-control2">
              <div action="" method="get" className="field">
                {renderMyPosts()}
              </div>
            </div>
          </div>
        </div>

        {/* advert on the right */}
        <div className="advert">
          <img src={robots1} alt="advert" className="bot"></img>
          <img src={robots5} alt="advert" className="bot"></img>
        </div>
      </div>
      {/* end of page */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

