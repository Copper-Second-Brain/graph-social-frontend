// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default users for demo purposes
const DEFAULT_USERS = [
  {
    id: "user1",
    username: "user1",
    email: "user1@example.com",
    password: "password123",
  },
  {
    id: "user2",
    username: "user2",
    email: "user2@example.com",
    password: "password123",
  },
  {
    id: "user3",
    username: "user3",
    email: "user3@example.com",
    password: "password123",
  },
  {
    id: "user4",
    username: "user4",
    email: "user4@example.com",
    password: "password123",
  },
  {
    id: "admin",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = DEFAULT_USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
          };

          localStorage.setItem("currentUser", JSON.stringify(userData));
          setCurrentUser(userData);
          resolve();
        } else {
          reject(new Error("Invalid username or password"));
        }
      }, 1000);
    });
  };

  // Signup function
  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if username exists
        if (DEFAULT_USERS.some((u) => u.username === username)) {
          reject(new Error("Username already exists"));
          return;
        }

        const newUser = {
          id: username,
          username,
          email,
        };

        localStorage.setItem("currentUser", JSON.stringify(newUser));
        setCurrentUser(newUser);
        resolve();
      }, 1000);
    });
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
