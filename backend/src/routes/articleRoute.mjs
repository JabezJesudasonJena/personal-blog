import { Router } from "express";
import ArticleController from "../controllers/article.mjs";
import Middleware from "../middlewares/jwtmid.mjs";

const articleRouter = Router();

articleRouter.post("/", Middleware.jwtMid, ArticleController.addArticle);
articleRouter.get("/", ArticleController.getAllArticles);
articleRouter.put("/", Middleware.jwtMid, Middleware.roleMid,ArticleController.editArticle);
articleRouter.get("/user", Middleware.jwtMid, ArticleController.getArticlesByUserId);

articleRouter.get("/:id", ArticleController.getSingleArticle);

export default articleRouter;