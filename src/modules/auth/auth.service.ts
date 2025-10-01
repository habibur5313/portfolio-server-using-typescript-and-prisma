import  bcryptjs  from 'bcryptjs';
import { prisma } from "../../config/db"
import { Prisma, User } from "@prisma/client"


const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // verify password
  const isPasswordValid = await bcryptjs.compare(password, user.password as string);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // check role
  if (user.role !== "ADMIN") {
    throw new Error("This user not an admin only admin can logged in");
  }

  // omit password
  const { password: _, ...safeUser } = user;
  return safeUser;
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data
        })
    }

    return user;
}

export const AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle
}