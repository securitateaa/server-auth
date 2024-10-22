import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  public static async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await AuthService.getUsers();
      if ("error" in users) {
        return res.status(500).json({ message: users.message });
      }
      return res.json(users);
    } catch (error: any) {
      console.error(`Error fetching users: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async addUser(req: Request, res: Response): Promise<Response> {
    try {
      const response = await AuthService.addUser(req.body);
      if ("error" in response) {
        return res.status(400).json({ message: response.message });
      }
      return res.status(201).json(response);
    } catch (error: any) {
      console.error(`Error registering user: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async updateUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const updatedUser = await AuthService.updateUser(
        req.params.name,
        req.body
      );
      if ("error" in updatedUser) {
        return res.status(404).json({ message: updatedUser.message });
      }
      return res.json(updatedUser);
    } catch (error: any) {
      console.error(`Error updating user ${req.params.name}: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async deleteUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { name } = req.params;
      const user = await AuthService.deleteUser(name);
      if ("error" in user) {
        return res.status(404).json({ message: user.message });
      }
      return res.status(204).json({ message: "User deleted successfully" });
    } catch (error: any) {
      console.error(`Error removing user ${req.params.name}: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default AuthController;
