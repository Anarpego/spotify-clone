import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { useCard } from '../../hooks/useCard';

export const CardPage = () => {

	const { card, isLoadingCard } = useCard();
	const { updateCard } = useContext(AuthContext);
	const { auth } = useContext(AuthContext);
	const number_ = '';
	const cvv_ = '';
	const exp_date_ = '';
	const balance_ = 0;




	const {
		formData,
		onChangeForm,
		isNotEmpty
	} = useForm({
		number: number_,
		cvv: cvv_,
		exp_date: exp_date_,
		balance: balance_
	});

	const {
		number,
		cvv,
		exp_date, balance } = formData;



	const allOk = (): boolean => {

		return (formData.number.charAt(0) != '*' && isNotEmpty(number) && isNotEmpty(cvv) && isNotEmpty(exp_date) && isNotEmpty(balance.toString())) ? true : false;

	};



	const onCreateCard = async (ev: any) => {
		ev.preventDefault();


		//console.log(formData);
		//console.log('create card');
		const id = auth.uid;

		//console.log(`usuairo logeado: ${id}`);
		await updateCard(number, cvv, exp_date, balance);




	};


	useEffect(() => {

		//console.log('loading card....');
		//console.log(radioSongs);
		//console.log(card.exp_date);
		if (!isLoadingCard) {
			//console.log(card);



			if (card.exp_date == '2001-01-01T06:00:00.000Z' && card.balance == 0) {
				formData.number = '';
				formData.cvv = '';
				formData.exp_date = '';
				formData.balance = 0;
			} else {

				formData.number = `************ ${card.last_number}`;
				formData.cvv = '';
				formData.exp_date = card.exp_date.split('T')[0];
				formData.balance = card.balance;
			}


		}

	}, [isLoadingCard]);


	return (

		<>

			<div className='animate__animated animate__fadeIn float-container'
				style={{ width: '100%', padding: '50px' }}>
				<h1>Card</h1>
				<hr />
				<Spacer y={1} />

				<div className='animate__animated animate__fadeInDown  center mt-5' style={{ width: '70vh', border: 'none' }}>

					<h2>Update Card</h2>

					<Spacer y={2.5} />

					<form>

						<Card style={{padding: '20px'}}>

							<Input
								bordered
								clearable label="Number"
								placeholder="Number"
								initialValue="NextUI"
								name='number'
								value={number}
								onChange={onChangeForm}
								className="form-control"
								width='100%'
							/>

							<Spacer y={1} />
							<Input
								bordered
								clearable label="CVV"
								placeholder="CVV"
								initialValue="NextUI"
								name='cvv'
								value={cvv}
								onChange={onChangeForm}
								className={'form-control'}
								width='100%'
							/>
							<Spacer y={1} />
							<Input
								bordered
								type="date"
								clearable label="Expiration Date"
								placeholder="Expiration Date"
								initialValue="NextUI"
								name='exp_date'
								value={exp_date}
								onChange={onChangeForm}
								className={'form-control'}
								width='100%'
							/>

							<Spacer y={1} />
							<Input
								bordered
								clearable label="Balance"
								placeholder="Balance"
								initialValue="NextUI"
								name='balance'
								value={balance}
								onChange={onChangeForm}
								className={'form-control'}
								width='100%'
							/>

							<Spacer y={1} />

							<Button
								color="success"
								style={{ width: '100%' }}
								onClick={onCreateCard}
								disabled={!allOk()}

							>
								Save
							</Button>

						</Card>

					</form>
				</div>

			</div>


		</>
	);
};

