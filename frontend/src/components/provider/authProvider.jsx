import React, { useState } from "react";
import { AuthContext } from '../../context/index.js'

const AuthProvider = ({ children }) => {
	const [isUser, setIsUser] = useState(false);
	const login = (token) => {
		localStorage.setItem('token', token);
		setIsUser(true);
	};
	const logout = () => {
		localStorage.removeItem('token');
		setIsUser(false);
	}
	const props = {isUser, login, logout}

	return (
		<AuthContext.Provider value={ props }>
			{children}
		</AuthContext.Provider>
	)
};

export default AuthProvider;