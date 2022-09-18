
import { Text, Spacer, useTheme, Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {

	const { theme } = useTheme();

	return (
		<div style={{
			display: 'flex',
			width: '100%',
			height: '125px',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'start',
			padding: '25px',
			//padding: '0px 20px',
			backgroundColor: theme?.colors.blue300.value
		}}>


			<ul className="list-unstyled components">


				<Text size={25} style={{ display: 'inline' }}>
					<NavLink to='/app/pricing' style={{ color: 'white' }}>Premium </NavLink>
				</Text>

				<Text size={25} style={{ display: 'inline' }}>
					|
				</Text>

				<Text size={25} style={{ display: 'inline' }}>
					<NavLink to="/app/login" style={{ color: 'white' }}>Login </NavLink>
				</Text>


				<Text size={25} style={{ display: 'inline' }} >
					<NavLink to='/app/register' style={{ color: 'white' }} >Register </NavLink>
				</Text>

			</ul>


			<Spacer css={{
				flex: 1
			}} />

			<h3 style={{ marginRight: '100px' }}>
				<NavLink to="/app/welcome" style={{ color: '#ccc' }}>SoundStream</NavLink>
			</h3>

			{/* <NextLink href="/favorites" passHref>
				<Link css={{ marginRight: '10px' }}>
					<Text color='white'>
						Favoritos
					</Text>
				</Link>
			</NextLink> */}

		</div>
	);
};