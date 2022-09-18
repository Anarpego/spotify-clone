import { Fragment, Suspense, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
	// BrowserRouter as Router,
	Routes,
	Route,
	NavLink
} from 'react-router-dom';
import { Avatar, Button, Spacer } from '@nextui-org/react';
import { routes } from '../../routes/routes';

const defaultGravatar = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

export const Sidebar = () => {

	const { logout, auth } = useContext(AuthContext);
	// console.log(auth);
	return (
		<Suspense fallback={<span>Loading...</span>}>

			<>
				<Fragment>
					<div className="animate__animated animate__fadeIn wrapper">

						<nav id="sidebar" >
							<div className="sidebar-header" >


								<h3 style={{ marginRight: '100px' }}>
									<NavLink to="/home" style={{ color: '#ccc', padding: '20px' }}>SoundStream</NavLink>
								</h3>
								<Spacer y={1} />
								<Avatar
									src={(auth.gravatar !== '') ? auth.gravatar : defaultGravatar}
									className='center'
									css={{ size: '$20', border: 'none' }}
								/>
							</div>
							<ul className="list-unstyled components">


								{
									routes.map(({ name, path }, i) => (
										<li key={i}>
											<NavLink key={i} className={`opt-${name}`} to={path}>{name}</NavLink>
										</li>
									))

								}

							</ul>

							<div className="form-group d-grid gap-2 mt-1"
								style={{
									position: 'fixed',
									//width: '30%',
									bottom: '10px',
									marginLeft: '20px'
									//border: '3px solid #8AC007',
								}}>


								<Button
									color="error"
									size="sm"
									style={{ marginBottom: '20px' }}
									onPress={logout}
								>
									Logout
								</Button>

							</div>

						</nav>

						{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
						<Routes>
							{
								routes.map(({ path, component: Component }, i) => (
									<Route path={path} element={<Component />} key={i + 1} />
								))
							}

						</Routes>
					</div>
				</Fragment>

			</>
		</Suspense>

	);
};