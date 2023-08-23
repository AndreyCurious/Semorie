import React from "react";
import Navbar from "./UI/navbar/navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
	Outlet,
	Navigate
} from 'react-router-dom';
import { useAuth } from '../hooks/index.js'
import routes from '../routes.js';
import Basket from "./Basket";
import Login from "./Login";
import Shop from "./Shop";
import Signup from "./Sugnup";
import AuthProvider from "./provider/authProvider.jsx";

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.login()} />;
};

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="d-flex flex-column bg-light vh-100">
					<Navbar />
					<Routes>
						<Route path={routes.login()} element={<Login />} />
						<Route path={routes.signup()} element={<Signup />} />
						<Route path={routes.shop()} element={<Shop />} />
						<Route path={routes.basket()} element={<PrivateOutlet />}>
            	<Route path="" element={<Basket />} />
          	</Route>
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	)
};

export default App;