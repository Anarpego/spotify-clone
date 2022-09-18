import React from 'react';
import { Text, Spacer, Button } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

export const LandingPage = () => {
	return (
		<div
			className='animate__animated animate__fadeInDown'
			style={{
				textAlign: 'center'
			}}>
			<>
				{/* <Text
					h1
					size={60}
					css={{
						textGradient: '45deg, $blue600 -20%, $pink600 50%',
					}}
					weight='bold'
				>
					Let&apos;s
				</Text> */}

				<Spacer y={8} />
				<Text
					h1
					size={120}
					css={{
						textGradient: '45deg, $yellow600 -20%, $pink600 100%',
					}}
					weight='bold'
				>
					Listening is
				</Text>
				<Text
					h1
					size={120}
					css={{
						textGradient: '45deg, $green600 -20%, $blue600 100%',
					}}
					weight='bold'
				>
					everything
				</Text>
				
				<Spacer y={1} />

				<Text size={16}>
					Listen to millions of songs. No credit card required.
				</Text>

				<Spacer y={2} />

				<Button className='center' color="primary">
					
					<NavLink to="/app/register" style={{color: 'white'}}>Get an account</NavLink>
				</Button>
				
				
			</>

		</div>
	);
};
