import {useEffect} from 'react'

function Header(props){
    useEffect( () => {document.title=props.title})
    return 

}

export default Header