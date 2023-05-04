import Header from "../x/header"
import '../../css/formulaire.css';  
import Logo from "../../logo.png"
import { useState,useEffect , useRef} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckIcon from "../../image/check.webp"




function EditProfile(props){

    const axiosUrlUpdateUser = "http://localhost:7000/api/user/"
    const axiosUrlLogout = "http://localhost:7000/api/user/logout"
    const axiosUrlUser = "http://localhost:7000/api/user/:id"

    const url = window.location.href
    const last_slash = url.lastIndexOf('/')
    const id = url.slice(last_slash+1)


    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+-]).{8,24}$/;
	const NAME_REGEX = /^[^@&"()!_$*£`+=:/\|,?;#][^0-9][A-z\s?]{1,30}$/;
    const CITY_COUNTRY_REGEX = /^[a-zA-Z\s-]+$/

    const navigate = useNavigate()

    const userRef = useRef();

    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);


    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [city, setCity] = useState('')
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const [country, setCountry] = useState('')
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);


    const [account,setAccount] = useState({
		lastname:'',
		firstname :'',
		email:'',
		username:'',
		password:'',
        profile_picture: '',
        bio: '',
        age: '',
        ville: '',
        pays: '',
		
	})

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
		setAccount({...account,username:user})
    }, [user])


	useEffect(() => {
        setValidLastname(NAME_REGEX.test(lastname));
		setAccount({...account,lastname:lastname})
    }, [lastname])

	useEffect(() => {
        setValidFirstname(NAME_REGEX.test(firstname));
		setAccount({...account,firstname:firstname})
    }, [firstname])

	useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
		setAccount({...account,password:password})
    }, [password])

    useEffect(() => {
        setValidCity(CITY_COUNTRY_REGEX.test(city));
		setAccount({...account,ville:city})
    }, [city])

    useEffect(() => {
        setValidCountry(CITY_COUNTRY_REGEX.test(country));
		setAccount({...account,pays:country})
    }, [country])


    const handleClickLogout = (evt) =>{
        evt.preventDefault()
        axios.post(axiosUrlUser,{_id:`${id}`})
        .then((res)=>{
          axios.put(axiosUrlLogout,{id:res.data._id, email : res.data.email , password : res.data.password, isconnected : false } ) 
          .catch((err)=> console.log(err.response))
          navigate('/')
      })
      .catch(err =>{console.log(err)})
      }

    const handleconvertImage = (evt) =>{

        var reader = new FileReader()
        reader.readAsDataURL(evt.target.files[0])
        reader.onload = () =>{
            const{name} = evt.target;
		    setAccount({...account,[name]:reader.result})
            console.log(reader.result)
        }
        reader.onerror = error =>{
            console.log("Error : ",error)
        }

    }

    const handleSubmit = (evt) =>{
        evt.preventDefault()
        console.log("ACCOUNT : ",account)
        axios.put(axiosUrlUpdateUser+id,account)
            .then((res)=>{
                document.getElementById("popup-confirm-edit").style.visibility = "visible"
            })
            .catch((err)=>{document.getElementById("popup-error-edit").style.visibility = "visible"})
    }

    const handleChange = (evt) => {
		const{name,value} = evt.target;
		setAccount({...account,[name]:value})
	  }

    const handleClickProfile = (evt) =>{
        navigate('/home/'+id)
    }
    const handleClickgoProfile = (evt) =>{
        document.getElementById("popup-confirm-edit").style.visibility = "hidden"
        navigate('/profile/'+id)
    }
    const handleClickHide = (evt) =>{
        document.getElementById("popup-error-edit").style.visibility = "hidden"
    }


    return (
        <div>
            <Header title="Modifier son profil"></Header>
            <header id="edit_header">
                <img className="header-logo" src={Logo} alt="Logo" />
                <div className="return-button-section">
                    <button className="edit_return-button" onClick={handleClickProfile}>Accueil</button>
                </div>
                <div className="logout-button-profile-section">
                    <button className="edit_logout-button-profile" onClick={handleClickLogout}>Déconnexion</button>
                </div>
	        </header>
            

        <div className="edit-form">
            <form id="edit-profile-form" action="/profile" method="put" onSubmit={handleSubmit}>

                <label id="edit_label" htmlFor="profile-picture">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Photo de profil :</label>
                <input accept="image/*" type="file" id="profile-picture" name="profile_picture" onChange={handleconvertImage}/><br/>

                <label id="edit_label" htmlFor="edit_lastname">Nom :<FontAwesomeIcon icon={faCheck} className={validLastname? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validLastname || !lastname ? "hide" : "invalid"} /></label>
                <input type="text" id="edit_lastname" name="lastname"ref={userRef} onChange={(e) => setLastname(e.target.value)} value={lastname} required aria-invalid={validLastname ? "false" : "true"} aria-describedby="lastname_alert" onFocus={() => setLastnameFocus(true)}onBlur={() => setLastnameFocus(false)} />
                <p id="lastname_alert" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />Ne doit être composé que de lettres</p>
                <br/>

                <label id="edit_label" htmlFor="edit_firstname">&emsp;&emsp;Prénom :<FontAwesomeIcon icon={faCheck} className={validFirstname? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validFirstname|| !firstname ? "hide" : "invalid"} /></label>
                <input type="text" id="edit_firstname" name="firstname"  ref={userRef} onChange={(e) => setFirstname(e.target.value)} value={firstname}  required aria-invalid={validFirstname ? "false" : "true"} aria-describedby="firstname_alert" onFocus={() => setFirstnameFocus(true)}onBlur={() => setFirstnameFocus(false)} />
                <p id="firtname_alert" className={firstnameFocus && firstname && !validFirstname? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />Ne doit être composé que de lettres</p>
                <br/>

                <label id="edit_label" htmlFor="edit_email">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Adresse e-mail :</label>
                <input type="email" id="edit_email" name="email" required onChange={handleChange}/><br/>

                <label id="edit_label" htmlFor="edit_username">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;Nom d'utilisateur:<FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /></label>
                <input type="text" id="edit_username" name="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required aria-invalid={validName ? "false" : "true"} aria-describedby="user_alert" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)}/>
                <p id="user_alert" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
		        <FontAwesomeIcon icon={faInfoCircle} />4 à 24 caractères.<br />Doit commencer par une lettre.<br />Les lettres,chiffres et les underscores sont autorisés (pas d'espaces).</p>
                <br/>

                <label id="edit_label" htmlFor="edit_password">&emsp;&emsp;&emsp;&emsp;&emsp;Mot de passe :<FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} /></label>
                <input type="password" id="edit_password" name="password" aria-describedby="pas" onChange={(e) => setPassword(e.target.value)} value={password} required aria-invalid={validPassword ? "false" : "true"} onFocus={() => setPasswordFocus(true)}onBlur={() => setPasswordFocus(false)}/>
                <p id="password_alert" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />8 à 24 caractères.<br />Doit être composé d'une majuscule, d'une minuscule, un chiffre et un caractère spécial.<br />Les caractères autorisés sont : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>
                <br/>

                <label id="edit_label" htmlFor="edit_bio">&emsp;&emsp;&emsp;&ensp;Biographie :</label><br/>
                <textarea id="edit_bio" className="edit_textarea" name="bio" onChange={handleChange}></textarea><br/>

                <label id="edit_label" htmlFor="edit_age">Âge :</label>
                <input type="number" id="edit_age" name="age" min="7" max="99" onChange={handleChange}/><br/>

                <label id="edit_label"  htmlFor="edit_ville" onChange={handleChange} >Ville :<FontAwesomeIcon icon={faCheck} className={validCity? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validCity || !city ? "hide" : "invalid"} /></label>
                <input type="text" id="edit_ville" name="ville" aria-describedby="pas" onChange={(e) => setCity(e.target.value)} value={city} aria-invalid={validCity ? "false" : "true"} onFocus={() => setCityFocus(true)}onBlur={() => setCityFocus(false)}/><br/>
                <p id="city_alert" className={cityFocus && !validCity ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />Doit uniquement contenir des lettres.<br/></p>

                <label id="edit_label" htmlFor="edit_pays" onChange={handleChange}>Pays :<FontAwesomeIcon icon={faCheck} className={validCountry? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validCountry || !country ? "hide" : "invalid"} /></label>
                <input type="text" id="edit_pays" name="pays" aria-describedby="pas" onChange={(e) => setCountry(e.target.value)} value={country} aria-invalid={validCountry? "false" : "true"} onFocus={() => setCountryFocus(true)}onBlur={() => setCityFocus(false)}/><br/>
                <p id="country_alert" className={countryFocus && !validCountry ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />Doit uniquement contenir des lettres.<br/></p>

                <input type="submit" id="edit-profile-submit" value="Enregistrer les modifications"/>
            </form>
	    </div>
        <div id="popup-confirm-edit">
        <p id="text_popup_confirm-edit">Compte mis à jour <img id="img_popup_confirm" src={CheckIcon}/></p>
        <button id="confirm_edit_pop_button" onClick={handleClickgoProfile} >OK</button>
        </div>

        <div id="popup-error-edit">
        <p id="text_popup_error-edit">Erreur l'adresse mail est déjà utlisée. Essayez une autre adresse.</p>
        <button id="confirm_error_pop_button" onClick={handleClickHide} >OK</button>
        </div>
     </div>

    )


}


export default EditProfile