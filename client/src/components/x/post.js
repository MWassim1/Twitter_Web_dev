import '../../css/publication.css'
import { useEffect, useRef, useState } from "react"
import Header from "./header"
import Navbar from '../Home/navbar'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import CommentIcon from "../../image/commenter.png"
import DefaultPP from "../Profile/1.jpg"
import LikeIcon from "../../image/like.svg"





function Post (props){

    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)
    const user_id = url.split('/')[4]

    const navigate = useNavigate()

    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const  axiosUrlGetPost = "http://localhost:7000/api/post2/"
    const axiosUrlGetCommentwPost = "http://localhost:7000/api/post/comment/"
    const axiosUrlPostComment = "http://localhost:7000/api/post/comment/"
    const axiosUrlGetUserInfo = "http://localhost:7000/api/userinfo/"
    const axiosUrlLikedPost = "http://localhost:7000/api/postliked/"
    
    let nb_com = 0 
    let user_w_id = ""
    let alreadyLoaded = 0

    const areainput = useRef(null)
    const [comment,setComment] = useState('')
    const [index_comment,setIndexComment] = useState(0)
    const [username,setUsername] = useState('')
    const [ncomment,setNcomment] = useState('')

    useEffect(()=>{
      if(alreadyLoaded === 0){
          axios.get(axiosUrlGetPost+id)
              .then(res =>{
                  create_post(res.data)
                  alreadyLoaded = 1
              })
              .catch((err)=>{console.log(err)})
            }
    },[])

    useEffect(()=>{
      axios.post(axiosUrlUser,{_id:`${user_id}`})
        .then(res=>{
          if(res.status === 200){
            setUsername(res.data.username)
          } 
        })
        .catch((err)=>{console.log(err);navigate('/')})
  },[])

    useEffect(()=>{
        axios.get(axiosUrlGetCommentwPost+id)
            .then(res =>{
                let i = index_comment
                for(i; i < res.data.length ; i ++){
                  create_comment(res.data[i])
                }
                setIndexComment(i)
            })
            .catch((err)=>{console.log(err)})
    },[ncomment])
    
    const fetchUserwUserId = async (id) =>{
      await axios.post(axiosUrlUser,{_id:`${id}`})
      .then((res)=>{
        user_w_id = res.data.username
      })
      .catch((err)=>{console.log(err)})
    }
    
    const create_comment = async (data) =>{
        let comment_list = document.getElementById("comment-list-section")

        // Récupère le user  pour le  commentaire data 

        await fetchUserwUserId(data.user_comment)

        // Création des balises 
  
        // p :
  
        let new_p_for_comment= document.createElement('p')
        let new_p_for_date = document.createElement('p')
        let new_p_for_owner = document.createElement('p')
        let new_p_for_nbcomment = document.createElement('p')
  
        // div  : 
  
        let new_div_for_comment = document.createElement("div")
        // br : 
  
        let new_br1_for_space = document.createElement("br")
        let new_br2_for_space = document.createElement("br")
  
  
  
        // img :
  
        let new_icon_comment = document.createElement("img")
        let new_icon_pp = document.createElement('img')
        new_icon_pp.src = DefaultPP
        new_icon_comment.src = CommentIcon

        await axios.get(axiosUrlGetUserInfo+data.user_id)
        .then(async res=>{
            if(res.data !== "" && res.data.profile_picture !== ""){
                new_icon_pp.src = res.data.profile_picture
            }
        }) 
        .catch((err)=>{})
  
        // Création des texteNode : 
        let new_comment = document.createTextNode(data.comments)
        let new_nbcomment = document.createTextNode(nb_com)
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

        let new_owner = document.createTextNode(user_w_id)
  
        new_p_for_comment.appendChild(new_comment)
        new_p_for_date.appendChild(new_date)
        new_p_for_owner.appendChild(new_owner)
        new_p_for_nbcomment.appendChild(new_nbcomment)
  
        new_p_for_comment.className = "comment-content"
        new_p_for_date.className = "comment-date"
        new_p_for_owner.className = "comment-owner"
        new_p_for_nbcomment.className ="nb-comment-post"
        new_icon_comment.className="icon-comment-post"
        new_icon_pp.className="icon-pp-post-comment"
        
        new_div_for_comment.appendChild(new_icon_pp)
  
        new_div_for_comment.appendChild(new_p_for_comment)
        new_div_for_comment.appendChild(new_p_for_date)
        new_div_for_comment.appendChild(new_p_for_owner)
        new_div_for_comment.appendChild(new_br1_for_space)
        new_div_for_comment.appendChild(new_br2_for_space)
       
        new_div_for_comment.className="comment-post2"
        
        comment_list.insertBefore(new_div_for_comment ,comment_list.firstChild.nextSibling)
  

        
    }


    const fetchNbComment = async (id) =>{
        await axios.get(axiosUrlGetCommentwPost+id)
        .then((res)=>{
          nb_com = res.data.length
        })
        .catch((err)=>{console.log(err)})
      }

    const create_post =  async (data) =>{
        let comment_section =  document.getElementById("post")
  
        // Récupère les commentaires pour le post data 
  
        await fetchNbComment(data._id)
  
        // Création des balises 
  
        // p :
  
        let new_p_for_comment= document.createElement('p')
        let new_p_for_date = document.createElement('p')
        let new_p_for_owner = document.createElement('p')
        let new_p_for_nbcomment = document.createElement('p')
  
        // div  : 
  
        let new_div_for_comment = document.createElement("div")
        // br : 
  
        let new_br1_for_space = document.createElement("br")
        let new_br2_for_space = document.createElement("br")
  
  
        // img :
  
        let new_icon_comment = document.createElement("img")
        let new_icon_pp   = document.createElement("img")
        let new_icon_like  = document.createElement("img")
        new_icon_like.src = LikeIcon
        new_icon_pp.src = DefaultPP
        new_icon_comment.src = CommentIcon

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
       
        new_p_for_comment.appendChild(new_comment)
        new_p_for_date.appendChild(new_date)
        new_p_for_owner.appendChild(new_owner)
        new_p_for_nbcomment.appendChild(new_nbcomment)
  
        new_p_for_comment.className = "comment-content"
        new_p_for_date.className = "comment-date"
        new_p_for_owner.className = "comment-owner"
        new_p_for_nbcomment.className ="nb-comment-post"
        new_icon_comment.className="icon-comment-post"
        new_icon_pp.className="icon-pp-post"
        new_icon_like.className="icon-like-post1"
        
        new_div_for_comment.appendChild(new_icon_pp)
        new_div_for_comment.appendChild(new_p_for_comment)
        new_div_for_comment.appendChild(new_p_for_date)
        new_div_for_comment.appendChild(new_p_for_owner)
        new_div_for_comment.appendChild(new_br1_for_space)
        new_div_for_comment.appendChild(new_br2_for_space)
        new_div_for_comment.appendChild(new_p_for_nbcomment)
        new_div_for_comment.className="comment-post"
        
        new_div_for_comment.appendChild(new_icon_like)
  
        new_div_for_comment.appendChild(new_icon_comment)
        if(data.post.length < 800) {
          new_icon_like.className="icon-like-post2"
          new_p_for_nbcomment.className ="nb-comment-post2"
          new_icon_comment.className="icon-comment-post2"
          new_icon_pp.className="icon-pp-post2"
          document.getElementById("areainput2").id = "areainput3"
        }
        await axios.get(axiosUrlLikedPost+url.split("/")[4])
                    .then(res=>{
                      if(res.data.length !== 0 ){ 
                        if((res.data[0].posts_liked).includes(id)){
                          new_icon_like.style.filter = "invert(14%) sepia(72%) saturate(7490) hue-rotate(359deg) brightness(97%) contrast(116%)"
                        }
                    }
                    })
        new_div_for_comment.addEventListener("click",(e)=>{
          if(e.target.matches(".icon-like-post1") || e.target.matches(".icon-like-post2")){
            if(e.target.style.filter === "invert(14%) sepia(72%) saturate(7490) hue-rotate(359deg) brightness(97%) contrast(116%)")
              {
                axios.delete(axiosUrlLikedPost+url.split("/")[4]+"/"+id)
                e.target.style.filter = "invert(0%) sepia(100%) saturate(0%) hue-rotate(248deg) brightness(96%) contrast(107%)"
              }
              else{
                axios.put(axiosUrlLikedPost+url.split("/")[4]+"/"+id)
                e.target.style.filter = "invert(14%) sepia(72%) saturate(7490) hue-rotate(359deg) brightness(97%) contrast(116%)"
  
              }
          }
        })
        comment_section.appendChild(new_div_for_comment)
  
      }

      const handleChange = (evt) =>{
        setComment(evt.target.value)
      }

      const onEnterKey = (evt) => {
        if(evt.keyCode === 13 && evt.shiftKey === false) {
          handleAdd(evt)
        }
      }

      const handleAdd = (evt) =>{
        evt.preventDefault()
        if(comment.trim() !== ""){
        axios.post(axiosUrlPostComment+user_id+"/"+id,{comment:comment})
            .then(res=>{
              console.log(res.data)
              areainput.current.value = ""
              setNcomment(res.data)
              setComment("")
              const n_comm = document.getElementsByClassName("nb-comment-post")
              const strComm_to_int = parseInt(n_comm[0].innerHTML) +1  //Met à jour le nombre de commentaires sour le post 
              n_comm[0].innerHTML = strComm_to_int.toString()
              
            })
            .catch((err)=>{console.log(err)})
          }
      }


    return (
        <div className='post-body'>
                <Header title="Post"></Header>
                <Navbar></Navbar>
                <p id='username'>{username}</p>
                <div  className="center-section-post">
                    <div id="post" />
                </div>
                <textarea id='areainput2' ref = {areainput} className='textarea' value={comment} placeholder="Entrez votre réponse ici..."  onKeyDown={onEnterKey}onChange={handleChange}></textarea>
                <p id='p_commentaire'>Liste commentaires</p>
                <div id="comment-list-section">
                    <p></p>                    
                </div>
         </div>
        
    )


}

export default Post