import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";

/**
 * GET /api/users/me
 * Returns the full profile of the authenticated user
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        googleId: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          ...user,
          hasPassword: !!(await prisma.user.findUnique({
            where: { id: user.id },
            select: { passwordHash: true },
          }))?.passwordHash,
          isGoogleUser: !!user.googleId,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
