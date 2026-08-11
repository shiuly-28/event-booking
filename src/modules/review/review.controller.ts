import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ReviewService from "./review.service";
import prisma from "../../lib/prisma";

// 1. Create Review
const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const result = await ReviewService.createReview(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});
// 2. Get All Reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

// 3. Get Review By ID
const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ReviewService.getReviewById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

// 4. Update Review
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ReviewService.updateReview(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

// 5. Delete Review (Soft Delete)
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ReviewService.deleteReview(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};

export default ReviewController;