import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client";
import { envVars } from "../../config/env";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const { email, password, ...rest } = payload;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new Error("User Already Exist");
  }

    const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const createdUser = await prisma.user.create({
   data: {
      email,
      password: hashedPassword,
      ...rest,
    },
  });
  return createdUser;
};

const getAllFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      status: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
  });
  return result;
};

const updateUser = async (id: number, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  createUser,
  getAllFromDB,
  getUserById,
  updateUser,
  deleteUser,
};
