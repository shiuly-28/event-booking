import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";

const app: Application = express();

// Parsers
app.use(cors());
app.use(express.json());

// Application routes
app.use("/api/v1", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "welcome product",
  });
});

// 1. Not Found Route Handler (404 - ভুল কোনো URL-এ হিট করলে)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

// 2. Global Error Handler (500 / AppError - কোডে কোনো এরর থ্রো হলে)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

export default app;