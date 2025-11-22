import TaskItem from "@/components/task-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import Title from "@/components/ui/title";
import { Task } from "@/constants/types";
import generateRandomId from "@/utils/generate-random-id";
import { useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Datos iniciales movidos a una constante para limpieza
const INITIAL_TODOS: Task[] = [
  { id: generateRandomId(), title: "Comprar víveres", completed: false },
  { id: generateRandomId(), title: "Pasear al perro", completed: true },
  { id: generateRandomId(), title: "Leer documentación", completed: false },
];

export default function HomeScreen() {
  const [todos, setTodos] = useState<Task[]>(INITIAL_TODOS);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const createTask = (task: Task) => {
    if (task.title.trim().length === 0) return;
    // Agregamos al inicio del array para ver la nueva tarea primero
    setTodos((prevTodos) => [task, ...prevTodos]);
    setCreatingNew(false);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Renderizado optimizado para FlatList
  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TaskItem task={item} onToggle={toggleTodo} onRemove={removeTodo} />
  );

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask
          onClose={() => setCreatingNew(false)}
          onTaskSave={createTask}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Title>Mis Tareas</Title>
        <Text style={styles.subTitle}>
          {todos.filter((t) => !t.completed).length} pendientes
        </Text>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <IconSymbol name="tray" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No hay tareas pendientes</Text>
            <Text style={styles.emptySubText}>¡Tómate un descanso!</Text>
          </View>
        )}
      />

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
    backgroundColor: "#f5f5f5", // Fondo gris suave para mejor contraste
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
    paddingBottom: 100, // Espacio para que el botón flotante no tape el último item
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
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Sombras para Android
    elevation: 8,
  },
});
