interface LoginBody {
	email: string;
	password: string;
}

interface sendEmailBody {
	email: string;
}

export const fetchWithoutToken = async (endpoint: string, data: LoginBody, method = 'GET') => {

	const url = `${process.env.REACT_APP_AUTH_SERVICE}/${endpoint}`;
	//const url = 'http://localhost:3011/login';
	if (method === 'GET') {

		const resp = await fetch(url);

		console.log(resp);

		return await resp.json();

	} else {
		//console.log(data);

		const resp = await fetch(url, {
			method,
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify(data)
		});

		return await resp.json();

	}


};


export const fetchWithToken = async (endpoint: string, data: LoginBody = { email: '', password: '' }, method = 'GET') => {
	const url = `${process.env.REACT_APP_AUTH_SERVICE}/${endpoint}`;
	//const url = `http://localhost:3030/${endpoint}`;
	const token = localStorage.getItem('token') || '';

	//console.log(url)
	if (method === 'GET') {
		const resp = await fetch(url, {
			headers: {
				'x-token': 'Bearer ' + token
			}
		});

		return await resp.json();
	} else {

		if (data) {
			const resp = await fetch(url, {
				method,
				headers: {
					'Content-type': 'application/json',
					'x-token': token
				},
				body: JSON.stringify(data)
			});

			return await resp.json();
		}



	}
};



export const recoverPassword = async ( endpoint:string, data: object, method = 'POST') => {
	const url = `${process.env.REACT_APP_ACCOUNT_SERVICE}/account/${endpoint}`;
	
	//const url = `http://localhost:3032/user-api/account/${endpoint}`;

	const resp = await fetch(url, {
		method,
		headers: {
			'Content-type': 'application/json',
			
		},
		body: JSON.stringify(data),
	});

	return  resp;

};

