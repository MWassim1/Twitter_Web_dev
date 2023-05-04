import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import'../../css/acceuil.css'
import axios from 'axios';

function Navbar() {

  const url = window.location.href
  const last_slash = url.lastIndexOf('/')
  const id = url.slice(last_slash+1)
  const [home,setHome] = useState("/Home/")
  const [profile,setProfile] = useState("/profile/")
  const [friendrequest,setFriendRequest] = useState("/friendrequest/")

  const axiosSaveSession = "http://localhost:7000/api/savesession"




  useEffect(()=> {
    if(url.split('/').length === 6){
      setHome(home+url.split('/')[4])
      setProfile(profile+url.split('/')[4])
      setFriendRequest(friendrequest+url.split('/')[4])
    }
    else if (url.split('/').length === 5){
      setHome(home+id)
      setProfile(profile+id)
      setFriendRequest(friendrequest+id)
    }
// eslint-disable-next-line
  },[])

  const handleClickProfile = (evt) =>{
    if(url.split('/').length === 6){
      axios.put(axiosSaveSession,{user_id:url.split('/')[4],session:`/profile/${url.split('/')[4]}`})
    }

    else if (url.split('/').length === 5){
      axios.put(axiosSaveSession,{user_id:id,session:`/profile/${id}`})
    }
  }
  const handleClickHome = (evt) =>{
    if(url.split('/').length === 6){
      axios.put(axiosSaveSession,{user_id:url.split('/')[4],session:`/home/${url.split('/')[4]}`})
    }
    else if (url.split('/').length === 5){
      axios.put(axiosSaveSession,{user_id:id,session:`/home/${id}`})
    }
  }

  const handleClickFR = (evt) =>{
    if(url.split('/').length === 6){
      axios.put(axiosSaveSession,{user_id:url.split('/')[4],session:`/friendrequest/${url.split('/')[4]}`})
    }
    else if (url.split('/').length === 5){
      axios.put(axiosSaveSession,{user_id:id,session:`/friendrequest/${id}`})
    }
  }
 
  return (
    <div className="navbar">
      <ul>
        <li className="navbar-top">
          <Link to={home} onClick={handleClickHome}>Accueil</Link>
        </li>
      </ul>
      <ul>
      <li className="navbar-middle">
        <Link to={profile} onClick={handleClickProfile}>Mon profil</Link>
        </li>
      </ul>
      <ul>
        <li className="navbar-bottom">
          <Link to={friendrequest} onClick={handleClickFR}>Demande d'amis</Link>
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
