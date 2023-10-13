import jwt, { decode } from 'jsonwebtoken';

export default function (role) {
	return function (req, res, next) {
		const { verify } =  jwt;
		if (req.method === "OPTIONS") {
			next();
		}
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				res.status(401).json({ message: 'Не авторизован' })
			}
			const decoded = decode(token);
			if (decoded.role !== role) {
				return res.status(403).json({ message: decoded })
			}
			req.user = decoded;
			next();
		} catch (e) {
			res.status(401).json({ message: 'aaa'});
		}
	}
}