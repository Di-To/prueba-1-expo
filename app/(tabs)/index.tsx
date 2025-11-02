import { useAuth } from "@/components/context/auth-context";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  const { user, logout } = useAuth();

  const increment = () => setCount((c) => c + 1);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hola {user?.name}</Text>
      <Text>This is a counter: {count} </Text>
      <Pressable style={styles.button} onPress={increment}>
        <Text>Increment</Text>
      </Pressable>
      <Text>Press the button to open modal.</Text>
      <Link href="/modal" style={styles.button}>
        <Text>Open Modal</Text>
      </Link>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
