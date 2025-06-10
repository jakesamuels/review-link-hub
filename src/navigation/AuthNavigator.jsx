import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
          path: "login",
        }}
      />

      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          title: "Register Account",
          path: "register",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
