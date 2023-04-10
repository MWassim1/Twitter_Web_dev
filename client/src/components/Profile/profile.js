import Header from "../x/header"
import Profile_area from "./profile_area"
import Profile_header from "./profile_header"
import '../../css/profile.css'



function Profile(props){




    return <div><Header title="Profil"></Header>
                <Profile_header></Profile_header>
                <Profile_area></Profile_area>
       
    </div>
}

export default Profile