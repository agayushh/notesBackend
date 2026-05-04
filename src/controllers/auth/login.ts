import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "incorrect" }).status(400);
  }

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user || user.password !== password) {
    return res.status(409).json({ message: "User not found kindly register" });
  }

  res.status(200).json({
    message: "Success",
  });
};
