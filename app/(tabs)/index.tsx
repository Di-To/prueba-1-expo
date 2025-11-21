import TaskItem from "@/components/task-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import Title from "@/components/ui/title";
import { Task } from "@/constants/types";
import generateRandomId from "@/utils/generate-random-id";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialTodos = [
  { id: generateRandomId(), title: "Buy groceries", completed: false },
  { id: generateRandomId(), title: "Walk the dog", completed: true },
  { id: generateRandomId(), title: "Read a book", completed: false },
  { id: generateRandomId(), title: "Exercise", completed: true },
  { id: generateRandomId(), title: "Call mom", completed: false },
];

export default function HomeScreen() {
  const [todos, setTodos] = useState<Task[]>(initialTodos);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const createTask = (task: Task) => {
    if (task.title.trim().length === 0) return;

    setTodos((prevTodos) => [...prevTodos, task]);
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

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskSave={createTask} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title> To-do list</Title>
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          task={todo}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
      <TouchableOpacity
        style={styles.newTaskButton}
        onPress={() => setCreatingNew(true)}
      >
        <IconSymbol name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  newTaskButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
