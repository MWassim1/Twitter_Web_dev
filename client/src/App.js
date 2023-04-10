import './App.css';
import {Routes,Route} from "react-router-dom"
import SignInForm from './components/SignIn/signInForm';
import SignUpForm from './components/SignUp/signUpForm';
import Home from './components/Home/home';
import Profile from './components/Profile/profile';

function App() {
  
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<SignInForm></SignInForm>}></Route>
      <Route path="/SignUp" element={<SignUpForm/>}></Route>
      <Route path="/Home/*" element={<Home/>}></Route>
      <Route path='/Home/profile' element={<Profile></Profile>}></Route>
      
    </Routes>
    </div>
  )
}

export default App;
