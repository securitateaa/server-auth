import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import AuthRoutes from "./routes/auth";

dotenv.config();

const index: Express = express();
const server = http.createServer(index);

index.use(express.json());
index.use(express.urlencoded({ extended: true }));

index.use("/auth", AuthRoutes);

(async () => {
  try {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Failed to start the server due to: ${error.message}`);
    process.exit(1);
  }
})();
