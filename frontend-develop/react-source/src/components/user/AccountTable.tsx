import { Table } from '@nextui-org/react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserAuth } from '../../interfaces/userauth';

interface Props {
	userAuth: UserAuth;
}

export const AccountTable = ({ userAuth }: Props) => {

	const { auth } = useContext(AuthContext);
	return (
		<Table
			aria-label='Example table with static content'
			css={{
				height: 'auto',
				minWidth: '100%',
			}}
		>
			<Table.Header>
				<Table.Column> </Table.Column>
				<Table.Column> </Table.Column>
			</Table.Header>
			<Table.Body>
				<Table.Row key='1'>
					<Table.Cell css={{ fontWeight: 'bold' }}>Name</Table.Cell>
					<Table.Cell>{auth.name}</Table.Cell>
				</Table.Row>
				<Table.Row key='2'>
					<Table.Cell css={{ fontWeight: 'bold' }}>Email</Table.Cell>
					<Table.Cell>{auth.email}</Table.Cell>
				</Table.Row>
				<Table.Row key='3'>
					<Table.Cell css={{ fontWeight: 'bold' }}>Account</Table.Cell>
					<Table.Cell>
						{
							(auth.isSubscribed) ? 'Premium' : 'Free'
						}
					</Table.Cell>
				</Table.Row>
			</Table.Body>

		</Table>
	);
};
