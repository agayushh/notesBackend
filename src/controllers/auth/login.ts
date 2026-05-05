import { type Request, type Response } from "express";
import prisma from "../../config/prismaInstance.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "incorrect" }).status(400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const correctPassword = await bcrypt.compare(password, user?.password!);

  if (!user || !correctPassword) {
    return res.status(409).json({ message: "User not found kindly register" });
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  const { password: _, ...safeUser } = user;

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .status(201)
    .json({
      message: "User created successfully",
      user: safeUser,
    });
};
