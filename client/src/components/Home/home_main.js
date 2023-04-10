import '../../css/acceuil.css';
import { useEffect, useRef, useState } from 'react';
import axios from "axios"



function Home_main(props){


    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlNewPost = "http://localhost:7000/api/post"
    const axiosUrlGetPosts = "http://localhost:7000/api/posts"

    const [comment,setComment] = useState('')
    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)
    let index_post = 0 
    
    const areainput = useRef(null)

    const [username,setUsername] = useState('')
    const [post,setPost] = useState('')

    useEffect(()=>{
        console.log(JSON.stringify({_id : id }))
        axios.post(axiosUrlUser,{_id:`${id}`})
          .then(res=>{
            if(res.status === 200){
              console.log(res.data.username)
              setUsername(res.data.username)
            } 
          })
          .catch((err)=>{ console.log(err)})
    },[])

    useEffect(()=>{
      axios.get(axiosUrlGetPosts)
        .then(res=>{
          console.log(res.data.length)
          if(res !== undefined){
            for(let i= index_post; i < res.data.length ; i ++, index_post++){
              create_post(res.data[i])
              console.log(i+ " --- "+Object.keys(res).length)
            }
          }
       }).catch((err)=>{console.log(err)})
    } 
    ,[post])

    const create_post = (data) =>{
      let comment_section =  document.getElementById("comment-section")


      // Création des balises 

      // p :

      let new_p_for_comment= document.createElement('p')
      let new_p_for_date = document.createElement('p')
      let new_p_for_owner = document.createElement('p')

      // div  : 

      let new_div_for_comment = document.createElement("div")
      // br : 

      let new_br1_for_space = document.createElement("br")
      let new_br2_for_space = document.createElement("br")


      // button : 

      let new_button_ = document.createElement("button")

      // Création des texteNode : 
      console.log(data)
      let new_comment = document.createTextNode(data.post)
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

      new_p_for_comment.className = "comment-content"
      new_p_for_date.className = "comment-date"
      new_p_for_owner.className = "comment-owner"

      new_div_for_comment.appendChild(new_p_for_comment)
      new_div_for_comment.appendChild(new_p_for_date)
      new_div_for_comment.appendChild(new_p_for_owner)
      
      new_div_for_comment.appendChild(new_br1_for_space)
      new_div_for_comment.appendChild(new_br2_for_space)
      new_div_for_comment.className="comment"
      
      new_div_for_comment.appendChild(new_button_)

    
      comment_section.insertBefore(new_div_for_comment ,comment_section.firstChild.nextSibling)

    }





    const handleAdd = (evt) =>{
      evt.preventDefault()
      
      axios.post(axiosUrlNewPost,{user_id:id,username:username,post:comment})
          .then(res=>{
            console.log(res.data)
            setPost(res.data)
            console.log(document.getElementById("areainput"))
            areainput.current.value = ""
            
          })
          .catch((err)=>{console.log(err)})
      
    }
      
    const handleChange = (evt) =>{
      setComment(evt.target.value)
    }

    const onEnterKey = (evt) => {
      if(evt.keyCode === 13 && evt.shiftKey === false) {
        handleAdd(evt)
      }
    }

    return <div>
        <div className="center-section">
        <div className="new-comment-section">
      <h2>Nouveau commentaire</h2>
      <textarea ref = {areainput} className='textarea' placeholder="Entrez votre commentaire ici..."  onKeyDown={onEnterKey}onChange={handleChange}></textarea>
      <button   onClick={handleAdd}>Ajouter</button>
      </div>
      <p>{username}</p>
    <div id="comment-section" className="comment-list-section">
      <h2>Liste commentaires</h2>
      <div className="comment">
        <p></p>
      </div>

    </div>
  </div>
    </div>
}

export default Home_main