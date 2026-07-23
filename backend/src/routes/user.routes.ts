import { Router } from "express";
import { getMe } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * @route   GET /api/users/me
 * @access  Private
 * @desc    Get full user profile with metadata
 */
router.get("/me", authenticate, getMe);

export default router;
