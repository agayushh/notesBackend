import prisma from "../../config/prismaInstance.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "need to enter all credentials" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res
      .status(400)
      .json({ message: "you already have an account kindly login" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashpassword,
    },
  });
  const accessToken = jwt.sign(
    {
      userId: createdUser.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      userId: createdUser.id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );
  await prisma.user.update({
    where: { id: createdUser.id },
    data: { refreshToken },
  });
  const { password: _, ...safeUser } = createdUser;

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
