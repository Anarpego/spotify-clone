import { fireEvent, getByPlaceholderText, getByText, render, screen } from '@testing-library/react';
import { LoginPage, RecoverPage } from '../../pages/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { useContext } from 'react';
import { fetchWithoutToken } from '../../helpers/fetch';
import { Simulate, act } from 'react-dom/test-utils';
import { AuthProvider } from '../../context/AuthContext';

describe('Tests in <LoginPage /> ', () => {


	test('should change login values', async () => {


		render(

			<AuthProvider>
				<Router>
					<LoginPage />
				</Router>
			</AuthProvider>

		);

		screen.debug();

		// ** don't delete
		const inputEmail = screen.getByTestId('email');
		const inputPassword = screen.getByTestId('password');


		fireEvent.change(inputEmail, {target: {value: 'leomessi@gmail.com'}});
		fireEvent.change(inputPassword, {target: {value: 'hola123'}});

		const btn = screen.getByTestId('btn-login');

		fireEvent.click(btn);


		// let a = screen.getByPlaceholderText('Password') as HTMLInputElement | null;
		// let b = screen.getByPlaceholderText('Email') as HTMLInputElement | null;


		// if (a !== null && b !== null) {

		// 	a.value = 'maria@gmail.com';
		// 	b.value = 'hola123!';

		// 	//console.log(a.value, b.value);

		// 	//	screen.debug();
		// 	const button = screen.getByText('Login');
		// 	//console.log(button);

		// 	fireEvent.click(button);




		// 	// const email = a.value;
		// 	// const password = b.value;
		// 	// const { status, client, token } = await fetchWithoutToken('login',
		// 	// 	{ email, password }, 'POST');

		// 	// console.log(status);

		// 	// expect(status).toBe(200);

		// }

	});

	test('should change login values', async () => {


		render(

			<AuthProvider>
				<Router>
					<RecoverPage />
				</Router>
			</AuthProvider>

		);

		screen.debug();

		// ** don't delete
		const inputEmail = screen.getByTestId('email');


		fireEvent.change(inputEmail, {target: {value: 'solaresjuan43@gmail.com'}});

		const btn = screen.getByTestId('btn-sendcode');

		fireEvent.click(btn);


	});

}); 