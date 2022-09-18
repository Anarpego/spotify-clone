import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes/AppRouter';
import { darkTheme } from './theme/darktheme';

export const App = () => {
	return (
		<>
			<NextUIProvider theme={darkTheme}>
				<AuthProvider>
					<AppRouter />
				</AuthProvider>
			</NextUIProvider>
		</>
	);
};
