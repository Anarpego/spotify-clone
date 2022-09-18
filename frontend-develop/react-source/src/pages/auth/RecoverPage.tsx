import { useContext } from 'react';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';
import { recoverPassword } from '../../helpers/fetch';
import Swal from 'sweetalert2';

export const RecoverPage = () => {



    const { formData, onChangeForm, isNotEmpty } = useForm({
        email: '',
        code: '',
        password: ''
    });

    const { email, code, password } = formData;


    const sendCode = async (ev: any) => {
        ev.preventDefault();

        console.log('sendCode');
        console.log(formData.email);

        const resp = await recoverPassword('recuperar', { 'email': formData.email });


        console.log(resp);


        if (resp.status == 200) {
            Swal.fire('Success!', 'Tu codigo ha sido enviado', 'success');
        } else {
            Swal.fire('Incorrect ', 'No se encontró usuario', 'error');
        }


    };

    const changePassword = async (ev: any) => {
        ev.preventDefault();

        // backend...

        console.log('verify');
        console.log(formData.code);

        const resp = await recoverPassword('recuperar',
            {
                email: formData.email,
                password: formData.password,
                code: formData.code
            });


        console.log(resp);


        if (resp.status == 200) {
            Swal.fire('Success!', 'Contraseña modificada correctamente', 'success');
        } else {
            Swal.fire('Incorrect ', 'Ha ocurrido un error', 'error');
        }




    };


    // const validateEmail = (): boolean => {

    // 	return hasEmailFormat(email);
    // };

    const emailOk = (): boolean => {

        return (isNotEmpty(email)) ? true : false;

    };


    const codeOk = (): boolean => {

        return (isNotEmpty(code) && isNotEmpty(password) && isNotEmpty(email)) ? true : false;

    };
    return (
        <>
            <Spacer y={2.0} />

            <form
                className='animate__animated animate__fadeInDown center'
                //onSubmit={submitLogin}
                style={{ width: '70vh', border: 'none' }}>

                <Card style={{padding: '20px'}}>
                    <h2>Recover Password </h2>

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

                    <Button
                        color="success"
                        data-testid='btn-sendcode'
                        style={{ width: '100%' }}
                        onClick={sendCode}
                        disabled={!emailOk()}
                    >
                        Send Code
                    </Button>

                    <Spacer y={1} />

                    <Input
                        bordered
                        clearable label="code"
                        placeholder="code"
                        name='code'
                        value={code}
                        onChange={(ev) => onChangeForm(ev)}
                        width='100%'
                    />

                    <Spacer y={1} />

                    <Input.Password
                        bordered
                        clearable label="New Password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        onChange={(ev) => onChangeForm(ev)}
                        width='100%'
                    />

                    <Spacer y={1.5} />

                    <Button
                        color="success"
                        style={{ width: '100%' }}
                        onClick={changePassword}
                        disabled={!codeOk()}
                    >
                        Change Password
                    </Button>



                </Card>

            </form>
        </>

    );
};
