import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { prisma } from "../config/database";
import { env } from "../config/env";

// ── Validation Schemas ─────────────────────────────────────────────────────

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ── Cookie Helpers ─────────────────────────────────────────────────────────

const REFRESH_COOKIE = "refresh_token";

const setRefreshTokenCookie = (res: Response, token: string): void => {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    path: "/api/auth",
  });
};

const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
};

// ── Controllers ────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(
      req.body
    );

    setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body
    );

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.refresh_token as string | undefined;

    if (token) {
      await tokenService.revokeRefreshToken(token);
    }

    clearRefreshTokenCookie(res);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/refresh
 * Rotates the refresh token and issues a new access token
 */
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const oldRefreshToken = req.cookies?.refresh_token as string | undefined;

    if (!oldRefreshToken) {
      res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
      return;
    }

    const { accessToken, refreshToken } =
      await tokenService.rotateRefreshToken(oldRefreshToken);

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated user
 */
export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/google
 * Initiates Google OAuth flow (handled by Passport)
 */
export const googleAuth = (): void => {
  // Passport handles this via middleware
};

/**
 * GET /api/auth/google/callback
 * Called by Google after user authorizes; issues tokens and redirects to frontend
 */
export const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as {
      id: string;
      email: string;
      username: string;
      avatarUrl: string | null;
    };

    if (!user) {
      res.redirect(`${env.frontendUrl}/login?error=oauth_failed`);
      return;
    }

    const { accessToken, refreshToken } =
      await authService.issueTokensForUser(user.id);

    setRefreshTokenCookie(res, refreshToken);

    // Redirect to frontend with access token in query param (brief exposure)
    // Frontend should immediately store it in memory and clear the URL
    res.redirect(
      `${env.frontendUrl}/auth/callback?token=${accessToken}`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/auth/profile
 * Update username or avatar URL
 */
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    const { username, avatarUrl } = req.body as {
      username?: string;
      avatarUrl?: string;
    };

    const updated = await authService.updateProfile(req.user.id, {
      username,
      avatarUrl,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated",
      data: { user: updated },
    });
  } catch (error) {
    next(error);
  }
};
