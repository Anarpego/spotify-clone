import { fireEvent, render, screen } from '@testing-library/react'
import { UpdateUserForm } from '../../components/user/UpdateUserForm';
import { AuthProvider } from '../../context/AuthContext';

describe('tests on <UpdateUserForm />', () => {

	test('tests on update form', () => {

		render(
			<AuthProvider>
				<UpdateUserForm />
			</AuthProvider>

		);

		const inputName = screen.getByTestId('name');
		const inputEmail = screen.getByTestId('email');

		fireEvent.change(inputName, {target: {value: 'Juan Solares'}});
		fireEvent.change(inputEmail, {target: {value: 'correo@gmail.com'}});
		
		const btn = screen.getByTestId('btn-update');

		fireEvent.click(btn);
	});

});