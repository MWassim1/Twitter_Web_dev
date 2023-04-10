import '../../css/acceuil.css';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"




function Home_header(props){


  const axiosUrl = "http://localhost:7000/api/user/logout"
  const navigate = useNavigate()


    const handleClick = (evt) =>{
      evt.preventDefault()
		  axios.get(axiosUrl) 
   		.catch((err)=> console.log(err.response))
      navigate('/')



    }

    return (<header>
    <img className="header-logo" src="../image/logo.png" alt="Logo" />
    <div className="profile-button-section">
      <Link to="profile"><button className="profile-button">Mon profil</button></Link>
    </div>
    <div className="logout-button-section">
     <Link to="/"><button className="logout-button" onClick={handleClick}>Déconnexion</button></Link>
    </div>
  </header>)
}

export default Home_header