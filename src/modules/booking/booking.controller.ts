import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BookingService from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await BookingService.createBooking(user?.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await BookingService.getBookingById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await BookingService.updateBooking(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await BookingService.deleteBooking(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

export default {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};