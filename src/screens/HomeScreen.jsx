import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
