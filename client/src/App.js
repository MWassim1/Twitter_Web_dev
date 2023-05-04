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
import FilterPost from './components/x/filter_post';
import FriendRequest from './components/Friend/friendRequest';
import Follows from './components/Follow/follows';
import Followers from './components/Follow/followers';


function App() {
  
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<SignInForm></SignInForm>}></Route>
      <Route element={<ProtectedRoutes></ProtectedRoutes>}>
        <Route path='/post/*' element={<Comments/>}></Route>
        <Route path="/Home/*" element={<Home/>}></Route>
        <Route path='/profile/*' element={<Profile></Profile>}></Route>
        <Route path='/editprofile/*' element={<EditProfile/>}></Route>
        <Route path='/filter/*' element={<FilterPost/>}></Route>
        <Route path='/friendrequest/*' element={<FriendRequest/>}></Route>
        <Route path='/follows/*' element={<Follows/>}></Route>
        <Route path='/followers/*' element={<Followers/>}></Route>
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
