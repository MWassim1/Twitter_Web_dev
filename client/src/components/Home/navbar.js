import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import'../../css/acceuil.css'

function Navbar() {

  const url = window.location.href
  const last_slash = url.lastIndexOf('/')
  const id = url.slice(last_slash+1)
  const [home,setHome] = useState("/Home/")
  const [profile,setProfile] = useState("/profile/")
  const navigate = useNavigate()



  useEffect(()=> {
    setHome(home+id)
    setProfile(profile+id)

  },[])

 
  return (
    <div className="navbar">
      <ul>
        <li className="navbar-top">
          <Link to={home}>Accueil</Link>
        </li>
      </ul>
      <ul>
      <li className="navbar-middle">
        <Link to={profile}>Mon profil</Link>
        </li>
      </ul>
      <ul>
        <li className="navbar-bottom">
          <Link to="/About">A propos</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
