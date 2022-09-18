import { render } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Sidebar } from '../../components/ui/Sidebar';
import { AuthProvider } from '../../context/AuthContext';
import { UserRouter } from '../../routes/UserRouter';

describe('test in <UserRouter />', () => {


	test('should first', () => {

		render(
			<AuthProvider>


				<MemoryRouter>
					<UserRouter />
				</MemoryRouter>

			</AuthProvider>
		);

	});

})