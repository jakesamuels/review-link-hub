import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import api from "../../utils/api";
import { useAuth } from "./../../context/AuthContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async () => {
    setIsLoading(true);
    setErrorMessage("");

    if (!email || !password || !passwordConfirm) {
      setErrorMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        passwordConfirm,
      });

      const token = response.data?.token || response.token;

      if (token) {
        await login(token);
        console.log("Registration successful:", response.data); // Log actual response for verification
      } else {
        // Handle cases where registration is 'successful' but no token is returned (unlikely for auth, but good to guard)
        setErrorMessage(
          "Registration completed, but no token received. Please try logging in."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage(
        error.response?.data?.message || // Get the specific error message from your backend (e.g., "Incorrect email or password")
          error.message || // Fallback to a generic Axios error message (e.g., network issues)
          "Registration failed. Please try again." // Generic fallback message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>Register</Text>

      {errorMessage && <Text>{errorMessage}</Text>}

      <TextInput
        placeholder="example@email.com"
        onChangeText={setEmail} // Use onChangeText
        value={email} // Bind value to state
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry // Hide password
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
        secureTextEntry
      />

      {errorMessage && <Text>{errorMessage}</Text>}

      <TouchableOpacity onPress={handleRegistration} disabled={isLoading}>
        <Text>Register</Text>
      </TouchableOpacity>

      <View>
        <Text>Already have an account? </Text>
        <TouchableOpacity>
          <Text onPress={() => navigation.navigate("Login")}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
