import bcrypt from "bcryptjs";
import { prisma } from "../config/database";
import { tokenService } from "./token.service";

const SALT_ROUNDS = 12;

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: {
    id: string;
    email: string;
    username: string;
    avatarUrl: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  /**
   * Register a new user with email + password
   */
  async register(input: RegisterInput): Promise<AuthResult> {
    const { email, username, password } = input;

    // Check for existing email
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      throw Object.assign(new Error("Email already in use"), {
        statusCode: 409,
        field: "email",
      });
    }

    // Check for existing username
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      throw Object.assign(new Error("Username already taken"), {
        statusCode: 409,
        field: "username",
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { email, username, passwordHash },
    });

    const accessToken = tokenService.signAccessToken(user.id);
    const refreshToken = await tokenService.signRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
      refreshToken,
    };
  },

  /**
   * Login with email + password
   */
  async login(input: LoginInput): Promise<AuthResult> {
    const { email, password } = input;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      throw Object.assign(
        new Error("Invalid credentials"),
        { statusCode: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw Object.assign(
        new Error("Invalid credentials"),
        { statusCode: 401 }
      );
    }

    const accessToken = tokenService.signAccessToken(user.id);
    const refreshToken = await tokenService.signRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
      refreshToken,
    };
  },

  /**
   * Issue tokens for an OAuth user (called after Passport validates)
   */
  async issueTokensForUser(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = tokenService.signAccessToken(userId);
    const refreshToken = await tokenService.signRefreshToken(userId);
    return { accessToken, refreshToken };
  },

  /**
   * Update user profile (username / avatarUrl)
   */
  async updateProfile(
    userId: string,
    data: { username?: string; avatarUrl?: string }
  ) {
    if (data.username) {
      const existing = await prisma.user.findFirst({
        where: { username: data.username, NOT: { id: userId } },
      });
      if (existing) {
        throw Object.assign(new Error("Username already taken"), {
          statusCode: 409,
          field: "username",
        });
      }
    }

    return prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, email: true, username: true, avatarUrl: true },
    });
  },
};
