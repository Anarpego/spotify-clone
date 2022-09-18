import { Card, Text, Row, Button, Divider } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

interface Props {
	planName: string;
	value: number;
	features: string[];
}

export const PricingCard = ({ planName, value, features }: Props) => {
	return (
		<Card css={{ mw: '330px' }}>
			<Card.Header style={{ textAlign: 'center' }}>
				<Text h3 >{planName}</Text>

			</Card.Header>
			<Card.Header>
				<Text>${value} / month</Text>
			</Card.Header>

			<Divider />
			{/* <Card.Div /> */}
			<Card.Body css={{ py: '$10' }}>

				<ul>
					{
						features.map((item, i) => (
							<li key={i + 1}> ✓ {item}</li>
						))
					}
				</ul>


			</Card.Body>
			{/* <Card.Divider /> */}
			<Card.Footer>
				<Row justify='flex-end'>

					<Button size='sm' color="success" className='center'>
						<NavLink to="/app/login" style={{ color: 'white' }}>Get started</NavLink>
					</Button>
				</Row>

			</Card.Footer>
			<Card.Footer>
				<small>
					Terms and conditions apply. 1 month free not available for users who have already tried Premium.
				</small>

			</Card.Footer>
		</Card>
	);
};
