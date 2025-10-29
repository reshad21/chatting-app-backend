import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./modules/user/user.routes";

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", UserRoutes); // ← register user routes

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
