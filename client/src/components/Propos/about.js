import Header from "../x/header"
import "../../css/propos.css"
import Logo from "../../logo.png"

function Abouts(props){

    return (
        <div id="body_about">
            <Header title="À propos de notre site"></Header>
        <header id="header_about">
		<img className="header-logo" src={Logo} alt="Logo" />
		<div className="return-button-section">
			<button className="return-button">Accueil</button>
		</div>
		<div className="logout-button-profile-section">
			<button className="logout-button-profile">Déconnexion</button>
		</div>
	    </header>
	    <main id="main_about">
		<h2 id="h2_about">Qui sommes-nous ?</h2>
		    <p id="p_about">Nous sommes deux Etudiants en licence d'informatique à la Sorbonne. Nous avons développé ce site dans le cadre d'un projet universitaire qui visait à créer un réseau social.
			 Nous avons mis en pratique les connaissances acquises lors de nos études en utilisant des technologies telles que HTML, CSS, JavaScript et MongoDB.
			 L'objectif était de créer une plateforme permettant aux utilisateurs de se connecter, de partager des publications et d'ajouter des amis. </p>
		<h2 id="h2_about">Nos réseaux sociaux</h2>
		<ul id="ul_about">
			<li className="li_about">Wassim Mussard  - <a href="https://www.linkedin.com/in/wassim-mussard/" target="_blank" id="a_about" >LinkedIn</a> - <a href="https://github.com/wassimmussard" target="_blank" id="a_about">GitHub</a></li>
			<li className="li_about">Adan Zerrad - <a href="https://www.linkedin.com/in/adan-zerrad/" target="_blank" id="a_about">LinkedIn</a> - <a href="https://github.com/adanzerrad" target="_blank" id="a_about">GitHub</a></li>
		</ul>
	    </main>
    </div>
    )

}


export default Abouts