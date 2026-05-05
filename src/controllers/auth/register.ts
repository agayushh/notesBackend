import prisma from "../../config/prismaInstance.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "need to enter all credentials" });
  }

  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });

  const hashpassword = await bcrypt.hash(password, 10)

  if (!user) {
     const createdUser = await prisma.user.create({
       data: {
         email,
         password: hashpassword
      }, 
    });
  }
  else{
    return res.status(400).json({message: "you already have an account kindly login"})
  }
};
