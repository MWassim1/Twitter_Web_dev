import React from 'react';
import '../../css/acceuil.css';
import Header from "../x/header"
import Home_header from './home_header';
import Home_left from './home_left';
import Home_main from './home_main';

function Home(props){





    return <div><Header title="Acceuil"></Header>
                <Home_header></Home_header>
                <Home_left></Home_left>
                <Home_main></Home_main>

    </div>
}

export default Home