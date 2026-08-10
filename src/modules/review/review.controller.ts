import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ReviewService from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.user!.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Review created successfully", data: result });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews();
  sendResponse(res, { statusCode: 200, success: true, message: "Reviews retrieved successfully", data: result });
});

const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviewById(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Review retrieved successfully", data: result });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.updateReview(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Review updated successfully", data: result });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.deleteReview(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Review deleted successfully", data: result });
});

export default { createReview, getAllReviews, getReviewById, updateReview, deleteReview };