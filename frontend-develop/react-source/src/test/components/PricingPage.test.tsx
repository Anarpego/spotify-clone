import { screen, render } from '@testing-library/react';
import { PricingPage } from '../../pages/auth';
import { BrowserRouter as Router } from 'react-router-dom'


describe('tests on <PricingPage />', () => {


	test('should render PricingPage', () => {

		render(
			<Router>
				<PricingPage />
			</Router>
		);
		
	});

});
