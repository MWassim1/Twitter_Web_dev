import '../../css/demande-amis.css';
import axios from "axios"
import { useEffect,useState } from "react"
import Navbar from '../Home/navbar';
import Logo from "../../logo.png"
import Post from "../../image/post.png"
import { Link,useNavigate } from 'react-router-dom';
import AcceptIcon from "../../image/accept.png"
import DeniedIcon from "../../image/denied.png"
import DefaultPP from "../Profile/1.jpg"
import Header from '../x/header';






function FriendRequest(props){

    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)

    const axiosSaveSession = "http://localhost:7000/api/savesession"
    const axiosUrl = "http://localhost:7000/api/user/logout"
    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlGetUser = "http://localhost:7000/api/users/"
    const axiosUrlGetFriendRequest  = "http://localhost:7000/api/friendlist/"
    const axiosUrlResFriendRequest = "http://localhost:7000/api/friendlist/"
    const axiosUrlAddFriend = "http://localhost:7000/api/friend/"
    const axiosUrlGetUserInfo = "http://localhost:7000/api/userinfo/"

    const navigate = useNavigate()
    const [index_request,setIndexRequest] = useState(0)
    const [b_fr,setBFR] = useState(0) // Etat pour savoir si l'utilisateur a des demandes d'amis
    const [text,setText] = useState('')

    useEffect(()=>{
        axios.get(axiosUrlGetFriendRequest+id)
            .then(res=>{
                if(res.data[0].friends_id.length > 0){
                    setBFR(1)
                    let i = index_request
                    for(i;i<res.data[0].friends_id.length;i++){
                        create_request(res.data[0].friends_id[i],res.data[0].friends_login[i])
                    }
                    setIndexRequest(i)
                }
                else {
                    setBFR(0)
                }
            })
            .catch((err)=>{setBFR(0)})
    },[index_request])

    const create_request = async (user_id,user_login) =>{

        let fr_section = document.getElementById("friendRequest-section")

        //p 

        let new_p = document.createElement('p')

        //div

        let new_div = document.createElement('div')
        

        //img 

        let new_icon_accepted = document.createElement("img")
        let new_icon_denied = document.createElement("img")
        let new_icon_pp = document.createElement("img")
        new_icon_pp.src = DefaultPP
        await axios.get(axiosUrlGetUserInfo+user_id)
        .then(async res=>{
            if(res.data !== "" && res.data.profile_picture !== ""){
                if(res.data.profile_picture !== ""){
                  new_icon_pp.src = res.data.profile_picture
                }
            }
        })
        .catch((err)=>{})



        new_icon_accepted.src = AcceptIcon
        new_icon_denied.src = DeniedIcon

        //Text node 

        let new_text = document.createTextNode(user_login)

        new_p.appendChild(new_text)

      
        new_p.id = "p_fr"
        new_div.id ="div_fr"
        new_div.className="div_fr_class"
        new_icon_accepted.className="icon-accepted-fr"
        new_icon_denied.className="icon-denied-fr"
        new_icon_pp.className="icon-pp-fr"
      


       
        new_div.appendChild(new_p)
        new_div.appendChild(new_icon_accepted)
        new_div.appendChild(new_icon_denied)
        new_div.appendChild(new_icon_pp)

        new_div.addEventListener('click',(e)=>{
            if(e.target.matches(".icon-accepted-fr")){
                axios.put(axiosUrlResFriendRequest+id,{user_login:user_login,user_id:user_id})
                    .then(res=>{
                        axios.post(axiosUrlAddFriend+id+"/"+user_id)
                        .then(res=>{
                            setText(`Vous avez accepté en ami ${user_login}`)
                            document.getElementById("popup_accept_friend").style.visibility = "visible"
                            setIndexRequest(0)
                            delFR()
                        })
                    
                    })

            }
            else if(e.target.matches(".icon-denied-fr")){
                axios.put(axiosUrlResFriendRequest+id,{user_login:user_login,user_id:user_id})
                setIndexRequest(0)
                delFR()


            }
            else {
                navigate(`/profile/${id}/${user_id}`)
            }
        })

        fr_section.insertBefore(new_div,fr_section.firstChild.nextSibling)


    }

    const delFR = () =>{
        const fr_section = document.getElementById("friendRequest-section")
        while(fr_section.childNodes.length > 1){
            fr_section.removeChild(fr_section.lastElementChild)
        }
        

    }

    const handleHideAcceptFriend = (evt) =>{
        document.getElementById("popup_accept_friend").style.visibility = "hidden"
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
     
      //Affiche les utilisateurs recherchés
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
        <div id="friendRequest-body">
        <Header title="Demande d'amis"/>
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
        <Navbar/>
        <ul  className="users" id="listeusers-filter"/>
        {b_fr === 1 ? <p id='p_msg_fr'>Demandes d'amis : </p> : <p/>}
        <div id='friendRequest-section'>{b_fr === 1 ? <p/>:<p id='no_friends_request'>Vous n'avez pas de demandes d'amis</p>}</div>
        <div id="popup_accept_friend">
            <p id="text_popup_accept_friend">{text}</p>
            <button id="acceptfriend_pop_button" onClick={handleHideAcceptFriend}>OK</button>
        </div>


        </div>
    )
}

export default FriendRequest