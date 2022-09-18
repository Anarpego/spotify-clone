import { render, screen } from '@testing-library/react';
import { HistoryPage } from '../../pages/user/HistoryPage';
describe('tests in <HistoryPage />', () => {


	test('should show history page', () => {


		render(
			<HistoryPage />
		);

		screen.debug();
	})

})