import { useAuth } from "@/components/context/auth-context";
import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

export default function useTodoList() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const todoService = useMemo(
    () => (user ? getTodoService({ token: user.token || "" }) : null),
    [user]
  );

  const fetchTodos = useCallback(async () => {
    if (!user || !todoService) return;
    setLoading(true);
    try {
      //   const todoService = getTodoService({ token: user.token });
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        router.replace("/login");
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [user, todoService, logout, router]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);

  const onTaskCreated = () => {
    fetchTodos();
    setCreatingNew(false);
  };

  const toggleTodo = async (id: string) => {
    setLoading(true);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (todoService && updatedTodo !== undefined) {
      updatedTodo.completed = !updatedTodo.completed;
      try {
        await todoService.updateTodo(updatedTodo);
        await fetchTodos();
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
      setLoading(false);
    }
  };

  const removeTodo = async (id: string) => {
    Alert.alert(
      "Eliminar Tarea",
      "¿Estás seguro de que deseas eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            await todoService?.deleteTodo(id);
            await fetchTodos();
          },
        },
      ]
    );
  };
  // --------------------------------------------------

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  return {
    todos,
    loading,
    creatingNew,
    setCreatingNew,
    toggleTodo,
    removeTodo,
    onTaskCreated,
    handleNewTaskClose,
  };
}
