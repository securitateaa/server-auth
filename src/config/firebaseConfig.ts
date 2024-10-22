import * as admin from "firebase-admin";
import { config } from "dotenv";

config();

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.GOOGLE_DB_ADDRESS,
  });
  console.info("Firebase has been initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export default admin;
