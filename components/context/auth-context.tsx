import getAuthService from "@/services/auth-service";
import {
  clearSessionFromStorage,
  loadSessionFromStorage,
  saveSessionToStorage,
} from "@/utils/storage";
import { router } from "expo-router";
import { decodeJwt } from "jose";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export interface User {
  id: string;
  email: string;
  token: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadSessionFromStorage().then((loadedUser) => {
      if (loadedUser) {
        setUser(loadedUser);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    const authClient = getAuthService();
    setLoading(true);

    try {
      const loginResponse = await authClient.login({
        email: username,
        password,
      });
      const token = loginResponse.data.token;
      const decodedToken = decodeJwt<JwtPayload>(token);

      const loggedInUser: User = {
        id: decodedToken.sub,
        email: decodedToken.email,
        token: token,
      };

      setUser(loggedInUser);
      await saveSessionToStorage(loggedInUser);
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    clearSessionFromStorage();
  };

  // ✅ Return the provider itself here
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
