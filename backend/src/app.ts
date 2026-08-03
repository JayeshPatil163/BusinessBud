import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import "./config/passport"; // Initialize Passport strategies
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();

// ── Security ──────────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [env.frontendUrl, "http://localhost:5173", "http://localhost:8080","https://business-bud.vercel.app/"],
    credentials: true, // Required for cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Logging ───────────────────────────────────────────────────────────────
app.use(morgan(env.isProduction ? "combined" : "dev"));

// ── Body Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.cookieSecret));

// ── API Routes ────────────────────────────────────────────────────────────
app.use("/api", routes);

// ── Error Handling ────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
