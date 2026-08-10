import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import EventService from "./event.service";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.createEvent(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Events retrieved successfully",
    data: result,
  });
});

const getEventById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await EventService.getEventById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event retrieved successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await EventService.updateEvent(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await EventService.deleteEvent(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

export default {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};