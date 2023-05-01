import axios from "axios"
import { useEffect } from "react"

const { Outlet, Navigate} = require("react-router-dom")

const axiosUrlLogin = "http://localhost:7000/api/getlogin/"

let connected ={ logged : false }
    const isLogged = async (user_id)=>{
        
        let response = await axios.get(axiosUrlLogin+user_id)
            .then((res)=>{
            console.log(res)
            console.log(res.data)
            console.log(connected)
            if(res.data.isconnected === true){
                connected ={logged: true}
            
            }
        })
            .catch(err=>{console.log("CICI : ",user_id)})
}


function ProtectedRoutes(){

    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    let id = url.slice(last_slash+1)
    console.log("url : ",url)
    if(url.split('/').length === 6){
        id = url.split('/')[4]
    }
    console.log("PRO ID : ",id)
    const isconnected = async(id) =>{
        if(url.split('/').length === 6){
        id = url.split('/')[4]
    }
        console.log("isconnected ID  : ",id)
        const user = await  isLogged(id)

        console.log(connected)
   
    }
    isconnected(id)
    return connected.logged? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes