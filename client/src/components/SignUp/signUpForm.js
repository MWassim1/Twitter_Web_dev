import '../../css/creer-compte.css'
import Header from "../x/header"
import { useEffect, useRef, useState } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"


function SignUpForm(props){

	const axiosUrl = "http://localhost:7000/api/users"
	const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+-]).{8,24}$/;
	const NAME_REGEX = /^[^@&"()!_$*£`+=:/\|,?;#][^0-9][A-z\s?]{1,30}$/;

	const userRef = useRef();

    


	const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

	const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);


	const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);



	const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

   

	const [account,setAccount] = useState({
		lastname:'',
		firstname : '',
		email:'',
		username:'',
		password:''
		
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

   


	const handleSubmit = (evt) => {
		evt.preventDefault()
		console.log(account)

		axios.post(axiosUrl,account)
		.then(res=>{
			if(res.status ===201){
				window.location.replace("http://localhost:3000/Home/"+`${res.data._id}`);

			}
		})
   		.catch((err)=> console.log(err.response))
	}

	const handleChange = (evt) => {
		const{name,value} = evt.target;
		setAccount({...account,[name]:value})
	  }

	 


    return <div><Header title="Créer un compte"></Header><h1>Créer un compte</h1>
	<form action="" method="post" onSubmit={handleSubmit}>

        <label htmlFor="lastname">Nom:<FontAwesomeIcon icon={faCheck} className={validLastname? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validLastname || !lastname ? "hide" : "invalid"} /></label>
		<input type="text" id="lastname" ref={userRef} onChange={(e) => setLastname(e.target.value)} value={lastname}  required aria-invalid={validLastname ? "false" : "true"} aria-describedby="lastname_alert" onFocus={() => setLastnameFocus(true)}onBlur={() => setLastnameFocus(false)} />
		<p id="lastname_alert" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />Ne doit être composé que de lettres</p>



		<label htmlFor="firstname">Prénom:<FontAwesomeIcon icon={faCheck} className={validFirstname? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validFirstname|| !firstname ? "hide" : "invalid"} /></label>
		<input type="text" id="firstname" ref={userRef} onChange={(e) => setFirstname(e.target.value)} value={firstname}  required aria-invalid={validFirstname ? "false" : "true"} aria-describedby="firstname_alert" onFocus={() => setFirstnameFocus(true)}onBlur={() => setFirstnameFocus(false)} />
		<p id="firtname_alert" className={firstnameFocus && firstname && !validFirstname? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />Ne doit être composé que de lettres</p>

		<label htmlFor="email">Adresse e-mail :<input type="email" id="email" name="email" value={account.email} autoComplete="off" onChange={handleChange}/><br/></label>



		<label htmlFor="username_singUp">Nom d'utilisateur :<FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /></label>
		<input type="text" id="username_signUp"  ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required aria-invalid={validName ? "false" : "true"} aria-describedby="user_alert" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)}/>
		<p id="user_alert" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
		<FontAwesomeIcon icon={faInfoCircle} />4 à 24 caractères.<br />Doit commencer par une lettre.<br />Les lettres,chiffres et les underscores sont autorisés (pas d'espaces).</p>




		<label htmlFor="password">Mot de passe :<FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} /><FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} /></label>
		<input type="password" id="password" aria-describedby="pas" onChange={(e) => setPassword(e.target.value)} value={password} required aria-invalid={validPassword ? "false" : "true"} onFocus={() => setPasswordFocus(true)}onBlur={() => setPasswordFocus(false)}/><br/>
		<p id="password_alert" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />8 à 24 caractères.<br />Doit être composé d'une majuscule, d'une minuscule, un chiffre et un caractère spécial.<br />Les caractères autorisés sont : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>

		<input id = "btn" type="submit" value="Créer un compte"/>
	</form>
    </div>
}

export default SignUpForm