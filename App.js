import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
