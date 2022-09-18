import { Button, Checkbox, Divider, Input, Loading, Modal, Row, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useAccount } from '../../hooks/useAccount';

interface Props {
	visible: boolean;
	closeHandler: () => void;
}

export const SubscriptionModal = ({ visible, closeHandler }: Props) => {


	const { userCard, loadingCard } = useAccount();


	return (
		<>

			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			//width={'200'}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Susbscribe to {' '}
						<Text b size={18}>
							Premium
						</Text>
					</Text>
				</Modal.Header>
				<Modal.Body>
					
					<Divider />
					<Spacer y={1} />
					{
						(loadingCard) ?
							(
								<Loading />
							)
							:
							(
								<>
									<h5> Card number: </h5>
									<p>xxxx-xxxx-xxxx-{userCard?.last_number}</p>
									{/* <h5> Expiration date: </h5>
				
									<p>xxxx-xxxx-xxxx-{userCard?.exp_date}</p> */}

								</>


							)
					}



				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onClick={closeHandler}>
						Close
					</Button>
					<Button auto onClick={closeHandler} className="btn-subUser" color="primary">
						Subscribe
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
