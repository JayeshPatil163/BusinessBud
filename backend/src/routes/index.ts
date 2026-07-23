import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = Router();

// Health check
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "BusinessBud API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Mount feature routers
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
