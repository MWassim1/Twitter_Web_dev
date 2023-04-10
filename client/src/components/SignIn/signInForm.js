import React from 'react';
import {useState,useEffect} from "react"
import '../../css/connexion.css';
import Header from "../x/header"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"





function SignInForm(props){

  const axiosUrl = "http://localhost:7000/api/login"
  const navigate = useNavigate()



    const [connexion,setConnexion] =useState({
      email:'',
      password:''     
    })
    


    
    const handleSubmit = (evt) => {
      evt.preventDefault()
      axios.post(axiosUrl,connexion)
		  .then(res=>{
			if(res.status ===200){
				//window.location.replace("http://localhost:3000/Home");
        navigate('/Home/'+`${res.data}`)
        //.log(res.data)

			}
		}).catch((err)=> console.log(err.response))
    }

    const handleChange = (evt) => {
      const{name,value} = evt.target;
      setConnexion({...connexion,[name]:value})
      }

    return <div><Header title="Page de connexion"></Header><h1>Connexion</h1><form action="submit" onSubmit={handleSubmit} > 
    <p id='check_syntaxe'></p>
		<label htmlFor="email">Adresse e-mail :<input type="email" id="email" name="email" value={connexion.email} onChange={handleChange}/></label><br/><br/>
		<label htmlFor="password">Mot de passe :<input  type="password" id="password" name="password" value={connexion.password} onChange={handleChange} autoComplete="on"></input></label><br/><br/>
        <input type="submit" value="Se connecter"/>
        </form>
        <p>Vous n'avez pas de compte ? <Link to="/SignUp">Créer un compte</Link></p>
        </div>
}

export default SignInForm

