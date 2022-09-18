import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoute } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { AuthRouter } from './AuthRouter';
import { UserRouter } from './UserRouter';
import { AuthContext } from '../context/AuthContext';

export const AppRouter = () => {

	const { auth, verifyToken } = useContext(AuthContext);


	useEffect(() => {

		verifyToken();

	}, [verifyToken]);


	return (
		<Router>
			<Routes>
				<Route path="/*" element={
					<PublicRoute isAuthenticated={auth.logged}>
						<UserRouter />
					</PublicRoute>
				} />

				{/* el asterisco le dice a react que las rutas son anidadas y el elemento debe responder a la ruta que comienza con /auth/ */}
				<Route path="/app/*" element={
					<PrivateRouter isAuthenticated={auth.logged}>
						<AuthRouter />
					</PrivateRouter>
				} />

				<Route path="*" element={<h1>-</h1>} />
				{/* <Route path="*" element={<Navigate to={<HomePage />} />} /> */}

			</Routes>
		</Router>
	);
};
