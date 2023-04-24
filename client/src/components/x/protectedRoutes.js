import axios from "axios"

const { Outlet, Navigate} = require("react-router-dom")

const axiosUrlLogin = "http://localhost:7000/api/getlogin"

let connected ={ logged : false }
    const isLogged = async ()=>{
        
        let response = await axios.get(axiosUrlLogin)
            .then((res)=>{
            console.log(res)
            console.log(res.data)
            console.log(connected)
            if(res.data.loggedIn === true){
                connected ={logged: true}
            
            }})
            .catch(err=>{console.log(err)})
}


function ProtectedRoutes(props){

    const user = isLogged()
    return connected.logged? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes