import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/auth-context";
import Button from "./button";
import Title from "./title";

interface NewTaskProps {
  onClose: () => void;
  onTaskCreated: () => void;
}

export default function NewTask({ onClose, onTaskCreated }: NewTaskProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { user } = useAuth();

  async function handleTakePhoto() {
    if (isCapturingPhoto) return;

    try {
      setIsCapturingPhoto(true);

      const { status } = await requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos permiso para acceder a la cámara para tomar fotos."
        );
        setIsCapturingPhoto(false);
        return;
      }

      const result = await launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: false,
        exif: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const photoAsBlob = await fetch(result.assets[0].uri).then((res) =>
          res.blob()
        );
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert(
        "Error",
        "Hubo un problema al tomar la foto. Por favor, intenta de nuevo."
      );
    } finally {
      setIsCapturingPhoto(false);
    }
  }

  async function handleSaveTask() {
    if (isSaving) return;
    let location = null;
    try {
      setIsSaving(true);
      try {
        const { status } = await requestForegroundPermissionsAsync();

        if (status === "granted") {
          const locationResult = await getCurrentPositionAsync({
            accuracy: Accuracy.Balanced,
          });
          location = {
            latitude: Number(locationResult.coords.latitude.toFixed(6)),
            longitude: Number(locationResult.coords.longitude.toFixed(6)),
          };
        }
      } catch (locationError) {
        console.error("Error obtaining location:", locationError);
      }

      const newTask: Task = {
        id: Math.random().toString(36).substring(2, 15),
        title: taskTitle,
        completed: false,
        photoUri: photoUri || undefined,
        location: location || undefined,
        userId: user ? user.id : "guest",
      };
      const todoService = getTodoService({ token: user!.token });
      await todoService.createTodo(newTask);
      onTaskCreated();
    } catch (error) {
      console.error("Error saving task:", error);
      Alert.alert(
        "Error",
        "Hubo un problema al guardar la tarea. Por favor, intenta de nuevo."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View>
      <Title>New Task</Title>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}> Titulo de la tarea:</Text>
        <TextInput
          style={styles.textInput}
          value={taskTitle}
          onChangeText={setTaskTitle}
        ></TextInput>
      </View>
      {photoUri ? (
        <View>
          <Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: 200, marginBottom: 16 }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.emptyPhotoContainer}>
          <Text style={styles.emptyPhotoIcon}> 📷 </Text>
          <Text style={styles.emptyPhotoText}> Toma foto para tu tarea </Text>
        </View>
      )}
      <Button
        type="outlined"
        text={photoUri ? "Volver a tomar foto" : "Tomar foto"}
        onPress={handleTakePhoto}
      />
      <View style={{ gap: 12, flexDirection: "column", marginTop: 16 }}>
        <Button
          type="primary"
          text="Crear tarea"
          onPress={handleSaveTask}
          disabled={!taskTitle.trim() || isSaving}
          loading={isSaving}
        />
        <Button type="danger" text="Cancelar" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  emptyPhotoContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#444444ff",
  },
  emptyPhotoIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyPhotoText: {
    color: "#888",
  },
});
