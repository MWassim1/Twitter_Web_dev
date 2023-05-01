import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import DefaultPP from "./1.jpg"
import axios from "axios"
import CommentIcon from "../../image/commenter.png"
import DeleteIcon from "../../image/delete.png"
import FollowIcon from "../../image/follow.png"
import ReportIcon from "../../image/report.png"
import NoProfilePicture from "../../image/add_profile_picture.png"
import DeleteFriendIcon from "../../image/delete-friend.png"


function Profile_area(props){


    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlGetPosts = "http://localhost:7000/api/post/"
    const axiosUrlGetCommentwPost = "http://localhost:7000/api/post/comment/"
    const axiosUrlNewPost = "http://localhost:7000/api/post"
    const axiosUrlGetFriend = "http://localhost:7000/api/friend/"
    const axiosSaveSession = "http://localhost:7000/api/savesession"
    const axiosUrlDelFriend = "http://localhost:7000/api/friend/"
    const axiosUrlGetAllInfo = "http://localhost:7000/api/userinfo/"


    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)

    const navigate = useNavigate()
    console.log("ID : ",id)
    const [comment,setComment] = useState('')
    const [lastname,setLastname]  = useState('')
    const [firstname,setFirstname]  = useState('')
    const [username,setUsername] = useState('')
    const [index_post,setIndexPost] = useState(0)
    const [index_friend,setIndexFriend] = useState(0)
    const [post,setPost] = useState('')
    const [age,setAge] = useState('')
    const [bio,setBio] = useState('')
    const [profilePicture,setPP] =  useState('')
    const [ismypage,setIsMyPage] = useState(1)
    const [popup_del_user,setPopUpDelUser] = useState('')
    const [popup_del_user_id,setPopUpDelUserID] = useState('')

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
              }
              else {
                setLastname(res2.data.lastname)
                setFirstname(res2.data.firstname)
                setUsername(res2.data.username)
                setAge(res2.data.age)
                setPP(res2.data.profile_picture)
                setBio(res2.data.bio)
              }
            
            })
            .catch((err)=>{console.log(err)})
          } 
        })
        .catch((err)=>{console.log(err);navigate('/')})
  },[])

  useEffect(()=>{
    axios.get(axiosUrlGetFriend+id)
    .then((res)=>{
      console.log("Friends  : ",res.data,res.data.friends_login.length,index_friend)
        if(res.data.friends_id.length === 0){create_nofriend()}
        else{
          let i_friend = index_friend
          for(i_friend ; i_friend < res.data.friends_login.length ; i_friend ++){
            create_friend(res.data.friends_login[i_friend],res.data.friends_id[i_friend])
          }
          setIndexFriend(i_friend)
        }
    })
    .catch((err)=>{console.log(err);create_nofriend()})

  },[])

  useEffect(()=>{
    console.log("URL MY PAGE : ",url.split('/'))
    if(url.split('/').length === 6){
      setIsMyPage(0)
  }
  },[])
  useEffect(()=>{
    axios.put(axiosSaveSession,{user_id:id,session:"/profile/"+`${id}`})
      .then((res)=>{console.log("SAVE SESSION OK")})
      .catch((err)=>{console.log(err)})
  },[])
  const create_nofriend = async () =>{
    console.log("NO FRIEND")
    let friend_section = document.getElementById("ul_friend")
    

    let new_li_for_friend  = document.createElement('li')
    new_li_for_friend.id  = "li_friend"

    let new_text_for_friend = document.createTextNode("Aucun ami...")
    new_li_for_friend.appendChild(new_text_for_friend)
    friend_section.appendChild(new_li_for_friend)

  }


  const create_friend = async (friend_login,friend_id) =>{
    if(url.split('/').length === 6){
        (document.getElementById("not_my_page_friend_list2")).id = "not_my_page_friend_list"
    }
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
    new_div_for_list_options.appendChild(new_div_for_delete_friend)
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
      console.log(e)
      if(e.target.matches("#text_friend")){
        document.getElementById("list_options_"+e.target.className).style.visibility === "visible" ? document.getElementById("list_options_"+e.target.className).style.visibility = "hidden" : document.getElementById("list_options_"+e.target.className).style.visibility = "visible"
      }
      else if(e.target.matches("#p_delete_friend")){
        console.log("delete friend")
        confirmDelete(friend_login,friend_id)
      }
      else if(e.target.matches("#p_go_friend")){
        console.log(e.target.className,url)
        console.log(url+"/"+e.target.className)
        axios.put(axiosSaveSession,{user_id:id,session:"/profile/"+`${id}`+"/"+`${e.target.className}`})
              .then(res=>{  
                e.preventDefault()
                navigate(`${id}`+"/"+`${e.target.className}`)
                window.location.reload()
                // window.location.assign(`${id}`+"/"+`${e.target.className}`)
              })
              .catch(err=>{console.log(err)})


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

    axios.delete(axiosUrlDelFriend+id+"/"+popup_del_user_id)
        .then(res=>{
              document.getElementById("popup_delete").style.visibility = "hidden"
              document.getElementById("popup_confirm_msg").style.visibility = "visible"
        })

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
  ,[post])

  const create_nopost = () =>{
    console.log("CREATE NO POST")
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
    new_icon_comment.src = CommentIcon
    new_icon_delete.src = DeleteIcon
    new_icon_follow.src = FollowIcon
    new_icon_report.src = ReportIcon


    // Création des texteNode : 
    let new_comment = document.createTextNode(data.post)
    let new_nbcomment = document.createTextNode(nb_com)
    let new_report = document.createTextNode("Signaler le post")
    let new_follow = document.createTextNode("Suivre "+`${data.username}`)
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
    

    new_p_for_comment.className = "comment-content"
    new_p_for_date.className = "comment-date"
    new_p_for_owner.className = "comment-owner"
    new_icon_comment.className="icon-comment_profile"
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
    new_div_for_list_options.appendChild(new_p_for_follow) 
    new_p_for_follow.appendChild(new_icon_follow)
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

    new_div_for_comment.className="comment_profile"
    if(url.split('/').length === 6){
      new_div_for_comment.className="comment_profile2"
    }
    new_div_for_main_dot.className="ul_options_profile"
    new_div_for_list_options.className="ul_list_options_profile"

    
    new_div_for_comment.appendChild(new_button_)

    new_div_for_comment.appendChild(new_icon_comment)
    new_div_for_comment.addEventListener('click',(e)=>{
     if(e.target.matches(".dot_profile") || e.target.matches(".ul_options_profile")){
          document.getElementById("list_"+e.target.id).style.visibility === "visible" ? document.getElementById("list_"+e.target.id).style.visibility = "hidden" : document.getElementById("list_"+e.target.id).style.visibility = "visible"
     }
     else {
      navigate('/post/'+`${id}`+'/'+`${data._id}`)
     }

    })
    console.log("COMMENT SEC : ",comment_section)
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
          console.log(res.data)
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
    navigate("/editprofile/"+`${id}`)
  }

    return <div className='profile-body'>
        <div className="profile-section">
        { ismypage === 1 ? profilePicture !== ''? <img className="profile-picture" src={profilePicture}  alt="image" /> : <img className="profile-picture" src={DefaultPP}  alt="image" />:profilePicture !== ''? <img className="not_my_profile-picture" src={profilePicture}  alt="image" /> : <img className="not_my_profile-picture" src={DefaultPP}  alt="image" /> }
        
        { ismypage === 1 ? <div className="profile-info"><h2>{lastname} {firstname} {ismypage}</h2>{ age !== ''?<p>  Age : {age} ans</p> :<p id="p_no_age" onClick={handleClickEditProfile} >Ajoutez votre âge</p> }{ bio !== ''?<p>{bio}</p> : <p id="p_no_bio" onClick={handleClickEditProfile}>Ajoutez une bio </p>}
        </div> : <div className="profile-info" id="not_my_page_profile-info"><h2>{lastname} {firstname} {ismypage}</h2>{ age !== ''?<p>  Age : {age} ans</p> :<p/> }{ bio !== ''?<p>{bio}</p> : <p />}</div>}
        <div className="profile-comment-section">
      
      { ismypage === 1 ? <textarea id='areainput' ref = {areainput} value={comment} onKeyDown={onEnterKey} onChange={handleChange} placeholder="Entrez votre post ici..." ></textarea>:<p></p>}
      {ismypage ===1 ? <button  onClick={handleAdd}>Ajouter</button>: <p/>}
      </div>
      {ismypage ===1 ? <div  id="comment-profile" className="comment-profile">  </div> : <div  id="comment-profile2" className="not_my_page_comment-profile">  </div>}
      {ismypage === 1 ? <div className="friend-list"><h3>Liste d'amis</h3><ul id="ul_friend"></ul></div> : <div id="not_my_page_friend_list2" className="friend-list"> <h3>Liste d'amis</h3><ul id="ul_friend"/></div>}
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
   
    </div>
}

export default Profile_area