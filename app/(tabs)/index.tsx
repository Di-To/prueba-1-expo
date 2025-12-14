import { useAuth } from "@/components/context/auth-context";
import TaskItem from "@/components/task-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import Title from "@/components/ui/title";
import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
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
      const todoService = getTodoService({ token: user.token });
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user, todoService]);

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

  // --- MODIFICACIÓN: Alerta de seguridad al borrar ---
  const removeTodo = async (id: string) => {
    Alert.alert(
      "Eliminar Tarea", // Título
      "¿Estás seguro de que deseas eliminar esta tarea?", // Mensaje
      [
        {
          text: "Cancelar",
          style: "cancel",
          // Si cancela, no hacemos nada
        },
        {
          text: "Eliminar",
          style: "destructive", // Estilo rojo en iOS
          onPress: async () => {
            // Solo si presiona "Eliminar" ejecutamos la lógica original
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

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Title>Mis Tareas</Title>
        {loading && (
          <View>
            <Title>Cargando...</Title>
          </View>
        )}

        {/*  */}
        {todos.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            loading={loading}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setCreatingNew(true)}
      >
        <IconSymbol name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
