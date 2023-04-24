import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import'../../css/acceuil.css'

function Navbar() {

  const url = window.location.href
  const last_slash = url.lastIndexOf('/')
  const id = url.slice(last_slash+1)
  const [home,setHome] = useState("/Home/")

  useEffect(()=> {
    setHome(home+id)
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
          <Link to="/Home/profile">Mon Profil</Link>
        </li>
      </ul>
      <ul>
        <li className="navbar-bottom">
          <Link to="/Home">A propos</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
