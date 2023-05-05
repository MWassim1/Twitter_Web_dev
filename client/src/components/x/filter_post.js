import '../../css/filter.css';
import { useEffect, useState} from "react"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import Logo from "../../logo.png"
import Post from "../../image/post.png"
import CommentIcon from "../../image/commenter.png"
import DeleteIcon from "../../image/delete.png"
import FollowIcon from "../../image/follow.png"
import ReportIcon from "../../image/report.png"
import UnfollowIcon from "../../image/unfollow.png"
import Navbar from "../Home/navbar"
import DefaultPP from "../Profile/1.jpg"
import LikeIcon from "../../image/like.svg"



function FilterPost(props) {


  const axiosUrl = "http://localhost:7000/api/user/logout"
  const axiosUrlUser = "http://localhost:7000/api/user/:id"
  const axiosUrlGetUser = "http://localhost:7000/api/users/"
  const axiosFilterPost = "http://localhost:7000/api/posts/"
  const axiosUrlGetCommentwPost = "http://localhost:7000/api/post/comment/"
  const axiosSaveSession = "http://localhost:7000/api/savesession"
  const axiosUrlGetInfoFollow = "http://localhost:7000/api/user/followers/"
  const axiosUrlFollow = "http://localhost:7000/api/user/follow/"
  const axiosUrlDelFollow = "http://localhost:7000/api/user/follow/"
  const axiosUrlGetUserInfo = "http://localhost:7000/api/userinfo/"
  const axiosUrlLikedPost = "http://localhost:7000/api/postliked/"

  const url = window.location.href
  const id = url.split('/')[4]


  const [index_post,setIndexPost] = useState(0)
  // eslint-disable-next-line
  const [post,setPost] = useState('')
  const [textPopup,setTextPopup] = useState('')


  let nb_com = 0
  let nb_post = 0 
  let infoFollow = 0

  const navigate = useNavigate()

// Créé les posts avec le filtre
  useEffect(()=>{
    axios.get(axiosFilterPost+url.split('/')[5])
    .then((res)=>{
        if(res !== undefined){
            if(res.data.length > 0){
                let i = index_post
                for(i; i < res.data.length ; i ++){
                create_post(res.data[i])
                }
                setIndexPost(i)
            }
            else{
                create_nopost_filter()
            }
          }
       }).catch((err)=>{console.log(err)})
    } 
    // eslint-disable-next-line
    ,[post])
    

    const create_nopost_filter = () =>{

        let comment_section =  document.getElementById("comment-section-filter")
        
        let new_p_for_no_post  = document.createElement('p')

        let new_div = document.createElement('div')

        let new_text = document.createTextNode(`Aucun post trouvé pour '${url.split('/')[5]}'`)

        new_p_for_no_post.appendChild(new_text)

        new_div.appendChild(new_p_for_no_post)

        new_div.className="comment-filter"

        comment_section.insertBefore(new_div ,comment_section.firstChild.nextSibling)


    }
    const fetchNbComment = async (id) =>{
        await axios.get(axiosUrlGetCommentwPost+id)
        .then((res)=>{
          nb_com = res.data.length
        })
        .catch((err)=>{console.log(err)})
      }

      const fetchFollow = async(data) =>{
        await axios.get(axiosUrlGetInfoFollow+id)
              .then(res=>{
                if(res.data === "User not found"){
                  infoFollow = 0 
                }
                else if((res.data.follow).includes(data.user_id)){
                  infoFollow = 1 // Il follow déja l'utilisateur
                }
                else {
                  infoFollow = 0 
                }
              })
      }

    const create_post =  async (data) =>{
        let comment_section =  document.getElementById("comment-section-filter")
  
        // Récupère les commentaires pour le post data 
  
        await fetchNbComment(data._id)
  
        // Création des balises 
  
        // p :
  
        let new_p_for_comment= document.createElement('p')
        let new_p_for_date = document.createElement('p')
        let new_p_for_owner = document.createElement('p')
        let new_p_for_nbcomment = document.createElement('p')
        let new_p_for_report = document.createElement('p')
        let new_p_for_follow = document.createElement('p')
        let new_p_for_delete = document.createElement('p')
        let new_p_for_go_page = document.createElement('p')
        let new_p_for_unfollow = document.createElement('p')
  
        // div  : 
  
        let new_div_for_comment = document.createElement("div")
        let new_div_for_ul_options = document.createElement("div")
        let new_div_for_list_options = document.createElement("div")
        let new_div_for_main_dot = document.createElement('div')
        let new_div_for_dot1 = document.createElement('div')
        let new_div_for_dot2= document.createElement('div')
        let new_div_for_dot3 = document.createElement('div')
  
        // br : 
  
        let new_br1_for_space = document.createElement("br")
        let new_br2_for_space = document.createElement("br")

          
        // img :
  
        let new_icon_comment = document.createElement("img")
        let new_icon_delete = document.createElement("img")
        let new_icon_follow = document.createElement("img")
        let new_icon_report = document.createElement("img")
        let new_icon_unfollow = document.createElement("img")
        let new_icon_pp   = document.createElement("img")
        let new_icon_like  = document.createElement("img")
        new_icon_like.src = LikeIcon
        new_icon_comment.src = CommentIcon
        new_icon_delete.src = DeleteIcon
        new_icon_follow.src = FollowIcon
        new_icon_report.src = ReportIcon
        new_icon_unfollow.src = UnfollowIcon
        new_icon_pp.src = DefaultPP
        await axios.get(axiosUrlGetUserInfo+data.user_id)
          .then(async res=>{
              if(res.data !== "" && res.data.profile_picture !== ""){
                  new_icon_pp.src = res.data.profile_picture
              }
          }) 
          .catch((err)=>{})


  
  
        // Création des texteNode : 
        let new_comment = document.createTextNode(data.post)
        let new_nbcomment = document.createTextNode(nb_com)
        let new_report = document.createTextNode("Signaler le post")
        let new_follow = document.createTextNode(`Suivre ${data.username}`)
        let new_delete = document.createTextNode("Supprimer le post")
        let new_gopage = document.createTextNode(`Voir la page de profile de ${data.username}`)
        let new_unfollow = document.createTextNode(`Ne plus suivre ${data.username}`)
  
        const date = new Date(data.createdAt)
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
  
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
  
        
        var minutes = '0'
        var hours = '0'
        if(date.getMinutes() < 10){
          minutes += date.getMinutes()
        }
        else {minutes = date.getMinutes()}
        if(date.getHours() === '0'){hours+='0'}
        else{hours=date.getHours()}
  
        let new_date = document.createTextNode(`${hours}:${minutes} - ${day}/${month}/${year}`)
        let new_owner = document.createTextNode(`${data.username}`)
     
        new_p_for_comment.appendChild(new_comment)
        new_p_for_date.appendChild(new_date)
        new_p_for_owner.appendChild(new_owner)
        new_p_for_nbcomment.appendChild(new_nbcomment)
        new_p_for_delete.appendChild(new_delete)
        new_p_for_report.appendChild(new_report)
        new_p_for_follow.appendChild(new_follow)
        new_p_for_go_page.appendChild(new_gopage)
        new_p_for_unfollow.appendChild(new_unfollow)
        
  
        new_p_for_comment.className = "comment-content"
        new_p_for_date.className = "comment-date"
        new_p_for_owner.className = "comment-owner"
        new_icon_comment.className="icon-comment-filter"
        new_div_for_dot1.className="dot" 
        new_div_for_dot2.className="dot" 
        new_div_for_dot3.className="dot" 
        new_icon_delete.className="icon-delete"
        new_icon_follow.className="icon-follow"
        new_icon_report.className="icon-report"
        new_icon_unfollow.className="icon-unfollow"
        new_icon_pp.className="icon-pp-filter-post"
        new_icon_like.className="icon-like-post"
        
  
     
        new_div_for_comment.appendChild(new_icon_pp)
        new_div_for_main_dot.append(new_div_for_dot1)
        new_div_for_main_dot.append(new_div_for_dot2)
        new_div_for_main_dot.append(new_div_for_dot3)
  
        new_div_for_ul_options.appendChild(new_div_for_main_dot)
  
        new_div_for_comment.appendChild(new_p_for_comment)
        new_div_for_comment.appendChild(new_p_for_date)
        new_div_for_comment.appendChild(new_p_for_owner)
        new_div_for_comment.appendChild(new_br1_for_space)
        new_div_for_comment.appendChild(new_br2_for_space)
        new_div_for_comment.appendChild(new_p_for_nbcomment)
  
        new_div_for_list_options.appendChild(new_p_for_go_page)
       if( data.user_id === id){
        new_div_for_list_options.appendChild(new_p_for_delete)
        new_p_for_delete.appendChild(new_icon_delete)
        new_p_for_nbcomment.className ="nb-comment-filter"
       }
       else {
        await fetchFollow(data)
        if(infoFollow === 0){
          new_div_for_list_options.appendChild(new_p_for_follow) 
          new_p_for_follow.appendChild(new_icon_follow)
      }
      else{
        new_div_for_list_options.appendChild(new_p_for_unfollow) 
        new_p_for_unfollow.appendChild(new_icon_unfollow)
      }
        new_div_for_list_options.appendChild(new_p_for_report)
        new_p_for_report.appendChild(new_icon_report)
        new_p_for_nbcomment.className ="nb-comment2-filter"
       }
        new_div_for_comment.appendChild(new_div_for_ul_options)
        new_div_for_comment.appendChild(new_div_for_list_options)
  
        new_div_for_dot1.id = "option_"+nb_post
        new_div_for_dot2.id = "option_"+nb_post
        new_div_for_dot3.id = "option_"+nb_post
        new_div_for_main_dot.id = "option_"+nb_post
        new_div_for_list_options.id="list_option_"+nb_post
  
  
        new_p_for_delete.className="p_li"
        new_p_for_follow.className="p_li"
        new_p_for_report.className="p_li"
        new_p_for_go_page.className="p_li"
        new_p_for_unfollow.className="p_li"
  
        new_div_for_comment.className="comment-filter"
        new_div_for_main_dot.className="ul_options-filter"
        new_div_for_list_options.className="ul_list_options-filter"
  
        new_p_for_go_page.id = "goPageUser"
        new_p_for_follow.id="followUser"
        new_p_for_unfollow.id="unfollowUser"
  
        
        new_div_for_comment.appendChild(new_icon_like)
        await axios.get(axiosUrlLikedPost+id)
                    .then(res=>{
                      if(res.data.length !== 0 ){ 
                        if((res.data[0].posts_liked).includes((data._id).toString())){
                          new_icon_like.style.filter = "invert(14%) sepia(72%) saturate(7490) hue-rotate(359deg) brightness(97%) contrast(116%)"
                        }
                    }
                    })
        new_div_for_comment.appendChild(new_icon_comment)
        new_div_for_comment.addEventListener('click',(e)=>{
         if(e.target.matches(".dot") || e.target.matches(".ul_options-filter")){
              document.getElementById("list_"+e.target.id).style.visibility === "visible" ? document.getElementById("list_"+e.target.id).style.visibility = "hidden" : document.getElementById("list_"+e.target.id).style.visibility = "visible"
         }
         else if (e.target.matches("#goPageUser")){
            if(data.user_id !== id){
              navigate(`/profile/${id}/${data.user_id}`)
            }
            else{
              navigate(`/profile/${id}`)
            }
         }
         else if(e.target.matches("#followUser")|| e.target.matches(".icon-follow")){

          axios.put(axiosUrlFollow+id+"/"+data.user_id)
          .then((res)=>{
            setTextPopup(`Vous suivez désormais ${data.username}`)
            document.getElementById("popup_add_follow").style.visibility = "visible"
          })    
         }
         else if(e.target.matches("#unfollowUser")|| e.target.matches(".icon-unfollow")){
          axios.delete(axiosUrlDelFollow+id+"/"+data.user_id)
          .then((res)=>{
              setTextPopup(`Vous ne suivez plus ${data.username}`)
              document.getElementById("popup_add_follow").style.visibility = "visible"
          })
        } 
        else if(e.target.matches(".icon-like-post")){
          if(e.target.style.filter === "invert(14%) sepia(72%) saturate(7490) hue-rotate(359deg) brightness(97%) contrast(116%)")
          {
            axios.delete(axiosUrlLikedPost+id+"/"+(data._id).toString())
            e.target.style.filter = "invert(0%) sepia(100%) saturate(0%) hue-rotate(248deg) brightness(96%) contrast(107%)"
          }
          else{
            axios.put(axiosUrlLikedPost+id+"/"+(data._id).toString())
            e.target.style.filter = "invert(14%) sepia(72%) saturate(7490) hue-rotate(359deg) brightness(97%) contrast(116%)"

          }
    }    

         else {
          navigate(`/post/${id}/${data._id}`)
         }
  
        })
        comment_section.insertBefore(new_div_for_comment ,comment_section.firstChild.nextSibling)
        nb_post+=1
  
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
        console.log(username,login)
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

    const handleHideFollow = (evt) =>{
      document.getElementById("popup_add_follow").style.visibility = "hidden"
    }
    
    return (<div id='filter-section'>
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
    <div id="comment-section-filter" className="comment-list-section">
      <h2>Liste posts</h2>
      <div className="comment-filter">
        <p></p>
      </div>
    </div>
    <div id="popup_add_follow">
        <p id="text_popup_add_follow">{textPopup}</p>
        <button id="addfollow_pop_button" onClick={handleHideFollow}>OK</button>
    </div>
     </div>
    )

}

export default FilterPost