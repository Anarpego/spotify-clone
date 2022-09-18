import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { fetchWithToken } from '../helpers/fetch';
import { UserAuth, UserCard } from '../interfaces/';
import Swal from 'sweetalert2';

export const useAccount = () => {

	const token = localStorage.getItem('token') || '';
	// * User data (with token)
	const [userAuth, setUserAuth] = useState<UserAuth>();
	const [loadingAccData, setLoadingAccData] = useState(true);

	// * User Card (with token)
	const [userCard, setUserCard] = useState<UserCard>();
	const [loadingCard, setLoadingCard] = useState(true);


	const getAccountData = async () => {
	
		await axios.get(`${process.env.REACT_APP_ACCOUNT_SERVICE}/account/user`, {
			headers: {
				'x-auth-token': `Bearer ${token}`,
			},
		}).then((response) => {
			//console.log(response.data);
			setUserAuth(response.data);
			setLoadingAccData(false);
		});



	};

	const getCardData = async () => {


		await axios.get(`${process.env.REACT_APP_ACCOUNT_SERVICE}/account/card/`,
			{
				headers: {
					'x-auth-token': `Bearer ${token}`
				}
			}
		)
			.then((response) => {
				//console.log(response.data);
				setUserCard(response.data);
				setLoadingCard(false);
			});

	};

	const updateAccount = async (body: UserAuth) => {

		await axios.put(`${process.env.REACT_APP_ACCOUNT_SERVICE}/account/user/`,
			body,
			{
				headers: {
					'x-auth-token': `Bearer ${token}`
				}
			}
		)
			.then((response) => {
				//console.log(response);

				if (response.status === 200) {
					Swal.fire('User updated', '', 'success');
				} else {
					Swal.fire('User no updated', 'an error has occurred', 'error');
				}

			});
	};

	const subscribeAccount = async () => {

		await axios.put(`${process.env.REACT_APP_SUBSCRIPTION_SERVICE}/account/sub/`, { 'test': 'test' },
			{
				headers: {
					'x-auth-token': `Bearer ${token}`
				}
			}
		)
			.then((response) => {
				//console.log(response.data);
				Swal.fire('User subscribed', '', 'success');
			})
			.catch((err) => {
				//console.log(err);
				Swal.fire('An error has occurred', '', 'error');
			});

	};


	const unsubscribeAccount = async () => {

		await axios.put(`${process.env.REACT_APP_SUBSCRIPTION_SERVICE}/account/unsub/`, { 'test': 'test' },
			{
				headers: {
					'x-auth-token': `Bearer ${token}`
				}
			}
		)
		.then((response) => {
			//console.log(response.data);
			Swal.fire('User unsubscribed :(', '', 'info');
		})
		.catch((err) => {
			//console.log(err);
			Swal.fire('An error has occurred', '', 'error');
		});

	};

	useEffect(() => {

		getAccountData();

		getCardData();

	}, []);


	return {
		userAuth,
		loadingAccData,
		userCard,
		loadingCard,
		updateAccount,
		getAccountData,
		subscribeAccount,
		unsubscribeAccount
	};
};
