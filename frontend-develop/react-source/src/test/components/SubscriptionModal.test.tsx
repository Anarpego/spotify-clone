import { render } from '@testing-library/react';
import { SubscriptionModal } from '../../components/user/SubscriptionModal';



describe('test on <SubscriptionModal />', () => {


	test('should first', () => {


		render(
			<SubscriptionModal visible={true} closeHandler={function (): void {
				throw new Error('Function not implemented.');
			} } />
		)
	});

});