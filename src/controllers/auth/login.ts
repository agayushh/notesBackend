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

  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 7 * 60 * 60 * 24 * 1000),
    },
  });

  const accessToken = jwt.sign(
    {
      userId: user.id,
      sessionId: newSession?.sessionId,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      userId: user.id,
      session: newSession?.sessionId,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );
  await prisma.session.update({
    where: { sessionId: newSession.sessionId },
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
