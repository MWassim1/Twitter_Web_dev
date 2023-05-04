import React from 'react';
import {useState,useEffect} from "react"
import '../../css/connexion.css';
import Header from "../x/header"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"





function SignInForm(props){
  axios.defaults.withCredentials = true
  const axiosUrl = "http://localhost:7000/api/login"
  const axiosUrlLogin = "http://localhost:7000/api/getsession"
  const axiosSetLogin = "http://localhost:7000/api/setlogin"
  const axiosUrlGetSession = "http://localhost:7000/api/getsession/"
  const axiosSaveSession = "http://localhost:7000/api/savesession"

  const navigate = useNavigate()

  const [connexion,setConnexion] =useState({
      email:'',
      password:''     
    })
    
  useEffect(()=>{
    axios.get(axiosUrlLogin)
    .then((res)=>{
      if(res.data.loggedIn === true){
        axios.get(axiosUrlGetSession+res.data.user._id)
        .then(res3=>{
          navigate(`${res3.data.session}`)
        })
        .catch((err3)=>{console.log(err3)})
        
      }

    }).catch((err)=>{console.log(err)})
    // eslint-disable-next-line
  },[])

  const onEnterKey = (evt) => {
    if(evt.keyCode === 13 && evt.shiftKey === false) {
      handleSubmit(evt)
    }
  }
    
    const handleSubmit = (evt) => {
      evt.preventDefault()
      axios.post(axiosUrl,connexion)
		  .then(res=>{
			if(res.status ===200){
        axios.put(axiosSetLogin,{id: res.data._id,email : res.data.email,password: res.data.password, isconnected :true})
          .then((res2)=>{
            axios.put(axiosSaveSession,{user_id:res.data._id,session:"/Home/"+res.data._id})
            .then(res3=>{
              axios.get(axiosUrlGetSession+res.data._id)
              .then(res4=>{
                navigate(`${res4.data.session}`)
              })
              .catch((err4)=>{console.log(err4)})
            })
            .catch((err3)=>{console.log(err3)})
          })
          .catch((err2)=>console.log(err2.response))

			}
		}).catch((err)=> console.log(err.response))
    }

    const handleChange = (evt) => {
      const{name,value} = evt.target;
      setConnexion({...connexion,[name]:value})
      }

    return <div><div id="body" ><Header title="Page de connexion"></Header><h1>Connexion</h1><form action="submit" onKeyDown={onEnterKey} onSubmit={handleSubmit} > 
    <p id='check_syntaxe'></p>
		<label htmlFor="email"><input type="text" id="email" name="email" placeholder="Adresse email" value={connexion.email} onChange={handleChange} /></label><br/><br/>
		<label htmlFor="password"><input  type="password" id="password" name="password" placeholder="Mot de Passe" value={connexion.password} onChange={handleChange} autoComplete="on" ></input></label><br/><br/>
        <input type="submit" value="Se connecter"/>
        </form>
        <p>Vous n'avez pas de compte ? <Link to="/SignUp">Créer un compte</Link></p>
        </div></div>
}

export default SignInForm




