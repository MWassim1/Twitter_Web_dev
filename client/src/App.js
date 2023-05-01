import './App.css';
import {Routes,Route} from "react-router-dom"
import SignInForm from './components/SignIn/signInForm';
import SignUpForm from './components/SignUp/signUpForm';
import Home from './components/Home/home';
import Profile from './components/Profile/profile';
import ProtectedRoutes from './components/x/protectedRoutes';
import NotFound from './components/x/notfound';
import Comments from './components/x/post';
import Abouts from './components/Propos/about';
import EditProfile from './components/formulaire/edit_profile';

function App() {
  
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<SignInForm></SignInForm>}></Route>
      <Route element={<ProtectedRoutes></ProtectedRoutes>}>
        {/* <Route path='/profile/*' element={<Profile></Profile>}></Route> */}
        <Route path='/post/*' element={<Comments/>}></Route>
        <Route path="/Home/*" element={<Home/>}></Route>
        <Route path='/profile/*' element={<Profile></Profile>}></Route>
        <Route path='/editprofile/*' element={<EditProfile/>}></Route>
        {/* <Route path='/editprofile/' element={<EditProfile/>}></Route> */}
      </Route>
        <Route path='/Home/' element={<NotFound/>}></Route>
        <Route path="/SignUp" element={<SignUpForm/>}></Route>
        <Route path='/About' element={<Abouts></Abouts>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
    </div>
  )
}

export default App;
