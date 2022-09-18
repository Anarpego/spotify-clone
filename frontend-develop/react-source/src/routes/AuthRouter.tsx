import { Navbar } from '../components/ui/Navbar';
import { Routes, Route } from 'react-router-dom';
import { RegisterPage, LoginPage, PricingPage, LandingPage, RecoverPage } from '../pages/auth/';

export const AuthRouter = () => {

	return (
		<>
			<Navbar />
			<Routes>
				{/* en AppRouter tenemos /* que va manejar las rutas anidadas */}
				<Route path="/welcome" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/pricing" element={<PricingPage />} />
				<Route path="/recover" element={<RecoverPage />} />
				<Route path="*" element={<h1>La página no existe</h1>} />
			</Routes>


		</>

	);
};
