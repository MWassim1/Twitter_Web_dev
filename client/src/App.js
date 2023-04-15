import './App.css';
import {Routes,Route} from "react-router-dom"
import SignInForm from './components/SignIn/signInForm';
import SignUpForm from './components/SignUp/signUpForm';
import Home from './components/Home/home';
import Profile from './components/Profile/profile';
import ProtectedRoutes from './components/x/protectedRoutes';
import NotFound from './components/x/notfound';

function App() {
  
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<SignInForm></SignInForm>}></Route>
      <Route element={<ProtectedRoutes></ProtectedRoutes>}>
        <Route path='/Home/' element={<NotFound/>}></Route>
        <Route path='/Home/profile' element={<Profile></Profile>}></Route>
        <Route path="/Home/*" element={<Home/>}></Route>
      </Route>
        <Route path="/SignUp" element={<SignUpForm/>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
    </div>
  )
}

export default App;
