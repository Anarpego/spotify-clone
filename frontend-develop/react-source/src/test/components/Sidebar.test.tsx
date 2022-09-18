import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Sidebar } from '../../components/ui/Sidebar';
import { AuthProvider } from '../../context/AuthContext';


describe('tests on <Sidebar />', () => {

	test('should render sidebar component and click logout component', () => {

		render(
			<AuthProvider>


				<MemoryRouter>
					<Sidebar />
				</MemoryRouter>

			</AuthProvider>
		);

		//screen.debug();
		fireEvent.click(screen.getByText('Logout'));

	});


	//screen.debug();
	//expect(screen.getByRole('text'));

});