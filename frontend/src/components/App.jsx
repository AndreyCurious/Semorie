import React from "react";
import Navbar from "./UI/navbar/navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter
} from 'react-router-dom';
import AuthProvider from "./provider/authProvider.jsx";
import AppRoutes from "./appRoutes.jsx";
import MyModal from "./UI/modals.jsx";


const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="d-flex flex-column bg-light vh-100">
					<MyModal />
					<Navbar />
					<AppRoutes />
				</div>
			</BrowserRouter>
		</AuthProvider>
	)
};

export default App;