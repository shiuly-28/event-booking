import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
