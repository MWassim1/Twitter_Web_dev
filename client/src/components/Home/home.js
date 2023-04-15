import React from 'react';
import '../../css/acceuil.css';
import Header from '../x/header';
import Home_header from './home_header';
import Home_main from './home_main';
import Navbar from './navbar';


function Home(props) {
  return ( 
    <div >
      <Header title="Acceuil"></Header>
      <Navbar />
      <div className="center-section">
        <Home_header></Home_header>
        <Home_main></Home_main>
      </div>
    </div>
);
}

export default Home;
