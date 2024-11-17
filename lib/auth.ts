import { User, loginSchema, registerSchema } from "@/lib/types/auth";

class AuthService {
  private readonly storageKey = "jacks_ride_auth";
  private readonly usersKey = "jacks_ride_users";

  getUser(): User | null {
    if (typeof window === "undefined") return null;
    
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return null;

      const user = JSON.parse(data);
      return user;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  setUser(user: User): void {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      document.cookie = `jacks_ride_auth=true; path=/; max-age=2592000`; // 30 days
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }

  removeUser(): void {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.removeItem(this.storageKey);
      document.cookie = "jacks_ride_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      throw new Error("Invalid credentials");
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Special case for admin login
    if (email === "admin@jacksride.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        email: "admin@jacksride.com",
        firstName: "Admin",
        lastName: "User",
        type: "admin",
        createdAt: new Date().toISOString(),
        isProfileComplete: true,
      };
      this.setUser(adminUser);
      return adminUser;
    }

    // Regular user login
    const users = this.getStoredUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    // In a real app, you would hash passwords
    if (password !== user.password) {
      throw new Error("Invalid password");
    }

    const { password: _, ...userWithoutPassword } = user;
    this.setUser(userWithoutPassword);
    return userWithoutPassword;
  }

  async register(data: any): Promise<User> {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = this.getStoredUsers();
    if (users.some((u) => u.email === data.email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.setStoredUsers(users);

    const { password: _, confirmPassword: __, ...userWithoutPassword } = newUser;
    this.setUser(userWithoutPassword);
    return userWithoutPassword;
  }

  logout(): void {
    this.removeUser();
  }

  private getStoredUsers(): any[] {
    if (typeof window === "undefined") return [];
    
    try {
      const data = localStorage.getItem(this.usersKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting stored users:", error);
      return [];
    }
  }

  private setStoredUsers(users: any[]): void {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    } catch (error) {
      console.error("Error storing users:", error);
    }
  }
}

export const authService = new AuthService();