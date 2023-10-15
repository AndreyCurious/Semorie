import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import Basket from "./Basket";
import Admin from "./Admin.jsx";
import Login from "./Login";
import Shop from "./Shop";
import Signup from "./Sugnup";
import Device from "./Device";
import routes from "../routes";

const AppRoutes = () => {
	const auth = useAuth();
	return (
		<Routes>
			{auth.isUser ? 
				<>
					<Route key={routes.basket()} path={routes.basket()} element={<Basket />} />
					<Route key={routes.admin()} path={routes.admin()} element={<Admin />} />
				</>
			: 
				<>
					<Route path={routes.login()} element={<Login />} />
					<Route path={routes.signup()} element={<Signup />} />
				</> 
			}
			<Route path={routes.device()} element={<Device />} />
			<Route path={routes.shop()} element={<Shop />} />
			<Route path="*" element={<Navigate to="/" />} exact />
		</Routes>
	)
}

export default AppRoutes;