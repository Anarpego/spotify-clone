

import { Sidebar } from '../components/ui/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


export const UserRouter = () => {

	const { auth } = useContext(AuthContext);
	const token = localStorage.getItem('token');



	// * There is a stored token
	if (token && auth.logged) {
		//console.log('You can store the user');
		localStorage.setItem('storedUser', JSON.stringify(auth));


	}


	return (

		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100 p-t-50 p-b-90">
					<Sidebar />
				</div>
			</div>
		</div>

	);
};
