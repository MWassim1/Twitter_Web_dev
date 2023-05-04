import '../../css/follow.css';
import axios from "axios"
import { useEffect,useState } from "react"
import Navbar from '../Home/navbar';
import Logo from "../../logo.png"
import Post from "../../image/post.png"
import { Link,useNavigate } from 'react-router-dom';
import Header from '../x/header';
import DefaultPP from "../Profile/1.jpg"




function Followers(props) {

    const axiosSaveSession = "http://localhost:7000/api/savesession"
    const axiosUrl = "http://localhost:7000/api/user/logout"
    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlGetUser = "http://localhost:7000/api/users/"
    const axiosUrlGetFollows = "http://localhost:7000/api/user/followers/"
    const axiosUrlGetUserInfo = "http://localhost:7000/api/userinfo/"

    const navigate = useNavigate()

    const [username,setUsername] = useState()
    const [b_follows,setBFollows] = useState(0)
    const [index_follow,setIndexFollow] = useState(0)


    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    let id = url.slice(last_slash+1)
    if(url.split("/").length === 6){
        id = url.split("/")[4]
    }

    useEffect(()=>{
        let id2 = id 
        if(url.split("/").length === 6){
            id2 = url.split("/")[5]
        }
        axios.post(axiosUrlUser,{_id:`${id2}`})
        .then(res=>{
          if(res.status === 200){
            setUsername(res.data.username)
          } 
        })
        .catch((err)=>{console.log(err);navigate('/')})
    })

    useEffect(()=>{
        axios.get(axiosUrlGetFollows+url.slice(last_slash+1))
            .then(res=>{
                if(res.data.followedBy.length > 0){
                    setBFollows(1)
                    let i = index_follow
                    for(i;i<res.data.followedBy.length;i++){
                        create_follow(res.data.followedBy[i])
                    }
                    setIndexFollow(i)
                }
                else {
                    setBFollows(0)
                }
            })
            .catch((err)=>{setBFollows(0)})
    },[index_follow])

    const create_follow = async (user_id) =>{

        let follow_section = document.getElementById("follows-section")

        //p 

        let new_p = document.createElement('p')

        //div

        let new_div = document.createElement('div')
        

        //img 
    
        let new_icon_pp = document.createElement("img")
        new_icon_pp.src = DefaultPP
        await axios.get(axiosUrlGetUserInfo+user_id)
                    .then(async res=>{
                        if(res.data !== "" && res.data.profile_picture !== ""){
                            new_icon_pp.src = res.data.profile_picture
                            let text = document.createTextNode(res.data.username)
                            new_p.appendChild(text)
                        }
                        else { // Alors notre utilisateur n'est pas dans la base de donées des utilisateurs ayant modifié leur page de profil
                            await axios.post(axiosUrlUser,{_id:`${user_id}`})
                                .then((res)=>{
                                    let text = document.createTextNode(res.data.username)
                                    new_p.appendChild(text)
                                })

                            }
                    })  


      
        new_p.id = "p_follow"
        new_div.id ="div_follow"
        new_div.className="div_follows_class"
        new_icon_pp.className="icon-pp-follows"
      


       
        new_div.appendChild(new_p)
        new_div.appendChild(new_icon_pp)

        new_div.addEventListener("click",(e)=>{
            if(id === user_id){
                navigate(`/profile/${id}`)
            }
            else {
                navigate(`/profile/${id}/${user_id}`)
            }
        })
        
        follow_section.insertBefore(new_div,follow_section.firstChild.nextSibling)

    }

    
    const handleClick = (evt) =>{
        evt.preventDefault()
        axios.post(axiosUrlUser,{_id:`${id}`})
        .then((res)=>{
          axios.put(axiosUrl,{id:res.data._id, email : res.data.email , password : res.data.password, isconnected : false } ) 
          .catch((err)=> console.log(err.response))
          navigate('/')
      })
      .catch(err =>{console.log(err)})
      }

    const handleChange = (evt) =>{
        if(evt.target.value.trim() !== ""){
          axios.get(axiosUrlGetUser+evt.target.value)
              .then((res)=>{
                  if(res.status === 200){
                    del_user()
                    getUsersInfos(res.data)
                  }
              })
              .catch((err)=>{
              del_user()
              showUserNotFound(evt.target.value)
            })
            }
        else {
          del_user()
        }
      }
  
      const showUserNotFound = (e) =>{
  
        let users_list = document.getElementById("listeusers-filter")
        let new_li = document.createElement('li')
        new_li.id = 'li'
        let new_not_found_text = document.createTextNode("Aucun résultat pour "+e)
        new_li.appendChild(new_not_found_text)
        users_list.appendChild(new_li)
      }
      const getUsersInfos = (data) =>{
        let usernames =  []
        let logins = []
        for(let i = 0 ; i < data.length ; i++){
          create_user(data[i].username,data[i]._id)
          usernames.push(data[i].username)
          logins.push(data[i]._id)
        }
      }
      const create_user = (username,login) =>{
          let users_list = document.getElementById("listeusers-filter")
  
          let new_li = document.createElement('li')
          new_li.id = 'li'
          new_li.className = login
          let new_username_text = document.createTextNode(username)
          new_li.appendChild(new_username_text)
          new_li.addEventListener('click',goToUserPage)
  
          console.log(users_list,new_li)
  
          users_list.appendChild(new_li)
         
  
         
      }
      function goToUserPage(){
        navigate(`/profile/${id}/${this.className}`)
  
      }
      
  
      const del_user = ()=>{
        let users  = document.getElementsByTagName("li")
        let users_list = document.getElementById("listeusers-filter")
        while(users.length > 4){
          users_list.removeChild(users_list.lastElementChild)
        }
      }
      const handleClickProfile = (evt) =>{
        navigate('/profile/'+id)
      }
      
      const handleSubmitFilter = (evt) =>{
        if(url.split('/')[3] === "filter"){
          axios.put(axiosSaveSession,{user_id:url.split('/')[4],session:`/filter/${url.split('/')[4]}/${evt.target.value}`})
          window.location.reload()
        }
        navigate('/filter/'+id+"/"+evt.target.value)
      }
      
    const onEnterKey = (evt) => {
        if(evt.keyCode === 13 && evt.shiftKey === false) {
          handleSubmitFilter(evt)
        }
      }

    return (
        <div id="follows-body">
            <Header title = "Abonnés" />
            <header>
            <img className="header-logo" src={Logo}  alt="Logo" />
            <div className="search-bar-section">
                <input type="text" className="search-bar-filter" placeholder="Rechercher utilisateur..." onChange={handleChange} />
            </div>
            <div className="profile-button-section">
            <div className="search-bar-post-section">
                <input type="text" className="search-bar-post-filter" placeholder="Rechercher post..." onKeyDown={onEnterKey} />
                <img id='icon-post-filter' src={Post}  alt='icon-post-filter'></img>
            </div>
            <button className="profile-button-filter" onClick={handleClickProfile}>Mon profil</button>
            </div>
            <div className="logout-button-section">
            <Link to="/"><button className="logout-button-filter" onClick={handleClick}>Déconnexion</button></Link>
            </div>
        </header>
        <ul  className="users" id="listeusers-filter"/>    
        <Navbar/> 
        <p id='p_follow_msg'>Abonnés :</p>
        <div id='follows-section'>{b_follows === 1 ? <p/>:<p id='no_follows'>{username} n'a pas d'abonnés</p>}</div>
        </div>
    )
}

export default Followers