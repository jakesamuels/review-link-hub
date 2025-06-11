import { SafeAreaView, Button, Text } from "react-native";
import { useAuth } from "../context/AuthContext";

const BusinessProfileScreen = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <Text>Business Profile Page</Text>
      <Button title="log out" onPress={logout} />
    </SafeAreaView>
  );
};

export default BusinessProfileScreen;
