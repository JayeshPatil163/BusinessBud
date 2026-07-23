import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../config/database";

export interface TokenPayload {
  userId: string;
  type: "access" | "refresh";
}

export const tokenService = {
  /**
   * Sign a short-lived access token (15m by default)
   */
  signAccessToken(userId: string): string {
    return jwt.sign(
      { userId, type: "access" } as TokenPayload,
      env.jwt.accessSecret,
      { expiresIn: env.jwt.accessExpiry } as jwt.SignOptions
    );
  },

  /**
   * Sign a long-lived refresh token and persist it to DB
   */
  async signRefreshToken(userId: string): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const token = jwt.sign(
      { userId, type: "refresh" } as TokenPayload,
      env.jwt.refreshSecret,
      { expiresIn: env.jwt.refreshExpiry } as jwt.SignOptions
    );

    await prisma.refreshToken.create({
      data: { token, userId, expiresAt },
    });

    return token;
  },

  /**
   * Verify access token and return payload
   */
  verifyAccessToken(token: string): TokenPayload {
    const payload = jwt.verify(token, env.jwt.accessSecret) as TokenPayload;
    if (payload.type !== "access") {
      throw new Error("Invalid token type");
    }
    return payload;
  },

  /**
   * Rotate refresh token: validate old, delete it, issue new pair
   */
  async rotateRefreshToken(
    oldToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: TokenPayload;
    try {
      payload = jwt.verify(oldToken, env.jwt.refreshSecret) as TokenPayload;
    } catch {
      throw new Error("Invalid or expired refresh token");
    }

    if (payload.type !== "refresh") {
      throw new Error("Invalid token type");
    }

    // Check token exists in DB (detects reuse)
    const stored = await prisma.refreshToken.findUnique({
      where: { token: oldToken },
    });

    if (!stored || stored.expiresAt < new Date()) {
      // Potential token reuse — revoke all tokens for this user
      await prisma.refreshToken.deleteMany({
        where: { userId: payload.userId },
      });
      throw new Error("Refresh token reuse detected. Please log in again.");
    }

    // Delete old token
    await prisma.refreshToken.delete({ where: { token: oldToken } });

    // Issue new pair
    const accessToken = tokenService.signAccessToken(payload.userId);
    const refreshToken = await tokenService.signRefreshToken(payload.userId);

    return { accessToken, refreshToken };
  },

  /**
   * Revoke a specific refresh token (logout)
   */
  async revokeRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.deleteMany({ where: { token } });
  },

  /**
   * Revoke all refresh tokens for a user (logout all devices)
   */
  async revokeAllRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({ where: { userId } });
  },
};
