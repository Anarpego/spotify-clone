import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { Button, Input, Spacer } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { Card } from '@nextui-org/react';


export const RegisterPage = () => {


	const { register } = useContext(AuthContext);


	const card = {
		number: '0000000000000000',
		last_number: '0000',
		cvv: '0',
		exp_date: '0001-01-01',
		balance: 0
	};

	const {
		formData,
		onChangeForm,
		isNotEmpty } = useForm({
			nombreUsuario: '',
			usuario: '',
			claveUsuario: '',
			confirmarclaveUsuario: '',
			file: '',
			card: card
		});


	const {
		nombreUsuario,
		usuario,
		claveUsuario,
		confirmarclaveUsuario, file } = formData;

	const allOk = (): boolean => {

		return (isNotEmpty(nombreUsuario) && isNotEmpty(usuario) && isNotEmpty(claveUsuario) && isNotEmpty(confirmarclaveUsuario)) ? true : false;

	};

	const confirmPasswords = (): boolean => {

		if ((claveUsuario === confirmarclaveUsuario) && isNotEmpty(claveUsuario) && isNotEmpty(confirmarclaveUsuario)) {

			return true;
		}

		return false;

	};

	const onRegisterNewUser = async (ev: any) => {
		//ev.preventDefault();

		try {
			if (confirmPasswords()) {
				console.log(formData);
				register(nombreUsuario, usuario, claveUsuario, file, card);
	
	
	
			} else {
				Swal.fire('Error', 'the password doesnt match', 'error');
	
			}
		} catch (error) {
			console.log(error);
		}




	};


	return (

		<>

			<Spacer y={2.0} />
			<div className='animate__animated animate__fadeInDown  center mt-5'
				style={{ width: '70vh', border: 'none' }}>

				<Spacer y={2.5} />
				<Card style={{padding: '20px'}}>
					<h2>Register</h2>
					<Spacer y={2.5} />
					<form >

						<Input
							bordered
							clearable label="Name"
							id="name"
							placeholder="Name"
							initialValue="NextUI"
							data-testid="name"
							name='nombreUsuario'
							value={nombreUsuario}
							onChange={onChangeForm}
							className="form-control"
							width='100%'
						/>

						<Spacer y={1} />


						<Input
							bordered
							clearable label="Email"
							id="email"
							placeholder="Email"
							data-testid="email"
							initialValue="NextUI"
							name='usuario'
							value={usuario}
							onChange={onChangeForm}
							className="form-control"
							width='100%'
						/>

						<Spacer y={1} />

						<Input
							bordered
							type="password"
							clearable label="Password"
							id="password"
							placeholder="Password"
							data-testid="password"
							initialValue="NextUI"
							name='claveUsuario'
							value={claveUsuario}
							onChange={onChangeForm}
							className={`form-control ${confirmPasswords() ? 'is-valid' : 'is-invalid'} `}
							width='100%'
						/>

						<Spacer y={1} />
						<Input
							bordered
							type="password"
							clearable label="Password"
							id="password2"
							placeholder="Password"
							data-testid="password2"
							initialValue="NextUI"
							name='confirmarclaveUsuario'
							value={confirmarclaveUsuario}
							onChange={onChangeForm}
							className={`form-control ${confirmPasswords() ? 'is-valid' : 'is-invalid'} `}
							width='100%'
						/>

						<Spacer y={1} />
						<div className="valid-feedback">{confirmPasswords() ? 'Passwords match!' : 'Passwords must be equal.'}</div>
						{/* <div className="invalid-feedback">Passwords must be equal.</div> */}

						<Spacer y={1} />


						<Button
							id="registerBtn"
							color="success"
							style={{ width: '100%' }}
							data-testid="btn-register"
							onClick={onRegisterNewUser}
							disabled={!allOk()}

						>
							Create Account
						</Button>
						{/*<button className='btn btn-success' disabled={!allOk()}>Create Account</button>*/}

						<Spacer y={1} />
						<div className="form-group mt-3">
							<NavLink to="/auth/login" className="nav-login">Already registered? Login here</NavLink>
						</div>
					</form>
				</Card>

			</div>

		</>
	);
};
