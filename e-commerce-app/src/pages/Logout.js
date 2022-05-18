import { useContext, useEffect } from 'react';
import { Navigate} from 'react-router-dom';
//Redirect
import UserContext from '../UserContext';

export default function Logout() {

	const { unsetUser, setUser } = useContext(UserContext);

	//Clear the localStorage
	unsetUser()

	
	//By adding the useEffect, this will allow the Logout page to render first before triggering the useEffect which changes the state of our user
	useEffect(() => {
		//Set the user state back into it's original value
		setUser({id: null})
	}, [])

	return(

		<Navigate to="/" />

		)


}