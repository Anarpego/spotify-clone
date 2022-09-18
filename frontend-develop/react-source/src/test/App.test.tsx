import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Sidebar } from '../components/ui/Sidebar';
import { AuthProvider } from '../context/AuthContext';
import { AppRouter } from '../routes/AppRouter';
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../theme/darktheme';


describe('tests on <App />', () => {

	test('should render App component', () => {

		render(
			<NextUIProvider theme={darkTheme}>
				<AuthProvider>
					<AppRouter />
				</AuthProvider>

			</NextUIProvider>

		);

	});


	//screen.debug();
	//expect(screen.getByRole('text'));

});