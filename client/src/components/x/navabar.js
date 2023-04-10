import React from 'react'
import {Link} from 'react-router-dom'

function Navbar(props){


    return(
        <nav>
            <Link to="/">SignInForm</Link>
            <Link to="/SignUp">SignUpForm</Link>
        </nav>
    )
}

export default Navbar