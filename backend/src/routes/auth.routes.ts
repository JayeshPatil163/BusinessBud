import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  refresh,
  me,
  googleCallback,
  updateProfile,
  registerSchema,
  loginSchema,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";

const router = Router();

// ── Email / Password Auth ───────────────────────────────────────────────────

/**
 * @route   POST /api/auth/register
 * @access  Public
 * @desc    Register new user with email, username, password
 */
router.post("/register", validate(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @access  Public
 * @desc    Login with email + password; returns access token + sets refresh cookie
 */
router.post("/login", validate(loginSchema), login);

/**
 * @route   POST /api/auth/logout
 * @access  Public
 * @desc    Revokes refresh token and clears cookie
 */
router.post("/logout", logout);

/**
 * @route   POST /api/auth/refresh
 * @access  Public (uses httpOnly cookie)
 * @desc    Issues new access token using refresh token cookie
 */
router.post("/refresh", refresh);

/**
 * @route   GET /api/auth/me
 * @access  Private
 * @desc    Returns currently authenticated user
 */
router.get("/me", authenticate, me);

/**
 * @route   PATCH /api/auth/profile
 * @access  Private
 * @desc    Update username or avatar
 */
router.patch("/profile", authenticate, updateProfile);

// ── Google OAuth ─────────────────────────────────────────────────────────────

/**
 * @route   GET /api/auth/google
 * @access  Public
 * @desc    Initiates Google OAuth flow
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

/**
 * @route   GET /api/auth/google/callback
 * @access  Public
 * @desc    Google OAuth callback; issues tokens and redirects to frontend
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
  }),
  googleCallback
);

export default router;
