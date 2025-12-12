import { useAuth } from "@/components/context/auth-context";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading } = useAuth();

  const handleUserNameChange = (text: string) => {
    setUserName(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    try {
      login(userName, password);
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <View style={styles.inpuContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Email"
          style={styles.inputStyle}
          onChangeText={handleUserNameChange}
        />
      </View>
      <View style={styles.inpuContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
      </View>
      <Button
        style={styles.button}
        onPress={handleLogin}
        disabled={!userName || !password}
        loading={loading}
        text="Login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inpuContainer: {
    width: "80%",
    marginTop: 16,
  },
  inputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    width: "100%",
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 5,
  },
});
