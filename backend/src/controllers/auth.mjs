import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

class AuthController {
	static async signup(req, res) {
		const { name, pass, email, role } = req.body;
		if (!name || !pass || !email) return res.status(404).json({ success: false, message: "Not enough credentials provided" })
		const givenRole = role || "customer"
		const hashedPass = await bcrypt.hash(pass, 10);
		const prismaUser = await prisma.User.create({
			data: {
				name, email, pass: hashedPass, role: givenRole
			}
		})
		return res.status(201).json({
			success: true,
			data: prismaUser
		});
	}

	static async signin(req, res)  {
		const { email, pass } = req.body;
		if (!pass || !email) return res.status(404).json({ success: false, message: "Not enough credentials provided" });
		const prismaUser = await prisma.User.findFirst({
			where: {
				email
			}
		});
		if (!prismaUser) return res.status(404).json({ success: false, message: "No User found" });
		const passwordMatch = await bcrypt.compare(pass, prismaUser.pass);
		if (!passwordMatch) return res.status(400).json({ success: false, message: "Invalid Credentials" });
		const token = jwt.sign({ id: prismaUser.id, role: prismaUser.role }, process.env.JWT_SECRET);
		return res.status(200).json({
			success: true,
			token: token
		});
	}
}


export default AuthController;