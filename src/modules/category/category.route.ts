import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import CategoryController from "./category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", auth("ADMIN"), CategoryController.createCategory);
router.patch("/:id", auth("ADMIN"), CategoryController.updateCategory);
router.delete("/:id", auth("ADMIN"), CategoryController.deleteCategory);

export default router;