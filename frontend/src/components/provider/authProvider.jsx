import React, { useEffect, useState } from "react";
import { AuthContext } from '../../context/index.js'

const AuthProvider = ({ children }) => {
	const [isUser, setIsUser] = useState(false);
	const login = (token, user) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('isUser', true);
		setIsUser(true);
	};
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('isUser');
		setIsUser(false);
	}
	const props = {isUser, login, logout}

	useEffect(() => {
		if (localStorage.getItem('isUser') === 'true') {
			setIsUser(true);
		}
	}, [])

	return (
		<AuthContext.Provider value={ props }>
			{children}
		</AuthContext.Provider>
	)
};

export default AuthProvider;