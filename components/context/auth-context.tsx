import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const EXPECTED_USERS = [
  { id: "1", name: "User", password: "1234" },
  { id: "2", name: "Admin", password: "admin" },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const foundUser = EXPECTED_USERS.find(
      (u) => u.name === username && u.password === password
    );

    if (foundUser) {
      setUser({ id: foundUser.id, name: foundUser.name });
      return true;
    } else {
      //   Alert.alert("Invalid username or password");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  // ✅ Return the provider itself here
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
