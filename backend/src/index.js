import express from "express";
import cors from "cors";
import prisma from "./db/prisma.js";
import dotenv from "dotenv"
import router from "./routes/route.mjs"

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors())
app.use(express.json())
app.use("/api", router);

app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		data: "Blog app is running"
	})
})

app.get("/health", (req, res) => {	
	return res.status(200).json({
		success: true,
		data: "Health is Good !"
	})
});

app.listen(port, () => {
	console.log("Hello World !");
})