/* eslint-disable */
export default {
	shop: () => '/',
	login: () => '/login',
	signup: () => '/signup',
	admin: () => '/admin',
	basket: () => '/basket',
	axiosLogin: () => 'api/user/login',
	axiosSignup: () => 'api/user/registration',
	axiosCheck: () => 'api/user/auth',
	axiosTypes: () => 'api/type',
	axiosGroups: () => 'api/brand',
	axiosJewellery: () => 'api/device',
	axiosGetDevice: (id) => `api/device/${id}`,
	server: () => 'http://localhost:5000/',
	device: (id) => `api/device/:${id}`,
	
}