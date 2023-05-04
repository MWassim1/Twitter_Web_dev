import {React,useEffect,useState} from 'react';
import Logo from "../../logo.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Profile_header(props){
    const url = window.location.href
    const id = url.split('/')[4]


    const axiosUrlLogout = "http://localhost:7000/api/user/logout"
    const axiosUrlUser = "http://localhost:7000/api/user/:id"


    const [ismypage,setIsMyPage] = useState(1)

    
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(url.split('/').length === 6){
          setIsMyPage(0)
      }
      // eslint-disable-next-line
      },[])

    const handleClick = (evt) =>{
        navigate(`/Home/${id}`)
    }

    const handleClickLogout = (evt) =>{
        evt.preventDefault()
        axios.post(axiosUrlUser,{_id:`${id}`})
        .then((res)=>{
          axios.put(axiosUrlLogout,{id:res.data._id, email : res.data.email , password : res.data.password, isconnected : false } ) 
          .catch((err)=> console.log(err.response))
          navigate('/')
      })
      .catch(err =>{console.log(err)})
      }

      const handleClickEditProfile = (evt) => {
        evt.preventDefault()
        navigate(`/editprofile/${id}`)
      }
    return <header>
        <img className="header-logo" src={Logo}  alt="Logo" />
        <div className="logout-button-profile-section">
        <button className="logout-button-profile " onClick={handleClickLogout}>Déconnexion</button></div>
        <div className="return-button-section">
        <button className="return-button" onClick={handleClick}>Acceuil</button></div>
        {ismypage === 1 ? <button id="button_for_edit_profile" onClick={handleClickEditProfile}>Modifier le profil</button> : <p></p>}
        </header>
}

export default Profile_header