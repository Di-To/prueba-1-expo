import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  type?: "primary" | "outlined" | "success" | "danger" | "warning";
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  type = "primary",
  text,
  onPress,
  style,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[type],
        style,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          type === "outlined" && styles.buttonTextOutlined,
        ]}
      >
        {loading ? "Cargando..." : text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  success: {
    backgroundColor: "#34C759",
  },
  danger: {
    backgroundColor: "#FF3B30",
  },
  warning: {
    backgroundColor: "#FF9500",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  buttonTextOutlined: {
    color: "#007AFF",
  },
  disabled: {
    opacity: 0.6,
  },
});
