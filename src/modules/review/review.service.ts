import prisma from "../../lib/prisma";
import ApiError from "../../utils/ApiError";
import { ICreateReviewInput, IUpdateReviewInput } from "./review.interface";

const createReview = async (userId: string, payload: ICreateReviewInput) => {
  return prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      eventId: payload.eventId,
      userId,
    },
  });
};

const getAllReviews = async () => {
  return prisma.review.findMany({
    where: { isDeleted: false },
    include: { user: { select: { id: true, name: true } }, event: { select: { id: true, title: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getReviewById = async (id: string) => {
  const review = await prisma.review.findFirst({ where: { id, isDeleted: false } });
  if (!review) throw new ApiError(404, "Review not found");
  return review;
};

const updateReview = async (id: string, payload: IUpdateReviewInput) => {
  await getReviewById(id);
  return prisma.review.update({ where: { id }, data: payload });
};

const deleteReview = async (id: string) => {
  await getReviewById(id);
  return prisma.review.update({ where: { id }, data: { isDeleted: true } });
};

export default { createReview, getAllReviews, getReviewById, updateReview, deleteReview };