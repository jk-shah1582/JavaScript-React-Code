import config from "../config/appwriteConfig.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    try {
      this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId);

      // Initialize Account
      this.account = new Account(this.client);

      console.log(
        "Appwrite AuthService initialized successfully",
        this.account
      );
    } catch (error) {
      console.error("Failed to initialize Appwrite service:", error);
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.error("Create account error:", error);
      throw error;
    }
  }

  async login(data) {
    console.log("Attempting login for:", data.email);
   
  }

  // Add this method to AuthService class
  async checkSession() {
    try {
        const user = await this.account.get();
        if(user){
            console.log('Valid session found for user:', user);
            return user;
        }
        return null;
    } catch (error) {
        if (error.code === 401) {
            console.log('No valid session found - user needs to login');
            return null;
        }
        console.error("Session check error:", error);
        return null;
    }
}

  async getCurrentUser() {
    try {
      console.log("Checking current session...");
      const session = await this.checkSession();
      if (!session) {
        return null;
      }
      const user = await this.account.get();
      console.log("Current user:", user);
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
