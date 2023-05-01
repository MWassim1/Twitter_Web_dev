import '../../css/acceuil.css';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import Logo from "../../logo.png"





function Home_header(props){


  
  const axiosUrl = "http://localhost:7000/api/user/logout"
  const axiosUrlUser = "http://localhost:7000/api/user/:id"
  const axiosUrlGetUser = "http://localhost:7000/api/users/"
  const url = window.location.href
  const last_slash = url.lastIndexOf('/')
  const id = url.slice(last_slash+1)

  const navigate = useNavigate()
 
  
    const handleClick = (evt) =>{
      evt.preventDefault()
      axios.post(axiosUrlUser,{_id:`${id}`})
      .then((res)=>{
        console.log(res.data)
        console.log(res.data._id)
        axios.put(axiosUrl,{id:res.data._id, email : res.data.email , password : res.data.password, isconnected : false } ) 
        .catch((err)=> console.log(err.response))
        navigate('/')
    })
    .catch(err =>{console.log(err)})
    }
   
    const handleChange = (evt) =>{
      //console.log(axiosUrlGetUser+evt.target.value)
      if(evt.target.value.trim() != ""){
        axios.get(axiosUrlGetUser+evt.target.value)
            .then((res)=>{
                console.log("RES : ",res)
                if(res.status === 200){
                  console.log(res.data,res.data.length)
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

      let users_list = document.getElementById("listeusers")
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
        let users_list = document.getElementById("listeusers")

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
      console.log(this,this.innerHTML)
      console.log("CLASS : ",this.className)
      navigate('/profile/'+id+'/'+`${this.className}`)

    }
    

    const del_user = ()=>{
      let users  = document.getElementsByTagName("li")
      let users_list = document.getElementById("listeusers")
      console.log("ICI :", users,users.length)
      while(users.length > 3){
        users_list.removeChild(users_list.lastElementChild)
      }
    }

    const handleClickProfile = (evt) =>{
      navigate('/profile/'+id)
    }

    return (<div>
    <header>
      <img className="header-logo" src={Logo}  alt="Logo" />
      <div className="search-bar-section">
        <input type="text" className="search-bar" placeholder="Rechercher utilisateur..." onChange={handleChange} />
      </div>
      <div className="profile-button-section">
      <button className="profile-button" onClick={handleClickProfile}>Mon profil</button>
      </div>
      <div className="logout-button-section">
      <Link to="/"><button className="logout-button" onClick={handleClick}>Déconnexion</button></Link>
      </div>
    </header>
    <ul  className="users" id="listeusers"/>
     </div>
    )
}

export default Home_header


