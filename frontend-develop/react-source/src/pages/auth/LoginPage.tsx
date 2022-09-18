import { useContext } from 'react';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';


export const LoginPage = () => {

	const { login } = useContext(AuthContext);
	/**
	 * Test user
	 * juan@gmail.com
	 * juan123
	 */
	const { formData, onChangeForm, isNotEmpty } = useForm({
		email: '',
		password: ''
	});

	const { email, password } = formData;


	const submitLogin = async (ev: any) => {
		//ev.preventDefault();

		// backend...
		login(formData.email, formData.password);

	};

	// const validateEmail = (): boolean => {

	// 	return hasEmailFormat(email);
	// };

	const allOk = (): boolean => {

		return (isNotEmpty(email) && isNotEmpty(password)) ? true : false;

	};

	return (
		<>
			<Spacer y={5.0} />

			<form
				className='animate__animated animate__fadeInDown center'
				//onSubmit={submitLogin}
				style={{ width: '70vh', border: 'none' }}>

				<Card style={{padding: '20px'}}>
					<h2>Sign in </h2>

					<Spacer y={2.5} />

					<Input
						bordered
						clearable label="Email"
						placeholder="Email"
						id="email"
						data-testid='email'
						name='email'
						value={email}
						onChange={(ev) => onChangeForm(ev)}
						width='100%'
					/>
					<Spacer y={1} />

					<Input.Password
						bordered
						clearable label="Password"
						placeholder="Password"
						data-testid='password'
						id="password"
						name='password'
						value={password}
						onChange={(ev) => onChangeForm(ev)}
						width='100%'
					/>

					<Spacer y={1.5} />

					<Button
						id="loginBtn"
						color="success"
						style={{ width: '100%' }}
						data-testid='btn-login'
						className='btn'
						onPress={submitLogin}
						disabled={!allOk()}
					>
						Login
					</Button>
					<Spacer y={1} />
					<NavLink to="/app/recover">I forgot my password</NavLink>
					<Spacer y={1} />
					<NavLink to="/app/register">Create an account</NavLink>

				</Card>

			</form>
		</>

	);
};
