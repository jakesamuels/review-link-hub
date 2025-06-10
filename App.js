import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button, StyleSheet } from "react-native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <View style={styles.buttonContainer}>
        <Button
          title={isAuthenticated ? "Log Out" : "Log In"}
          onPress={() => setIsAuthenticated(!isAuthenticated)}
        />
      </View>

      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // This style is to push the button to the top for visibility during testing
    // You might integrate this into a proper header or debug menu in a real app
    paddingTop: 50, // Adjust as needed
    alignItems: "center",
    zIndex: 1, // Ensure button is clickable above navigator content
    backgroundColor: "white", // Give it a background so it's visible
  },
});
