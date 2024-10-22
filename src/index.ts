import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
const cors = require("cors");
import AuthRoutes from "./routes/auth";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoutes);

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
