import '../../css/acceuil.css';
import { useEffect, useRef, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CommentIcon from "../../image/commenter.png"
import DeleteIcon from "../../image/delete.png"
import FollowIcon from "../../image/follow.png"
import ReportIcon from "../../image/report.png"
import UnfollowIcon from "../../image/unfollow.png"
import LikeButton from '../like/like';
import DefaultPP from "../Profile/1.jpg"


function Home_main(props){


    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlNewPost = "http://localhost:7000/api/post"
    const axiosUrlGetPosts = "http://localhost:7000/api/posts"
    const axiosUrlGetCommentwPost = "http://localhost:7000/api/post/comment/"
    const axiosUrlFollow = "http://localhost:7000/api/user/follow/"
    const axiosUrlGetInfoFollow = "http://localhost:7000/api/user/followers/"
    const axiosUrlDelFollow = "http://localhost:7000/api/user/follow/"
    const axiosUrlGetUserInfo = "http://localhost:7000/api/userinfo/"
    const axiosUrlIsMyFriend = "http://localhost:7000/api/friend/"


    const [comment,setComment] = useState('')
    const [index_post,setIndexPost] = useState(0)
    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)

    const navigate = useNavigate()
    const areainput = useRef(null)

    const [username,setUsername] = useState('')
    const [post,setPost] = useState('')
    const [textPopup,setTextPopup] = useState('')
    const [filter,setFilter] = useState({friend : false , follow : false})

    let nb_com = 0
    let nb_post = 0
    let infoFollow = 0 

    // Récupère le nom d'utilisateur connecté 
    useEffect(()=>{
        axios.post(axiosUrlUser,{_id:`${id}`})
          .then(res=>{
            if(res.status === 200){
              setUsername(res.data.username)
            } 
          })
          .catch((err)=>{console.log(err);navigate('/')})
    })


    // Créé les posts 
    useEffect(()=>{
      axios.get(axiosUrlGetPosts)
        .then(res=>{
          if(res !== undefined){
            let i = index_post
            for(i; i < res.data.length ; i ++){
              create_post(res.data[i])
            }
            setIndexPost(i)
          }
       }).catch((err)=>{console.log(err)})
    } 
    // eslint-disable-next-line
    ,[post,filter])



    // Récupère le nombre de commentaires 
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
      let can_create_post = 0
      if(filter.friend === false && filter.follow === false){
        can_create_post = 1
      }

      else if(filter.friend === true && filter.follow === false ){
          await axios.get(axiosUrlIsMyFriend+id+"/"+data.user_id)
          .then(res=>{if(res.data.ismyfriend === true){can_create_post =1}})
      }
      else if(filter.friend === false && filter.follow === true){
          await axios.get(axiosUrlGetInfoFollow+id)
                .then(res=>{if((res.data.follow).includes(data.user_id)){can_create_post = 1}})
      }
      else if(filter.friend === true && filter.follow === true){
        await axios.get(axiosUrlGetInfoFollow+id)
                .then(async res=>{if((res.data.follow).includes(data.user_id)){
                  await axios.get(axiosUrlIsMyFriend+id+"/"+data.user_id)
                  .then(res=>{if(res.data.ismyfriend === true){can_create_post =1}})
                }})

      }
      if(can_create_post === 1){
        let comment_section =  document.getElementById("comment-section")

      
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


        // button : 

        let new_button_ = document.createElement("button")

        

        // img :

        let new_icon_comment = document.createElement("img")
        let new_icon_delete = document.createElement("img")
        let new_icon_follow = document.createElement("img")
        let new_icon_report = document.createElement("img")
        let new_icon_unfollow = document.createElement("img")
        let new_icon_pp   = document.createElement("img")
        new_icon_comment.src = CommentIcon
        new_icon_delete.src = DeleteIcon
        new_icon_follow.src = FollowIcon
        new_icon_unfollow.src = UnfollowIcon
        new_icon_report.src = ReportIcon
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
        await fetchNbComment(data._id)
        let new_nbcomment = document.createTextNode(nb_com)
        let new_report = document.createTextNode("Signaler le post")
        let new_follow = document.createTextNode(`Suivre ${data.username}`)
        let new_unfollow = document.createTextNode(`Ne plus suivre ${data.username}`)
        let new_delete = document.createTextNode("Supprimer le post")
        let new_gopage = document.createTextNode(`Voir la page de profile de ${data.username}`)

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
        let new_button = document.createTextNode("Ajouter")
        new_div_for_comment.appendChild(new_icon_pp)
        new_button_.appendChild(new_button)
        new_p_for_comment.appendChild(new_comment)
        new_div_for_main_dot.append(new_div_for_dot1)
        new_div_for_main_dot.append(new_div_for_dot2)
        new_div_for_main_dot.append(new_div_for_dot3)
        new_div_for_ul_options.appendChild(new_div_for_main_dot)
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
        new_icon_comment.className="icon-comment"
        new_icon_unfollow.className="icon-unfollow"
        new_div_for_dot1.className="dot" 
        new_div_for_dot2.className="dot" 
        new_div_for_dot3.className="dot" 
        new_icon_delete.className="icon-delete"
        new_icon_follow.className="icon-follow"
        new_icon_report.className="icon-report"
        new_icon_pp.className="icon-pp-home"
        

    

        

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
        new_p_for_nbcomment.className ="nb-comment"
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
        if(data.username.length > 10 ){
          new_p_for_nbcomment.className ="nb-comment3"
        }
        else {
          new_p_for_nbcomment.className ="nb-comment2"
        }
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

        new_div_for_comment.className="comment"
        if(data.post.length > 800) {
          new_div_for_main_dot.className="ul_options2"
        new_div_for_list_options.className="ul_list_options2"
        }
        else {
        new_div_for_main_dot.className="ul_options"
        new_div_for_list_options.className="ul_list_options"
        }
        new_p_for_go_page.id = "goPageUser"
        new_p_for_follow.id="followUser"
        new_p_for_unfollow.id="unfollowUser"

        
        new_div_for_comment.appendChild(new_button_)

        new_div_for_comment.appendChild(new_icon_comment)

        new_div_for_comment.addEventListener('click',(e)=>{
        if(e.target.matches(".dot") || e.target.matches(".ul_options") || e.target.matches(".ul_options2")){
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
        else {
          navigate(`/post/${id}/${data._id}`)
        }

        })
        comment_section.insertBefore(new_div_for_comment ,comment_section.firstChild.nextSibling)
        nb_post+=1
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

    const onEnterKey = (evt) => {
      if(evt.keyCode === 13 && evt.shiftKey === false) {
        handleAdd(evt)
      }
    }

    const handleHideFollow = (evt) =>{
      document.getElementById("popup_add_follow").style.visibility = "hidden"
    }

    const delAllPost = () =>{
      const comment_section = document.getElementById("comment-section")
      while(comment_section.childNodes.length>1){
        comment_section.removeChild(comment_section.lastElementChild)
      }
    }
    const filterFollow = (evt) =>{
      delAllPost()
      if(evt.target.checked === true){
        setFilter((prevFilter)=>({...prevFilter,follow : true}))
      }
      else {
        setFilter((prevFilter)=>({...prevFilter,follow : false}))
      }
      setIndexPost(0)
    }
    const filterFriend = (evt) =>{
      delAllPost()
      if(evt.target.checked === true){
        setFilter((prevFilter)=>({...prevFilter,friend :true}))
      }
      else {
        setFilter((prevFilter)=>({...prevFilter,friend :false}))
      }
      setIndexPost(0)
      
    }
    return (
    <div>
        <div className="center-section">
          <div id='div_filter_home'>
            <p id='p_filter_home' >Filtre :</p>
            <form id="checkbox-filter">
              <label id='label-checkbox' htmlFor='checkbox-follow'>Comptes suivis</label>
              <input  onChange={filterFollow} type='checkbox' id='checkbox-follow' name='follow' value="Comptes suivis"/>
              <label id='label-checkbox' htmlFor='checkbox-friend'>Amis</label>
              <input onChange={filterFriend} type='checkbox' id='checkbox-friend' name='friend' value="Amis"/>
            </form>
          </div>
          <div className="new-comment-section">
            <h2>Nouveau post</h2>
            <textarea id='areainput' ref = {areainput} className='textarea' value={comment} placeholder="Entrez votre post ici..."  onKeyDown={onEnterKey}onChange={handleChange}></textarea>
            <button   onClick={handleAdd}>Ajouter</button>
          </div>
          <p>{username}</p>
          <div id="comment-section" className="comment-list-section">
            <h2>Liste posts</h2>
            <div className="comment">
              <p></p>
            </div>
          </div>
      </div>
      <div id="popup_add_follow">
        <p id="text_popup_add_follow">{textPopup}</p>
        <button id="addfollow_pop_button" onClick={handleHideFollow}>OK</button>
    </div>
    {/* <LikeButton></LikeButton> */}
    </div>
    )
}

export default Home_main