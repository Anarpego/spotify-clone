import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Spacer, Input, Button } from '@nextui-org/react';
import { useForm } from '../../hooks/useForm';
import { useAccount } from '../../hooks/useAccount';
import { UserAuth } from '../../interfaces/userauth';


export const UpdateUserForm = () => {

	const { auth, updateUser } = useContext(AuthContext);

	const { userAuth, updateAccount, userCard, loadingAccData, loadingCard } = useAccount();

	const { formData, onChangeForm } = useForm({
		name: auth.name || '',
		email: auth.email || ''
	});

	const onUpdateUser = () => {
		//
		const userToUpdate: UserAuth = {
			id: auth.uid ? auth.uid : 0,
			name: formData.name,
			email: formData.email,
			card_id: auth.cardId,
			gravatar: auth.gravatar,
			subscription: userAuth?.subscription ? true : false
		};
		// update user - axios
		console.log(userToUpdate);
		updateAccount(userToUpdate);

		// // TODO: 1. update user: context
		updateUser(userToUpdate);
		//console.log(body);
	};


	return (
		<div>

			
			<h2> Profile </h2>
			{/** FORM */}
			<Spacer y={2.5} />
			<Input
				type="text"
				clearable
				bordered
				width='100%'
				//aria-label='name'
				data-testid='name'
				placeholder='Name'
				labelPlaceholder="Name"
				className='input-name'
				id="name"
				name='name'
				value={formData.name}
				onChange={(ev) => onChangeForm(ev)}
			//value={(auth.name !== null) ? auth.name : ''}
			/>
			<Spacer y={2.5} />
			<Input
				type="text"
				clearable
				bordered
				width='100%'
				labelPlaceholder="Email"
				className='input-email'
				//aria-label='email'
				data-testid='email'
				id="email"
				initialValue="email"
				name='email'
				value={formData.email}
				onChange={(ev) => onChangeForm(ev)}
			/>
			<Spacer y={2.5} />

			<Button color="warning" data-testid='btn-update' className='btn-updateUser' onPress={onUpdateUser}>
				Update account
			</Button>


		</div>
	);
};
