import { config } from "dotenv";

config();
export const envConfig = {
  PORT: process.env.PORT || 5000,
  CORS_DOMAIN: process.env.CORS_DOMAINS || ["http://localhost:3000"],
  MONGODB_URI: process.env.MONGODB_URI!,
} as const;