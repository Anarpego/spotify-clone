import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { RegisterPage } from '../../pages/auth';
import axiosMock from 'axios';

jest.mock('axios');


afterEach(() => {
	jest.clearAllMocks();
})


describe('tests in <RegisterPage />', () => {

	test('should make a register in the platform', () => {

		render(
			<>
				<Router>
					<RegisterPage />
				</Router>
			</>
		);


		const spy = jest.spyOn(axiosMock, 'post'); // * 

		const inputName = screen.getByTestId('name');
		const inputEmail = screen.getByTestId('email');


		const inputPassword = screen.getByTestId('password');
		const inputPassword2 = screen.getByTestId('password2');

		fireEvent.change(inputName, { target: { value: 'Probando Form 2' } });
		fireEvent.change(inputEmail, { target: { value: 'prueba123@gmail.com' } });
		fireEvent.change(inputPassword, { target: { value: 'hola123' } });
		fireEvent.change(inputPassword2, { target: { value: 'hola123' } });


		const btn = screen.getByTestId('btn-register');


		fireEvent.click(btn);

		expect(spy).not.toHaveBeenCalled(); 
	});


});