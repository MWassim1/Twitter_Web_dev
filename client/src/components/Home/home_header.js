import '../../css/acceuil.css';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import Logo from "../../logo.png"





function Home_header(props){

  
  const axiosUrl = "http://localhost:7000/api/user/logout"
  const axiosUrlLogin = "http://localhost:7000/api/getlogin"
  const axiosUrlUser = "http://localhost:7000/api/user/:id"
  const url = window.location.href
  const last_slash = url.lastIndexOf('/')
  const id = url.slice(last_slash+1)

  const navigate = useNavigate()

  
    const handleClick = (evt) =>{
      evt.preventDefault()
      axios.post(axiosUrlUser,{_id:`${id}`})
      .then((res)=>{
        console.log(res.data)
        console.log(res.data._id)
        axios.put(axiosUrl,{id:res.data._id, email : res.data.email , password : res.data.password, isconnected : false } ) 
        .catch((err)=> console.log(err.response))
        navigate('/')
    })
    .catch(err =>{console.log(err)})
    }
   
    return (<header>
      <img className="header-logo" src={Logo}  alt="Logo" />
      <div className="search-bar-section">
        <input type="text" className="search-bar" placeholder="Rechercher utilisateur..." />
      </div>
      <div className="profile-button-section">
      <Link to="profile"><button className="profile-button">Mon profil</button></Link>
      </div>
      <div className="logout-button-section">
      <Link to="/"><button className="logout-button" onClick={handleClick}>Déconnexion</button></Link>
      </div>
    </header>)
}

export default Home_header


