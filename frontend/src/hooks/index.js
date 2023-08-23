import { useContext } from "react";
import { AuthContext } from "../context/index.js";
/* eslint-disable */
const useAuth = () => {
	const api = useContext(AuthContext);
	return api;
}

export { useAuth };
