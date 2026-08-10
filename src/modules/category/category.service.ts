import prisma from "../../lib/prisma";
import ApiError from "../../utils/ApiError";
import { ICreateCategoryInput, IUpdateCategoryInput } from "./category.interface";

const createCategory = async (payload: ICreateCategoryInput) => {
  const existing = await prisma.category.findUnique({ where: { name: payload.name } });
  if (existing) throw new ApiError(409, "Category already exists");
  return prisma.category.create({ data: payload });
};

const getAllCategories = async () => {
  return prisma.category.findMany({ where: { isDeleted: false }, orderBy: { createdAt: "desc" } });
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findFirst({ where: { id, isDeleted: false } });
  if (!category) throw new ApiError(404, "Category not found");
  return category;
};

const updateCategory = async (id: string, payload: IUpdateCategoryInput) => {
  await getCategoryById(id);
  return prisma.category.update({ where: { id }, data: payload });
};

const deleteCategory = async (id: string) => {
  await getCategoryById(id);
  return prisma.category.update({ where: { id }, data: { isDeleted: true } });
};

export default { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };