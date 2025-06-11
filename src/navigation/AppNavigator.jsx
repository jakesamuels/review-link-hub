import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CreateProfileScreen from "./../screens/CreateProfileScreen";
import LoadingDashboardScreen from "../screens/LoadingDashboardScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoadingDashboard"
        component={LoadingDashboardScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
