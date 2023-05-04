import axios from "axios"

const { Outlet, Navigate} = require("react-router-dom")

const axiosUrlLogin = "http://localhost:7000/api/getlogin/"

let connected ={ logged : false }
    const isLogged = async (user_id)=>{
        
            await axios.get(axiosUrlLogin+user_id)
            .then((res)=>{
            if(res.data.isconnected === true){
                connected ={logged: true}
            
            }
        })
            .catch(err=>{console.log(user_id)})
}


function ProtectedRoutes(){

    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    let id = url.slice(last_slash+1)
    if(url.split('/').length === 6){
        id = url.split('/')[4]
    }
    const isconnected = async(id) =>{
        if(url.split('/').length === 6){
        id = url.split('/')[4]
    }
        await  isLogged(id)
   
    }
    isconnected(id)
    return connected.logged? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes