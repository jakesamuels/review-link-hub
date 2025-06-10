import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data?.token || response.token;

      if (token) {
        await login(token);
        console.log("Login successful:", response.data);
      } else {
        setErrorMessage(
          "Login completed, but no token received. Please try logging in again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        error.response?.data?.message || // Get the specific error message from your backend (e.g., "Incorrect email or password")
          error.message || // Fallback to a generic Axios error message (e.g., network issues)
          "Login failed. Please try again." // Generic fallback message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Text>Log In</Text>

      <TextInput
        placeholder="example@email.com"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      {errorMessage && <Text>{errorMessage}</Text>}

      <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
        <Text>Log In</Text>
      </TouchableOpacity>

      <View>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text onPress={() => navigation.navigate("Register")}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
