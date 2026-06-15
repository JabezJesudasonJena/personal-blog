import jwt from "jsonwebtoken";

class Middleware {
	static async jwtMid(req, res, next) {
		let token;
		if (req.headers.authorization && req.headers.authorization('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		} else if (re.cookies && req.cookies.jwt) {
			token = req.cookies.jwt
		}
		if (!token) {
			return res.status(400).json({
				success: false,
				message: "Token not found"
			})
		}
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	}

	static async roleMid(req, res, next) {
		if (!req.user.role) {
			return res.status(404).json({
				success: false,
				message: "No user role defined"
			})
		}
		if (req.user.role != "admin") {
			return res.status(404).json({
				success: false,
				message: "The user is not admin"
			})
		}
		next();
	}
}

export default Middleware