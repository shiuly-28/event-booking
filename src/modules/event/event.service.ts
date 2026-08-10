import prisma from "../lib/prisma";
import ApiError from "../../utils/ApiError";
import { ICreateEventInput, IUpdateEventInput } from "./event.interface";

const createEvent = async (payload: ICreateEventInput) => {
  return prisma.event.create({
    data: {
      title: payload.title,
      description: payload.description,
      location: payload.location,
      price: payload.price ?? 0,
      startsAt: new Date(payload.startsAt),
      seats: payload.seats ?? 0,
      categoryId: payload.categoryId,
    },
  });
};

const getAllEvents = async () => {
  return prisma.event.findMany({
    where: { isDeleted: false },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

const getEventById = async (id: string) => {
  const event = await prisma.event.findFirst({
    where: { id, isDeleted: false },
    include: { category: true, reviews: true },
  });
  if (!event) throw new ApiError(404, "Event not found");
  return event;
};

const updateEvent = async (id: string, payload: IUpdateEventInput) => {
  await getEventById(id);
  return prisma.event.update({
    where: { id },
    data: {
      ...payload,
      startsAt: payload.startsAt ? new Date(payload.startsAt) : undefined,
    },
  });
};

const deleteEvent = async (id: string) => {
  await getEventById(id);
  return prisma.event.update({ where: { id }, data: { isDeleted: true } });
};

export default { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };