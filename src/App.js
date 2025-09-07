import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './components/Context/AuthContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
	const {token} = useContext(AuthContext);
	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					{token &&
						<HomePage />
					}
				</Route>
				<Route path='/auth'>
					{!token &&
						<AuthPage />
					}
				</Route>
				<Route path='/profile'>
					{token &&
						<UserProfile />
					}
				</Route>
				<Route path='*'>
					<Redirect to="/" />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
