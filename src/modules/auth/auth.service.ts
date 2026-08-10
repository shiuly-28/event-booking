import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import AppError from "../../errors/AppError";

// 1. User Registration Logic
const registerUser = async (payload: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new AppError(400, "User with this email already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

// 2. User Login Logic
const loginUser = async (payload: { email: string; password: string }) => {
  // ক) ইমেইল দিয়ে ডাটাবেজে ইউজার খোঁজা
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  // ইউজার না থাকলে এরর পাঠানো
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  // খ) পাসওয়ার্ড মিলছে কিনা পরীক্ষা করা
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(400, "Password does not match!");
  }

  // গ) পাসওয়ার্ড বাদে ইউজারের তথ্য রিটার্ন করা
  const { password, ...userData } = user;
  return userData;
};

export const AuthService = {
  registerUser,
  loginUser,
};