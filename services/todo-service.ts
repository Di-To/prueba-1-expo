import { API_URL } from "@/constants/config";
import { Task } from "@/constants/types";
import axios, { isAxiosError } from "axios";

export interface GetTodosResponse {
  success: boolean;
  data: Task[];
  count: number;
}

function handleServiceError(error: unknown, defaultMessage: string) {
  if (isAxiosError(error) && error.response) {
    if (error.response.status === 401) {
      throw new Error(
        " Credenciales inválidas. Por favor, inicia sesión de nuevo."
      );
    }
  }
  console.error(defaultMessage, error);
  throw new Error(
    " Ocurrió un error al conectar con el servidor. Intenta más tarde."
  );
}

export default function getTodoService({ token }: { token: string }) {
  const client = axios.create({
    baseURL: `${API_URL}/todos`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async function getTodos(): Promise<GetTodosResponse> {
    try {
      const response = await client.get<GetTodosResponse>("");
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error(
            " Credenciales inválidas. Por favor, inicia sesión de nuevo."
          );
        }
      }
      console.error("Error fetching todos:", error);
      throw new Error(
        " Ocurrió un error al conectar con el servidor. Intenta más tarde."
      );
    }
  }

  async function createTodo(task: Task): Promise<void> {
    try {
      await client.post("", task);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error(
            " Credenciales inválidas. Por favor, inicia sesión de nuevo."
          );
        }
      }
      console.error("Error creating todo:", error);
      throw new Error(
        " Ocurrió un error al conectar con el servidor. Intenta más tarde."
      );
    }
  }

  async function deleteTodo(id: string): Promise<void> {
    try {
      await client.delete(`/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error(
            " Credenciales inválidas. Por favor, inicia sesión de nuevo."
          );
        }
      }
      console.error("Error deleting todo:", error);
      throw new Error(
        " Ocurrió un error al conectar con el servidor. Intenta más tarde."
      );
    }
  }

  async function updateTodo(task: Task): Promise<void> {
    try {
      await client.put(`/${task.id}`, task);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error(
            " Credenciales inválidas. Por favor, inicia sesión de nuevo."
          );
        }
      }
      console.error("Error updating todo:", error);
      throw new Error(
        " Ocurrió un error al conectar con el servidor. Intenta más tarde."
      );
    }
  }

  return {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };
}
