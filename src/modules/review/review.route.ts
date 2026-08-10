import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import ReviewController from "./review.controller";

const router = Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.post("/", auth(), ReviewController.createReview);       // logged-in user
router.patch("/:id", auth(), ReviewController.updateReview);
router.delete("/:id", auth(), ReviewController.deleteReview);

export default router;