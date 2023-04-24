import '../../css/notfound.css'
import Header from "../x/header"
import Logo from "../../logo.png"




function NotFound(props){


    


    return  <div><Header  title="404 error"></Header>
                <img className="logo" src={Logo} alt=""></img>
                <div id="main">
                    <div className="message">
                        <h1>Error 404 page not found...</h1>
                    </div>
                </div>
            </div>

}

export default NotFound