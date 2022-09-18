
import { useState, createContext, useCallback } from 'react';
import Swal from 'sweetalert2';
//import { useNavigate } from 'react-router-dom'
import { fetchWithoutToken } from '../helpers/fetch';
import axios from 'axios';
import md5 from 'md5';
import { UserAuth } from '../interfaces/userauth';
import { parse } from 'path';

interface initState {
	uid: number;
	checking: boolean;
	logged: boolean;
	gravatar: string,
	name: string;
	email: string;
	isSubscribed: boolean;
	cardId: number;
}

interface IContextProps {
	auth: initState;
	login: (email: string, password: string) => Promise<boolean>
	logout: () => boolean;
	register: (nombreUsuario: string, usuario: string, claveUsuario: string, file: string, card: object) => Promise<void>;
	updateCard: (number: string, cvv: string, exp_date: string, balance: number) => Promise<void>;
	verifyToken: () => Promise<boolean>;
	updateUser: (updatedUser: UserAuth) => void;
}
export const AuthContext = createContext({} as IContextProps);

const initialState = {
	uid: 0,
	checking: true,
	logged: false,
	name: '',
	email: '',
	gravatar: '',
	isSubscribed: false,
	cardId: 0
};

export const AuthProvider = ({ children }: any) => {

	const [auth, setAuth] = useState(initialState);


	const register = async (name: string, email: string, password: string, gravatar: string, card: object) => {

		gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;
		//console.log(`nombre usuario ${name}, usuario ${email}, clave usuario ${password}, file ${gravatar}`);


		//console.log(process.env.REACT_APP_STREAMING_SERVICE);
		await axios.post(`${process.env.REACT_APP_AUTH_SERVICE}/register-api/register`, { name, email, password, gravatar, card })
		//await axios.post('http://localhost:3012/register', { name, email, password, gravatar, card })
		.then(resp => {
				//console.log(resp);

				/*if (resp.data.correcto) {*/
				Swal.fire('Success!', 'Your user has been created succesfully', 'success');
				return true;
				/* } else {
					Swal.fire('Error', 'The username is already used by another user', 'error');
				}*/

			})
			.catch((err) => {
				//console.error(err.response.data);
				Swal.fire('Error', 'Error creating the user', 'error');
				return false;
			});

	};


	const updateCard = async (number: string, cvv: string, exp_date: string, balance: number) => {

		const id = auth.uid;
		await axios.put(`${process.env.REACT_APP_ACCOUNT_SERVICE}/account/card`, { id, number, cvv, exp_date, balance },
			{
				headers: {
					'x-auth-token': 'Bearer ' + localStorage.getItem('token')
				}
			})
			.then(resp => {
				//console.log(resp);

				/*if (resp.data.correcto) {*/
				Swal.fire('Success!', 'Your card has been created succesfully', 'success');
				return true;
				/* } else {
				   Swal.fire('Error', 'The username is already used by another user', 'error');
				 }*/

			})
			.catch((err) => {
				console.error(err);
				Swal.fire('Error', 'Error creating the card', 'error');
				return false;
			});

	};

	const login = async (email: string, password: string) => {

		const { status, client, token } = await fetchWithoutToken('login-api/login', { email, password }, 'POST');

		// * Successful login
		if (status === 200) {
			localStorage.setItem('token', token);
			const subscriptionValue = (client.subscription) ? true : false;
			// change
			setAuth({
				uid: client.id,
				name: client.name,
				email: client.email,
				gravatar: client.gravatar,
				checking: false,
				logged: true,
				isSubscribed: subscriptionValue,
				cardId: client.card_id
			});

			return true;
		} else {
			setAuth({
				...auth,
				checking: false,
				logged: false,
			});

			Swal.fire('Incorrect login', 'Please try again :( ', 'error');
			//console.log('F');
			return false;
		}



	};

	const verifyToken = useCallback(async () => {

		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('storedUser');
		//console.log(storedUser);
		//console.log(token);
		// * There is no token
		if (!token && storedUser === '') {
			console.log('no token :(');
			setAuth({
				uid: 0,
				checking: false,
				logged: false,
				gravatar: '',
				name: '',
				email: '',
				isSubscribed: false,
				cardId: 0
			});

			return false;
		}



		// if (token) {
		// 	console.log('no user :(');
		// }


		// * If there is a loggedUser and token stored
		if (token) {
			//console.log('there is a logged user');
			const stringUser = localStorage.getItem('storedUser');
			//console.log(loc);
			if (stringUser) {
				const parsed = JSON.parse(stringUser);
				//console.log(parsed);

				setAuth({
					uid: parsed.uid,
					checking: false,
					logged: true,
					gravatar: parsed.gravatar,
					name: parsed.name,
					email: parsed.email,
					isSubscribed: parsed.isSubscribed,
					cardId: parsed.cardId
				});

				return true;
			}


			return true;
		}


		return false;

	}, []);



	const logout = () => {


		// backend....
		//localStorage.setItem('token', '');
		localStorage.removeItem('token');
		localStorage.removeItem('storedUser');
		localStorage.removeItem('songs');
		setAuth({
			uid: 0,
			checking: false,
			logged: false,
			gravatar: '',
			name: '',
			email: '',
			isSubscribed: false,
			cardId: 0
		});

		return auth.logged;

	};


	const updateUser = (updatedUser: UserAuth) => {
		//console.log('a');	

		setAuth({
			...auth,
			name: updatedUser.name,
			gravatar: updatedUser.gravatar,
			email: updatedUser.email,
		});

	};



	return (
		<AuthContext.Provider value={{
			auth,
			register,
			updateCard,
			login,
			logout,
			verifyToken,
			updateUser
		}}>
			{children}
		</AuthContext.Provider>
	);
};
