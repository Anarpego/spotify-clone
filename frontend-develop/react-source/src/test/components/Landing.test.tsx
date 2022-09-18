import { screen, render } from '@testing-library/react';
import { LandingPage } from '../../pages/auth';
import { BrowserRouter as Router } from 'react-router-dom';


describe('test <LandingPage /> ', () => {


	test('should render Landing Page component', () => {

		render(
			<Router>
				<LandingPage />
			</Router>

		)
	});

});