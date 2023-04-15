import React from 'react';
import {useState,useEffect} from "react"
import '../../css/connexion.css';
import Header from "../x/header"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"





function SignInForm(props){
  axios.defaults.withCredentials = true
  const axiosUrl = "http://localhost:7000/api/login"
  const axiosUrlLogin = "http://localhost:7000/api/getlogin"
  const axiosSetLogin = "http://localhost:7000/api/setlogin"
  const navigate = useNavigate()

  const [connexion,setConnexion] =useState({
      email:'',
      password:''     
    })
    
  useEffect(()=>{
    axios.get(axiosUrlLogin)
    .then((res)=>{
      console.log(res)
      console.log(res.data.loggedIn)
      if(res.data.loggedIn === true){
        console.log(res.data.user)
        console.log(res.data.user._id)
        navigate('/Home/'+`${res.data.user._id}`)

      }

    }).catch((err)=>{console.log(err)})
  },[])

  
    
    const handleSubmit = (evt) => {
      evt.preventDefault()
      axios.post(axiosUrl,connexion)
		  .then(res=>{
			if(res.status ===200){
        console.log(res)
        axios.put(axiosSetLogin,{id: res.data._id,email : res.data.email,password: res.data.password, isconnected :true})
          .then((res2)=>{
            console.log(res)
            navigate('/Home/'+`${res.data._id}`)
          })
          .catch((err2)=>console.log(err2.response))
        //.log(res.data)

			}
		}).catch((err)=> console.log(err.response))
    }

    const handleChange = (evt) => {
      const{name,value} = evt.target;
      setConnexion({...connexion,[name]:value})
      }

    return <div><body ><Header title="Page de connexion"></Header><h1>Connexion</h1><form action="submit" onSubmit={handleSubmit} > 
    <p id='check_syntaxe'></p>
		<label htmlFor="email"><input type="text" id="email" name="email" placeholder="Adresse email" value={connexion.email} onChange={handleChange} /></label><br/><br/>
		<label htmlFor="password"><input  type="password" id="password" name="password" placeholder="Mot de Passe" value={connexion.password} onChange={handleChange} autoComplete="on" ></input></label><br/><br/>
        <input type="submit" value="Se connecter"/>
        </form>
        <p>Vous n'avez pas de compte ? <Link to="/SignUp">Créer un compte</Link></p>
        </body></div>
}

export default SignInForm




