import { Request, Response, NextFunction } from "express";
import { tokenService } from "../services/token.service";
import { prisma } from "../config/database";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      username: string;
      avatarUrl: string | null;
    }
  }
}

/**
 * Authenticate middleware — validates Bearer JWT and attaches user to req.user
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = tokenService.verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, username: true, avatarUrl: true },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};
