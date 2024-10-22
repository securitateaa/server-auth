import { auth } from "firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import firebaseApp from "../config/firebaseConfig";
const firebaseAuth: auth.Auth = firebaseApp.auth();

interface UserData {
  email: string;
  password: string;
  displayName: string;
  adminToken?: string;
}

interface UserServiceResponse {
  error?: boolean;
  message?: string;
}

class AuthService {
  static async addUser(
    data: UserData
  ): Promise<UserRecord | UserServiceResponse> {
    try {
      const { email, password, displayName, adminToken } = data;

      if (adminToken && adminToken !== process.env.ADMIN_TOKEN) {
        return { error: true, message: "Invalid admin token." };
      }

      const userData: auth.CreateRequest = {
        email,
        emailVerified: false,
        password,
        displayName,
        disabled: false,
      };

      const newUser: UserRecord = await firebaseAuth.createUser(userData);

      const claims = {
        role: adminToken ? "admin" : "guest",
      };
      await firebaseAuth.setCustomUserClaims(newUser.uid, claims);

      // TODO: Save user to DB

      return newUser;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  static async updateUser(
    uid: string,
    data: Partial<auth.UpdateRequest>
  ): Promise<UserRecord | UserServiceResponse> {
    try {
      const updatedUser = await firebaseAuth.updateUser(uid, data);
      return updatedUser;
    } catch (error: any) {
      console.error(error.message);
      return { error: true, message: "Something went wrong" };
    }
  }

  static async getUsers(): Promise<UserRecord[] | UserServiceResponse> {
    try {
      const listUsersResult = await firebaseAuth.listUsers();
      return listUsersResult.users;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  static async deleteUser(
    uid: string
  ): Promise<{ message: string } | UserServiceResponse> {
    try {
      await firebaseAuth.deleteUser(uid);
      return { message: "User deleted successfully" };
    } catch (error: any) {
      return { error: true, message: "Something went wrong" };
    }
  }
}

export default AuthService;
