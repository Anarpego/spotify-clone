
import { render, screen } from '@testing-library/react';
import { AccountTable } from '../../components/user/AccountTable';
import { UserAuth } from '../../interfaces';
import { useAccount } from '../../hooks/useAccount';
import { AuthContext, AuthProvider } from '../../context/AuthContext';


describe('testing <AccountTable />', () => {


	const user: UserAuth = {
		id: 4,
		name: "Maria Laura Smith",
		email: "maria@gmail.com",
		password: "$2b$10$7hSF3SqBdZ6.d3NRnw1hYOqXr7v0IUWWjbwW/uRRg5rMcd8xOF3gK",
		card_id: 4,
		subscription: 0,
		gravatar: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
	}

	test('should render', () => {

		render(
			<AuthProvider>
				<AccountTable userAuth={user} />
			</AuthProvider>
		);

		//expect(screen.getByText("Email")).toBeInTheDocument()

	});

});