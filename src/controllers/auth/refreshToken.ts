import prisma from "../../config/prismaInstance.js";
import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const checkRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const currentTime = new Date(Date.now());

  if (!refreshToken) {
    return res.status(403).json({ message: "no valid refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as JwtPayload;

    const session = await prisma.session.findUnique({
      where: {
        sessionId: decoded.sessionId,
        refreshToken: refreshToken,
      },
    });

    if (!session || session.revoked || session.expiresAt < currentTime) {
      return res.status(403).json({ message: "no valid refresh token" });
    }

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "accesstoken created",
      });
  } catch (error) {
    return res.status(403).json({
      message: "invalid refresh token",
    });
  }
};
