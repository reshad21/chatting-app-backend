import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./modules/user/user.routes";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/user", UserRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
