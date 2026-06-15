import prisma from "../db/prisma.js";


class ArticleController{
	static async addArticle(req, res) {
		const { title, content } = req.body;
		const prismaContent = await prisma.Article.create({
			data: {
				title, content, authorId: req.user.id
			}
		});
		return res.status(201).json({
			success: true,
			data: prismaContent
		});
	};
	
	static async getAllArticles(req, res) {
		const prismaArticles = await prisma.Article.findAll({});
		return res.status(200).json({
			success: true,
			data: prismaArticles
		})
	};

	static async getSingleArticle(req, res) {
		const prismaArticle = await prisma.Article.findFirst({
			where: {
				id: Number(req.params.id) || req.body.id
			}
		});
		return res.status(200).json({
			success: true,
			data: prismaArticle
		})
	};

	static async getArticlesByUserId(req, res) {
		const prismaArticles = await prisma.Article.findMany({
			where: {
				authorId: req.user.id
			}
		});
		return res.status(200).json({
			success: true,
			data: prismaArticles
		})
	};

	static async editArticle(req, res) {
		const { articleId } = req.params.id;
		const updatedArticle = await prisma.Article.update({
			where: { id: articleId },
			data: req.body
		});
		return res.status(201).json({
			success: true,
			data: updatedArticle
		});
	}
}

export default ArticleController;