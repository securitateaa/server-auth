import admin from "../config/firebaseConfig";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/custom";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Authorization required" });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userClaims = await admin.auth().getUser(decodedToken.uid);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.displayName,
      role: userClaims.customClaims?.role,
    } as User;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize =
  (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || userRole !== requiredRole) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
