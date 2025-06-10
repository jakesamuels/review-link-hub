import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button, StyleSheet } from "react-native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import { getToken } from "./src/utils/authStorage";

export default function App() {
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getToken();

        if (token) {
          setIsAuthenticated(true);
        }
        setIsLoadingApp(false);
      } catch (error) {
        console.error("Failed to check auth status:", error);
      } finally {
        setIsLoadingApp(false); // Set loading to false regardless of success or failure
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoadingApp) {
    return (
      <View>
        <Text>Loading app...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
