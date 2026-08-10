import prisma from "../../lib/prisma";
import ApiError from "../../utils/ApiError";
import { ICreateBookingInput, IUpdateBookingInput } from "./booking.interface";

const createBooking = async (userId: string, payload: ICreateBookingInput) => {
  return prisma.booking.create({
    data: {
      userId,
      eventId: payload.eventId,
      seats: payload.seats ?? 1,
    },
  });
};

const getAllBookings = async () => {
  return prisma.booking.findMany({
    where: { isDeleted: false },
    include: { user: { select: { id: true, name: true } }, event: { select: { id: true, title: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new ApiError(404, "Booking not found");
  return booking;
};

const updateBooking = async (id: string, payload: IUpdateBookingInput) => {
  await getBookingById(id);
  return prisma.booking.update({ where: { id }, data: payload });
};

const deleteBooking = async (id: string) => {
  await getBookingById(id);
  return prisma.booking.update({ where: { id }, data: { isDeleted: true } });
};

export default { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };