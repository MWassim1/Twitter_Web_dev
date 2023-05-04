import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import DefaultPP from "./1.jpg"
import axios from "axios"
import CommentIcon from "../../image/commenter.png"
import DeleteIcon from "../../image/delete.png"
import FollowIcon from "../../image/follow.png"
import ReportIcon from "../../image/report.png"
import DeleteFriendIcon from "../../image/delete-friend.png"
import UnfollowIcon from "../../image/unfollow.png"


function Profile_area(props){


    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlGetPosts = "http://localhost:7000/api/post/"
    const axiosUrlGetCommentwPost = "http://localhost:7000/api/post/comment/"
    const axiosUrlNewPost = "http://localhost:7000/api/post"
    const axiosUrlGetFriend = "http://localhost:7000/api/friend/"
    const axiosSaveSession = "http://localhost:7000/api/savesession"
    const axiosUrlDelFriend = "http://localhost:7000/api/friend/"
    const axiosUrlGetAllInfo = "http://localhost:7000/api/userinfo/"
    const axiosUrlIsMyFriend = "http://localhost:7000/api/friend/"
    const axiosUrlAddFriend = "http://localhost:7000/api/friendlist/"
    const axiosUrlFollow = "http://localhost:7000/api/user/follow/"
    const axiosUrlGetInfoFollow = "http://localhost:7000/api/user/followers/"
    const axiosUrlDelFollow = "http://localhost:7000/api/user/follow/"
    const axiosUrlWaitResFR = "http://localhost:7000/api/friendlist/"

    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)
    let  username2 = ""
    let infoFollow = 0 

    const navigate = useNavigate()
    const [comment,setComment] = useState('')
    const [lastname,setLastname]  = useState('')
    const [firstname,setFirstname]  = useState('')
    const [username,setUsername] = useState('')
    const [index_post,setIndexPost] = useState(0)
    const [index_friend,setIndexFriend] = useState(0)
    const [post,setPost] = useState('')
    const [age,setAge] = useState(null)
    const [bio,setBio] = useState('')
    const [city,setCity] = useState('')
    const [country,setCountry] = useState('')
    const [profilePicture,setPP] =  useState('')
    const [ismypage,setIsMyPage] = useState(1)
    const [popup_del_user,setPopUpDelUser] = useState('')
    const [popup_del_user_id,setPopUpDelUserID] = useState('')
    const [textPopup,setTextPopup] = useState('')
    const [nbFollowers,setNbFollowers] = useState(0)
    const [nbFollowedBy,setNbFollowedBy] = useState(0)
    const [isFollow,setIsFollow] = useState(0)
    const [askFriend,setAskFriend] = useState(0)
    const areainput = useRef(null)

    let nb_com = 0
    let nb_post = 0


    useEffect(()=>{
      axios.post(axiosUrlUser,{_id:`${id}`})
        .then(res=>{
          if(res.status === 200){
            axios.get(axiosUrlGetAllInfo+id)
              .then(res2 =>{
              if(res2.data === ""){
                setLastname(res.data.lastname)
                setFirstname(res.data.firstname)
                setUsername(res.data.username)
                // eslint-disable-next-line
                username2 = res.data.username
              }
              else {
                setLastname(res2.data.lastname)
                setFirstname(res2.data.firstname)
                setUsername(res2.data.username)
                setAge(res2.data.age)
                setCity(res2.data.ville)
                setCountry(res2.data.pays)
                setPP(res2.data.profile_picture)
                setBio(res2.data.bio)
                username2 = res.data.username
              }

            })
            .catch((err)=>{console.log(err)})
          } 
        })
        .catch((err)=>{console.log(err);navigate('/')})
  },[])
  useEffect(()=>{
    axios.get(axiosUrlWaitResFR+url.split("/")[4]+"/"+id)
    .then((res)=>{
      if(res.data.alreadyAsk === true){
        // Alors on bloque le boutton pour ajouter en ami
        document.getElementById("addFriend-button").disabled = true
        document.getElementById("addFriend-button").innerText = "Demande envoyé"

      }
      else {
        try{
          document.getElementById("addFriend-button").disabled = false
        }catch(err){}
      }
    })
  },[askFriend])
  
  useEffect(()=>{
    axios.get(axiosUrlGetInfoFollow+id)
          .then(res=>{
            setNbFollowedBy( (res.data.followedBy).length)
            setNbFollowers((res.data.follow).length)
          })
          .catch((err)=>{})

  },[isFollow])

  useEffect(()=>{
    axios.get(axiosUrlGetFriend+id)
    .then((res)=>{
        if(res.data  === "No friends"){create_nofriend()}
        else{
          let i_friend = index_friend
          for(i_friend ; i_friend < res.data.friends_login.length ; i_friend ++){
            create_friend(res.data.friends_login[i_friend],res.data.friends_id[i_friend])
          }
          setIndexFriend(i_friend)
        }
    })
    .catch((err)=>{console.log(err);create_nofriend()})
// eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(url.split('/').length === 6){
      setIsMyPage(0)
      axios.get(axiosUrlIsMyFriend+url.split('/')[4]+"/"+id)
            .then(res=>{
              if(res.data.ismyfriend === true){
                document.getElementById("addFriend-button").innerText = "Supprimer de la liste d'amis"
                document.getElementById("addFriend-button").id = "delFriend-button"
              }
            })
            .catch(err=>{console.log(err)})
  }
  // eslint-disable-next-line
  },[])

  
  useEffect(()=>{
    if(url.split('/').length === 5 ){
      axios.put(axiosSaveSession,{user_id:id,session:`/profile/${id}`})
        .catch((err)=>{console.log(err)})
    }
    else if (url.split('/').length === 6) {
      axios.put(axiosSaveSession,{user_id:url.split('/')[4],session:`/profile/${url.split('/')[4]}/${url.split('/')[5]}`})
        .catch((err)=>{console.log(err)})

    }
    // eslint-disable-next-line
  },[])

 
  const create_nofriend = async () =>{
    let friend_section = document.getElementById("ul_friend")
    

    let new_li_for_friend  = document.createElement('li')
    new_li_for_friend.id  = "li_friend"

    let new_text_for_friend = document.createTextNode("Aucun ami...")
    new_li_for_friend.appendChild(new_text_for_friend)
    friend_section.appendChild(new_li_for_friend)

  }


  const create_friend = async (friend_login,friend_id) =>{
  
    let friend_section = document.getElementById("ul_friend")
    
    // li
    let new_li_for_friend  = document.createElement('li')

    // p 

    let new_p_for_delete_friend  = document.createElement('p')
    let new_p_for_go_friend = document.createElement('p')
    let new_p_for_friend = document.createElement('p')

    // div 

    let new_div_for_list_options = document.createElement("div")
    let new_div_for_delete_friend = document.createElement('div')
    let new_div_for_go_friend = document.createElement('div')
    
    // img

    let new_icon_delete_friend = document.createElement('img')
    new_icon_delete_friend.src = DeleteFriendIcon


    // texteNode

    let new_text_for_friend = document.createTextNode(friend_login)
    let new_text_for_delete_friend = document.createTextNode("Supprimer des amis")
    let new_text_for_go_page = document.createTextNode("Voir la page de profil")

    new_p_for_friend.appendChild(new_text_for_friend)
   
    new_p_for_go_friend.appendChild(new_text_for_go_page)
    new_p_for_delete_friend.appendChild(new_text_for_delete_friend)
    new_p_for_delete_friend.appendChild(new_icon_delete_friend)


    new_div_for_go_friend.appendChild(new_p_for_go_friend)
    new_div_for_delete_friend.appendChild(new_p_for_delete_friend)
    if(url.split('/').length === 5){
      new_div_for_list_options.appendChild(new_div_for_delete_friend)
    }
    new_div_for_list_options.appendChild(new_div_for_go_friend)

    new_li_for_friend.appendChild(new_p_for_friend)
    new_li_for_friend.appendChild(new_div_for_list_options)

    new_p_for_friend.id = "text_friend"
    new_p_for_friend.className = friend_id
    new_div_for_list_options.className = "list_options_friend"
    new_div_for_list_options.id = "list_options_"+friend_id
    new_p_for_delete_friend.id = "p_delete_friend"
    new_p_for_go_friend.id = "p_go_friend"
    new_p_for_go_friend.className = friend_id
    new_li_for_friend.id  = "li_friend"
    new_li_for_friend.className  = friend_id

    new_icon_delete_friend.className = "delete_friend_icon"

    new_li_for_friend.addEventListener('click',(e)=>{
      if(e.target.matches("#text_friend")){
        document.getElementById("list_options_"+e.target.className).style.visibility === "visible" ? document.getElementById("list_options_"+e.target.className).style.visibility = "hidden" : document.getElementById("list_options_"+e.target.className).style.visibility = "visible"
      }
      else if(e.target.matches("#p_delete_friend")){
        console.log("delete friend")
        confirmDelete(friend_login,friend_id)
      }
      else if(e.target.matches("#p_go_friend")){
        if(e.target.className === url.split('/')[4]){
          axios.put(axiosSaveSession,{user_id:url.split('/')[4],session:`/profile/${url.split('/')[4]}`})
          .then(res=>{
            navigate(`/profile/${url.split('/')[4]}`)
            window.location.reload()
          })
          .catch(err=>{console.log(err)})
        }
        else {
        axios.put(axiosSaveSession,{user_id:id,session:`/profile/${id}/${e.target.className}`})
              .then(res=>{  
                e.preventDefault()
                navigate(`${id}/${e.target.className}`)
                window.location.reload()
              })
              .catch(err=>{console.log(err)})
            }
      }
    })

    friend_section.appendChild(new_li_for_friend)

  }

  const confirmDelete = (friend_login,friend_id) =>{
  setPopUpDelUser(friend_login)
  setPopUpDelUserID(friend_id)
  let popup = document.getElementById("popup_delete")
  popup.style.visibility = "visible"
  

  }
  const handleCancelDelete = () =>{
    document.getElementById("popup_delete").style.visibility = "hidden"
  }

  const handleClickConfirmDelete = () =>{
    if(id !== popup_del_user_id ){
      axios.delete(axiosUrlDelFriend+id+"/"+popup_del_user_id)
          .then(res=>{
                document.getElementById("popup_delete").style.visibility = "hidden"
                document.getElementById("popup_confirm_msg").style.visibility = "visible"
          })
      }
      else {
        axios.delete(axiosUrlDelFriend+url.split('/')[4]+"/"+popup_del_user_id)
          .then(res=>{
                document.getElementById("popup_delete").style.visibility = "hidden"
                document.getElementById("popup_confirm_msg").style.visibility = "visible"
          })
      }

  }
  const handleClickConfirmPopupMsg = () =>{
    document.getElementById("popup_confirm_msg").style.visibility = "hidden"
    window.location.reload()
  }



  useEffect(()=>{
    axios.get(axiosUrlGetPosts+id)
      .then(res=>{
        if(res !== undefined){
          let i = index_post
          for(i; i < res.data.length ; i ++){
            create_post(res.data[i])
          }
          setIndexPost(i)
        }
     }).catch((err)=>{
        create_nopost()
     })
  } 
  // eslint-disable-next-line
  ,[post])

  // Récupère les informations liées aux follows 

  useEffect(()=>{
    axios.get(axiosUrlGetInfoFollow+url.split("/")[4])
            .then(res=>{
              if(res.data === "User not found"){
                infoFollow = 0 
                setIsFollow(0)
              }
              else if((res.data.follow).includes(id)){
                infoFollow = 1 // Il follow déja l'utilisateur
                setIsFollow(1)
              }
              else {
                infoFollow = 0 
                setIsFollow(0)
              }
            })
            .catch(err=>{})
  })
  const create_nopost = async () =>{
    let b = 0 
    await axios.get(axiosUrlIsMyFriend+url.split('/')[4]+"/"+id)
            .then(res=>{
              if(res.data.ismyfriend === false){
                document.getElementById("addFriend-button").id = "addFriend-button2"
              }
              else {
                b  = 1
              }
            })
            .catch(err=>{console.log(err)})
    if(b === 1 ){
      let body = document.getElementById('profile-body')
      let button = document.createElement('button')
      button.innerText = "Supprimer de la liste d'amis"
      button.addEventListener('click',(e)=>{
        confirmDelete(username2,id)
      })

      button.id = "delFriend-button2"
      body.append(button)
      document.getElementById("addFriend-button").innerText = "Supprimer de la liste d'amis"
      document.getElementById("addFriend-button").id = "delFriend-button2"
    }
    let comment_section =  document.getElementById("comment-profile")
    let new_text_nopost  = document.createTextNode('Aucun post disponible')
    let new_p_for_nopost = document.createElement('p')
    new_p_for_nopost.id = "my_page_nopost"
    if(url.split('/').length === 6){
      comment_section =  document.getElementById("comment-profile2")
      new_p_for_nopost.id = "not_my_page_nopost"

    
    }


    

    let new_div_nopost = document.createElement('div')

    new_p_for_nopost.appendChild(new_text_nopost)
    new_div_nopost.appendChild(new_p_for_nopost)
    comment_section.appendChild(new_div_nopost)

  }
  const fetchNbComment = async (id) =>{
    await axios.get(axiosUrlGetCommentwPost+id)
    .then((res)=>{
      nb_com = res.data.length
    })
    .catch((err)=>{console.log(err)})
  }
  

  const create_post =  async (data) =>{

    let comment_section =  document.getElementById("comment-profile")
    
    // Supprime la div quand on post notre premier post 
    try{
      if(comment_section.childNodes[1].innerText === "Aucun post disponible"){
        comment_section.removeChild(comment_section.lastElementChild)
      }
    }
    catch{
     
    }


    if(url.split('/').length === 6){
      comment_section = document.getElementById("comment-profile2")
    }

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


    // button : 

    let new_button_ = document.createElement("button")

    

    // img :

    let new_icon_comment = document.createElement("img")
    let new_icon_delete = document.createElement("img")
    let new_icon_follow = document.createElement("img")
    let new_icon_report = document.createElement("img")
    let new_icon_unfollow = document.createElement("img")
    new_icon_comment.src = CommentIcon
    new_icon_delete.src = DeleteIcon
    new_icon_follow.src = FollowIcon
    new_icon_report.src = ReportIcon
    new_icon_unfollow.src= UnfollowIcon

    // Création des texteNode : 
    let new_comment = document.createTextNode(data.post)
    let new_nbcomment = document.createTextNode(nb_com)
    let new_report = document.createTextNode("Signaler le post")
    let new_follow = document.createTextNode(`Suivre ${data.username}`)
    let new_unfollow = document.createTextNode(`Ne plus suivre ${data.username}`)
    let new_delete = document.createTextNode("Supprimer le post")

    const date = new Date(data.createdAt)
    console.log()
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
    let new_button = document.createTextNode("Ajouter")

    new_button_.appendChild(new_button)
    new_p_for_comment.appendChild(new_comment)
    new_p_for_date.appendChild(new_date)
    new_p_for_owner.appendChild(new_owner)
    new_p_for_nbcomment.appendChild(new_nbcomment)
    new_p_for_delete.appendChild(new_delete)
    new_p_for_report.appendChild(new_report)
    new_p_for_follow.appendChild(new_follow)
    new_p_for_unfollow.appendChild(new_unfollow)
    

    new_p_for_comment.className = "comment-content"
    new_p_for_date.className = "comment-date"
    new_p_for_owner.className = "comment-owner"
    new_icon_comment.className="icon-comment_profile"
    new_icon_unfollow.className="icon-unfollow"
    new_div_for_dot1.className="dot_profile" 
    new_div_for_dot2.className="dot_profile" 
    new_div_for_dot3.className="dot_profile" 
    new_icon_delete.className="icon-delete"
    new_icon_follow.className="icon-follow"
    new_icon_report.className="icon-report"
    

 

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


   if( data.user_id === id && url.split('/').length === 5){
    new_div_for_list_options.appendChild(new_p_for_delete)
    new_p_for_delete.appendChild(new_icon_delete)
    new_p_for_nbcomment.className ="nb-comment_profile"
   }
   else if(url.split('/').length === 6){
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
    new_p_for_nbcomment.className ="nb-comment3_profile"
   }
   
   else{
    new_div_for_list_options.appendChild(new_p_for_follow) 
    new_p_for_follow.appendChild(new_icon_follow)
    new_div_for_list_options.appendChild(new_p_for_report)
    new_p_for_report.appendChild(new_icon_report)
    new_p_for_nbcomment.className ="nb-comment2_profile"
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
    new_p_for_unfollow.className="p_li"

    new_div_for_comment.className="comment_profile"
    if(url.split('/').length === 6){
      new_div_for_comment.className="comment_profile2"
    }
    new_div_for_main_dot.className="ul_options_profile"
    new_div_for_list_options.className="ul_list_options_profile"

    
    new_p_for_follow.id="followUser"
    new_p_for_unfollow.id="unfollowUser"

    new_div_for_comment.appendChild(new_button_)

    new_div_for_comment.appendChild(new_icon_comment)
    new_div_for_comment.addEventListener('click',(e)=>{
     if(e.target.matches(".dot_profile") || e.target.matches(".ul_options_profile")){
          document.getElementById("list_"+e.target.id).style.visibility === "visible" ? document.getElementById("list_"+e.target.id).style.visibility = "hidden" : document.getElementById("list_"+e.target.id).style.visibility = "visible"
     }
     else if (e.target.matches("#followUser")|| e.target.matches(".icon-follow")){
      followUser()
     }
     else if(e.target.matches("#unfollowUser") || e.target.matches(".icon-unfollow")){
      unfollowUser()
    }      
     else {
      navigate(`/post/${id}/${data._id}`)
     }

    })
    comment_section.insertBefore(new_div_for_comment ,comment_section.firstChild.nextSibling)
    nb_post+=1

  }


  const onEnterKey = (evt) => {
    if(evt.keyCode === 13 && evt.shiftKey === false) {
      handleAdd(evt)
    }
  }
  const handleAdd = (evt) =>{
    evt.preventDefault()
    if(comment.trim() !== ""){
    axios.post(axiosUrlNewPost,{user_id:id,username:username,post:comment})
        .then(res=>{
          setPost(res.data)
          areainput.current.value = ""
          setComment("")
          
        })
        .catch((err)=>{console.log(err)})
      }
  }
  const handleChange = (evt) =>{
    setComment(evt.target.value)
  }

  const handleClickEditProfile = (evt) => {
    evt.preventDefault()
    navigate(`/editprofile/${id}`)
  }
  const handleClickAddorDelete = (evt) =>{
    if(evt.target.matches("#addFriend-button2") || evt.target.matches("#addFriend-button")){
      axios.put(axiosUrlAddFriend+url.split('/')[4]+"/"+id)
      .then(res=>{
        setAskFriend(1) // Pour recharger le useEffect
        document.getElementById("popup_add_friend").style.visibility = "visible" 

      })
      .catch(err=>{console.log(err)})
    }
    else{
      confirmDelete(username,id)
      
    }
  }
  const handleHideFollow = (evt) =>{
    document.getElementById("popup_add_follow").style.visibility = "hidden"
  }
  
  const handleHideAddFriend = (evt) =>{
    document.getElementById("popup_add_friend").style.visibility = "hidden"
  }
  const followUser = (evt) =>{
    axios.put(axiosUrlFollow+url.split('/')[4]+"/"+id)
      .then((res)=>{
        setTextPopup(`Vous suivez désormais ${username}`)
        document.getElementById("popup_add_follow").style.visibility = "visible"
      })    
  }

  const unfollowUser = (evt) =>{
    axios.delete(axiosUrlDelFollow+url.split("/")[4]+"/"+id)
    .then((res)=>{
        setTextPopup(`Vous ne suivez plus ${username}`)
        document.getElementById("popup_add_follow").style.visibility = "visible"
    })
  }
  const handleClickShowFollows = (evt) =>{
    if(url.split("/").length === 5 ){
      navigate(`/follows/${id}`)
    }
    else if (url.split("/").length === 6){
      navigate(`/follows/${url.split('/')[4]}/${id}`)
    }
  }
  const handleClickShowFollowers = (evt) =>{
    if(url.split('/').length === 5){
      navigate(`/followers/${id}`)
    }
    else if(url.split("/").length === 6 ){
      navigate(`/followers/${url.split('/')[4]}/${id}`)
    }


  }
    return <div className='profile-body' id='profile-body'>
        <div id="infoFollowers"><p id="nbFollowers" onClick={handleClickShowFollows}>{nbFollowers} Abonnements</p> <p id="nbFollowers2" onClick={handleClickShowFollowers}>{nbFollowedBy} abonnés</p>
          {ismypage === 0 ? isFollow === 1 ? <button id="unfollow_button" onClick={unfollowUser}>Ne plus suivre</button> : <button id="follow_button" onClick={followUser}>Suivre</button>: <p/>}
        </div>
        <div className="profile-section">
        { ismypage === 1 ? profilePicture !== ''? <img className="profile-picture" src={profilePicture}  alt=""  /> : <img className="profile-picture" src={DefaultPP} alt=""   />:profilePicture !== ''? <img className="not_my_profile-picture" src={profilePicture} alt=""  /> : <img className="not_my_profile-picture" src={DefaultPP}  alt="" /> }
        
        { ismypage === 1 ? <div className="profile-info"><h2>{lastname} {firstname} ({username})<br/>{country} {city}</h2>{ age !== null?<p>  Age : {age} ans</p> :<p id="p_no_age" onClick={handleClickEditProfile} >Ajoutez votre âge</p> }{ bio !== ''?<p>Biographie : {bio}</p> : <p id="p_no_bio" onClick={handleClickEditProfile}>Ajoutez une bio </p>}
        </div> : <div className="profile-info" id="not_my_page_profile-info"><h2>{lastname} {firstname}  ({username})<br/>{country} {city}</h2>{ age !==null? <p>  Age : {age} ans</p> :<p/> }{ bio !== ''?<p>Biographie : {bio}</p> : <p />}</div>}
        { ismypage === 0 ?<button id="addFriend-button" onClick={handleClickAddorDelete}>Ajouter en ami</button>:<p/>}
        
        <div className="profile-comment-section">
      
      { ismypage === 1 ? <textarea id='areainput' ref = {areainput} value={comment} onKeyDown={onEnterKey} onChange={handleChange} placeholder="Entrez votre post ici..." ></textarea>:<p></p>}
      {ismypage ===1 ? <button  onClick={handleAdd}>Ajouter</button>: <p/>}
      </div>
      {ismypage ===1 ? <div  id="comment-profile" className="comment-profile">  </div> : <div  id="comment-profile2" className="not_my_page_comment-profile">  </div>}
      {ismypage === 1 ? <div className="friend-list"><h3>Liste d'amis</h3><ul id="ul_friend"></ul></div> : <div id="not_my_page_friend_list2" className="friend-list"> <h3 id="h3_friend_list">Liste d'amis</h3><ul id="ul_friend"/></div>}
    </div>
    <div id="popup_delete">
    <p id="text_popup_delete">Êtes-vous certains de vouloir supprimer {popup_del_user} de votre liste d'amis ?</p>
    <button id="del_pop_button" onClick={handleClickConfirmDelete}>Supprimer</button>
      <button id="cancel_pop_button" onClick={handleCancelDelete}>Annuler</button>
    </div>
    <div id="popup_confirm_msg">
    <p id="text_popup_delete">{popup_del_user} a été supprimé de votre liste d'amis </p>
    <button id="confirm_pop_msg_button" onClick={handleClickConfirmPopupMsg}>OK</button>
    </div>
    <div id="popup_add_friend">
    <p id="text_popup_add_friend">Vous avez demandé en ami {username} </p>
      <button id="addfriend_pop_button" onClick={handleHideAddFriend}>OK</button>
    </div>
    <div id="popup_add_follow">
        <p id="text_popup_add_follow">{textPopup}</p>
        <button id="addfollow_pop_button" onClick={handleHideFollow}>OK</button>
    </div>
    </div>
}

export default Profile_area