import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// আপনার Prisma Client পাথ
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/client";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;