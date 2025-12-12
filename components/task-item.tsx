import { Task } from "@/constants/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  loading?: boolean;
}
export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <View key={task.id} style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={() => onToggle(task.id)}
      ></TouchableOpacity>
      <View>
        {task.photoUri && (
          <Image
            source={{ uri: task.photoUri }}
            style={{ width: 50, height: 50, borderRadius: 8, marginBottom: 4 }}
            resizeMode="cover"
          />
        )}
      </View>
      {task.location && (
        <Text style={{ fontSize: 10, color: "gray" }}>
          📍 Lat: {task.location.latitude}, Lon: {task.location.longitude}
        </Text>
      )}
      <Text style={[styles.title, task.completed && styles.completedTitle]}>
        {task.title}
      </Text>
      <TouchableOpacity
        onPress={() => onRemove(task.id)}
        style={styles.removeButton}
      >
        <IconSymbol name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "transparent",
    marginRight: 12,
  },
  completedCircle: {
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 16,
  },
  completedTitle: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  removeButton: {
    marginLeft: "auto",
    padding: 8,
  },
});
