import '../../css/acceuil.css';
import { useEffect, useRef, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CommentIcon from "../../image/commenter.png"
import DeleteIcon from "../../image/delete.png"
import FollowIcon from "../../image/follow.png"
import ReportIcon from "../../image/report.png"



function Home_main(props){


    const axiosUrlUser = "http://localhost:7000/api/user/:id"
    const axiosUrlNewPost = "http://localhost:7000/api/post"
    const axiosUrlGetPosts = "http://localhost:7000/api/posts"
    // const axiosUrlLogin = "http://localhost:7000/api/getlogin"
    const axiosUrlGetCommentwPost = "http://localhost:7000/api/post/comment/"


    const [comment,setComment] = useState('')
    const [index_post,setIndexPost] = useState(0)
    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)

    const navigate = useNavigate()
    const areainput = useRef(null)

    const [username,setUsername] = useState('')
    const [post,setPost] = useState('')

    let nb_com = 0
    let nb_post = 0 

    useEffect(()=>{
        console.log("ici : "+JSON.stringify({_id : id }))
        axios.post(axiosUrlUser,{_id:`${id}`})
          .then(res=>{
            if(res.status === 200){
              console.log("username : "+res.data.username)
              setUsername(res.data.username)
            } 
          })
          .catch((err)=>{console.log(err);navigate('/')})
    },[])

    useEffect(()=>{
      axios.get(axiosUrlGetPosts)
        .then(res=>{
         // console.log("RES : "+res)
          //console.log(res.data.length)
          if(res !== undefined){
            let i = index_post
            for(i; i < res.data.length ; i ++){
              create_post(res.data[i])
            //  console.log(i+ " --- "+Object.keys(res).length,index_post)
            }
            setIndexPost(i)
          }
       }).catch((err)=>{console.log(err)})
    } 
    ,[post])

    // useEffect(()=>{
    //   axios.get(axiosUrlLogin)
    //   .then((res)=>{
    //     if(res.data.loggedIn === false){ 
    //       console.log("ok pour navigate")
    //       navigate("/")
    //     }
    //   })
    // },[])

 
   
    const fetchNbComment = async (id) =>{
      await axios.get(axiosUrlGetCommentwPost+id)
      .then((res)=>{
        nb_com = res.data.length
      })
      .catch((err)=>{console.log(err)})
    }
    
    const create_post =  async (data) =>{
      let comment_section =  document.getElementById("comment-section")

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
      new_icon_comment.className="icon-comment"
      new_div_for_dot1.className="dot" 
      new_div_for_dot2.className="dot" 
      new_div_for_dot3.className="dot" 
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

     
     if( data.user_id === id){
      new_div_for_list_options.appendChild(new_p_for_delete)
      new_p_for_delete.appendChild(new_icon_delete)
      new_p_for_nbcomment.className ="nb-comment"
     }
     else {
      new_div_for_list_options.appendChild(new_p_for_follow) 
      new_p_for_follow.appendChild(new_icon_follow)
      new_div_for_list_options.appendChild(new_p_for_report)
      new_p_for_report.appendChild(new_icon_report)
      new_p_for_nbcomment.className ="nb-comment2"
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

      new_div_for_comment.className="comment"
      new_div_for_main_dot.className="ul_options"
      new_div_for_list_options.className="ul_list_options"

      
      new_div_for_comment.appendChild(new_button_)

      new_div_for_comment.appendChild(new_icon_comment)
      new_div_for_comment.addEventListener('click',(e)=>{
       if(e.target.matches(".dot") || e.target.matches(".ul_options")){
            console.log("TARGET : ",e.target,e,document.getElementById(e.target.id),e.target.id,document.getElementById("list_"+e.target.id))
            document.getElementById("list_"+e.target.id).style.visibility === "visible" ? document.getElementById("list_"+e.target.id).style.visibility = "hidden" : document.getElementById("list_"+e.target.id).style.visibility = "visible"
       }
       else {
        navigate('/post/'+`${id}`+'/'+`${data._id}`)
       }

      })
      comment_section.insertBefore(new_div_for_comment ,comment_section.firstChild.nextSibling)
      nb_post+=1

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

    const onEnterKey = (evt) => {
      if(evt.keyCode === 13 && evt.shiftKey === false) {
        handleAdd(evt)
      }
    }

    return (
    <div>
        <div className="center-section">
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
    </div>
    )
}

export default Home_main