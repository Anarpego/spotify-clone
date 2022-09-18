import { useState } from 'react';
import { Spacer, Button, Input, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAccount } from '../../hooks/useAccount';
import { AccountTable } from '../../components/user/AccountTable';
import { SubscriptionModal } from '../../components/user/SubscriptionModal';
import { UpdateUserForm } from '../../components/user/UpdateUserForm';

export const AccountPage = () => {

	const { auth } = useContext(AuthContext);

	const {
		userAuth,
		loadingAccData,
		loadingCard,
		updateAccount,
		subscribeAccount,
		unsubscribeAccount } = useAccount();

	//console.log(auth);
	const [isEditingProfile, setIsEditingProfile] = useState(false);

	// * MODAL
	const [visible, setVisible] = useState(false);

	const handler = () => setVisible(true);
	const closeHandler = async () => {

		await subscribeAccount();
		setVisible(false);

		//console.log('closed');
	};

	return (
		<div
			className='animate__animated animate__fadeIn float-container'
			style={{ width: '100%', padding: '50px' }}>

			<h1>Account Overview</h1>
			<hr />

			<Spacer />

			{
				isEditingProfile ?

					(
						<>
							<div className='animate__animated animate__fadeIn center' style={{ border: 'none' }}>

								<Button
									color="secondary"
									className='btn-profileInfo'
									onPress={() => setIsEditingProfile(false)}>
									Profile info
								</Button>

								<Spacer y={2.5} />
								{/** ================================= FORM ================================= */}

								<UpdateUserForm />
								{/** ================================= END FORM ================================= */}
								<Spacer y={2.5} />

								<h2>Your plan</h2>
								{/** ================================= SUBSCRIBE / UNSUBSCRIBE ================================= */}
								{
									auth.isSubscribed && (
										<>
											<Text>You have a Premiun account</Text>
											<Spacer y={1} />
											<Button color="error" className='btn-unsubscribe' onPress={async () => unsubscribeAccount()}>
												Cancel
											</Button>
										</>
									)
								}

								{
									(!auth.isSubscribed && !loadingCard) && (
										<>
											<Text>You have a Free account</Text>
											<Spacer y={1} />
											<Button color="success" className='btn-subscribe' onPress={() => setVisible(true)}>
												Upgrade
											</Button>
										</>

									)
								}

								<Spacer y={2.5} />

								<SubscriptionModal visible={visible} closeHandler={() => closeHandler()} />


							</div>
						</>


					)
					:
					(
						<>

							<AccountTable userAuth={userAuth!} />
							<Button color="secondary" className='btn-editProfile' onPress={() => setIsEditingProfile(true)}>
								Edit profile
							</Button>
						</>
					)

			}


		</div>
	);
};
