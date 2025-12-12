import { API_URL } from "@/constants/config";
import axios, { isAxiosError } from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
  };
}

export type RegisterPayload = LoginPayload;

export type RegisterResponse = LoginResponse;

export default function getAuthService() {
  const client = axios.create({
    baseURL: `${API_URL}/auth`,
  });

  async function login(loginPayload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await client.post<LoginResponse>("/login", loginPayload);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error(
            " Credenciales inválidas. Por favor, intenta de nuevo."
          );
        }
      }
      throw new Error(
        " Ocurrió un error al conectar con el servidor. Intenta más tarde."
      );
    }
  }

  async function register(
    registerPayload: RegisterPayload
  ): Promise<RegisterResponse> {
    try {
      const response = await client.post<RegisterResponse>(
        "/register",
        registerPayload
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          throw new Error(
            "El usuario ya existe. Por favor, elige otro correo electrónico."
          );
        }
      }
      {
        throw new Error(
          " Ocurrió un error al conectar con el servidor. Intenta más tarde."
        );
      }
    }
  }
  return {
    login,
    register,
  };
}
