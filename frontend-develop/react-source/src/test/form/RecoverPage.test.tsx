
import { screen, render, fireEvent } from '@testing-library/react';
import { RecoverPage } from '../../pages/auth';
import { BrowserRouter as Router } from 'react-router-dom';


describe('tests in <RecoverPage /> ', () => {

	test('should render RecoverPage', () => {

		render(
			<Router>
				<RecoverPage />
			</Router>

		);
		

		let emailField = screen.getByPlaceholderText('Email') as HTMLInputElement | null;
		const button = screen.getByText('Send Code');
		
		if (emailField) {
			
			emailField.value = 'solaresjuan43@gmail.com';

			//screen.getByRole('button');

			//screen.debug();

			fireEvent.click(button);
		}
		

		
		//console.log(button)
		//screen.debug();
	});

});